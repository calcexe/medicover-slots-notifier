import * as functions from "firebase-functions";
import admin from "firebase-admin";
import { getBrowser } from "./utils/getBrowser";
import { searchSlots } from "./api/searchSlots";
import { signIn } from "./api/signIn";
import { AppointmentRequest } from "./shared/AppointmentRequest";
import { Slot } from "./types/SlotsResponse";

const app = admin.initializeApp();

const username = functions.config().medicover.username;
const password = functions.config().medicover.password;

const FIRST_PAGE =
  "https://mol.medicover.pl/Medicover.IdentityAndAccess/PasswordManager";

export const findAppointments = functions
  .runWith({ memory: "2GB", timeoutSeconds: 60 })
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    // .pubsub.schedule("")
    // .onRun(async (context) => {
    functions.logger.info(
      `findAppointments start at ${new Date().toISOString()}`
    );
    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.goto(FIRST_PAGE);
    await page.waitForNetworkIdle({ idleTime: 500 });

    await signIn(page, username, password);

    const usersSnap = await app.firestore().collection("users").get();
    const slots: any[] = [];

    functions.logger.info(
      `findAppointments searching appointments for ${usersSnap.size} users`
    );

    for (let userDoc of usersSnap.docs) {
      const appointmentsSnap = await app
        .firestore()
        .collection("users")
        .doc(userDoc.id)
        .collection("appointmentRequests")
        .get();

      functions.logger.info(
        `findAppointments user ${userDoc.id} / ${appointmentsSnap.size} requests`
      );

      const userResults: Slot[][] = [];
      for (let appointmentDoc of appointmentsSnap.docs) {
        const appointment = appointmentDoc.data() as AppointmentRequest;
        try {
          const result = await searchSlots(page, appointment);
          userResults.push(result);
        } catch (error) {
          functions.logger.error(error);
          throw new functions.https.HttpsError(
            "permission-denied",
            "User call was denied by Medicover."
          );
        }
      }
      slots.push({
        userId: userDoc.id,
        slots: userResults,
      });
    }

    await browser.close();

    return {
      slots,
    };
  });
