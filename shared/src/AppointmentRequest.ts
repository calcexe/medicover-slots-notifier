import { Doctor } from "./Doctors";
import { Regions } from "./Regions";
import { Services } from "./Services";

export interface AppointmentRequest {
  region: Regions;
  service: Services;
  doctor?: Doctor;
  startDate?: Date;
  lastNotificationDate?: Date;
}
