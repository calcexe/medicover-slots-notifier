import { AppointmentRequest } from "../shared/AppointmentRequest";
import admin from "firebase-admin";

export const AppointmentRequestConverter = {
  toFirestore(request: AppointmentRequest): admin.firestore.DocumentData {
    return request;
  },
  fromFirestore(
    snapshot: admin.firestore.QueryDocumentSnapshot
  ): AppointmentRequest {
    const request = snapshot.data() as AppointmentRequest;
    if (snapshot.data().startDate instanceof admin.firestore.Timestamp) {
      request.startDate = snapshot.data().startDate.toDate();
    }
    if (
      snapshot.data().lastNotificationDate instanceof admin.firestore.Timestamp
    ) {
      request.lastNotificationDate = snapshot
        .data()
        .lastNotificationDate.toDate();
    }

    return request;
  },
};
