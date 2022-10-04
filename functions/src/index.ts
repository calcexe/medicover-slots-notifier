import * as functions from "firebase-functions";
import admin from "firebase-admin";
import { getBrowser } from "./utils/getBrowser";
import { searchSlots } from "./api/searchSlots";
import { signIn } from "./api/signIn";
import { sendSlotsEmail } from "./helpers/sendSlotsEmail";
import { shouldSendSlotNotification } from "./helpers/shouldSendSlotNotification";
import { AppointmentSlots } from "./types/AppointmentSlots";
import { UserData } from "./types/UserData";
import Config from "./Config";
import { AppointmentRequestConverter } from "./utils/AppointmentRequestConverter";
import { searchDoctors } from "./api/searchDoctors";
import { Regions } from "./shared/Regions";
import { Service } from "./shared/Services";

const app = admin.initializeApp();

export const abc = functions.region("europe-west1").https.onCall(async () => {
  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.goto(Config.puppeteer.firstPage);
  await page.waitForNetworkIdle({ idleTime: 500 });

  await signIn(page, Config.medicover.username, Config.medicover.password);
  const doctors = await searchDoctors(
    page,
    Regions.GLIWICE,
    Service.NEUROLOG_DOROSLI
  );

  return doctors;
  // searchDoctors
});

export const findAppointments = functions
  .runWith({ memory: "2GB", timeoutSeconds: 60 })
  .region("europe-west1")
  .pubsub.schedule("0 * * * *")
  .onRun(async (context) => {
    // .https.onCall(async (data, context) => {
    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.goto(Config.puppeteer.firstPage);
    await page.waitForNetworkIdle({ idleTime: 500 });

    await signIn(page, Config.medicover.username, Config.medicover.password);

    const usersSnap = await app.firestore().collection("users").get();

    for (let userDoc of usersSnap.docs) {
      const appointmentsSnap = await app
        .firestore()
        .collection("users")
        .doc(userDoc.id)
        .collection("appointmentRequests")
        .withConverter(AppointmentRequestConverter)
        .get();

      const userResults: AppointmentSlots[] = [];
      for (let appointmentDoc of appointmentsSnap.docs) {
        const appointment = appointmentDoc.data();
        if (shouldSendSlotNotification(appointment.lastNotificationDate)) {
          try {
            const result = await searchSlots(page, appointment);
            if (result.length > 0) {
              userResults.push({
                appointmentId: appointmentDoc.id,
                slots: result,
              });
            }
          } catch (error) {
            functions.logger.error(error);
            throw new functions.https.HttpsError(
              "permission-denied",
              "User call was denied by Medicover."
            );
          }
        }
      }

      if (userResults.length > 0) {
        await sendSlotsEmail(userDoc.data() as UserData, userResults);
        for (let appointmentSlots of userResults) {
          await app
            .firestore()
            .collection("users")
            .doc(userDoc.id)
            .collection("appointmentRequests")
            .doc(appointmentSlots.appointmentId)
            .set(
              {
                lastNotificationDate:
                  admin.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
        }
      }
    }

    await browser.close();
  });
