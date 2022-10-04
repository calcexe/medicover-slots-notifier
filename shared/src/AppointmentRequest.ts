import { Doctor } from "./Doctors";
import { Regions } from "./Regions";
import { Service } from "./Services";

export interface AppointmentRequest {
  region: Regions;
  service: Service;
  doctor?: Doctor;
  startDate?: Date;
  lastNotificationDate?: Date;
}
