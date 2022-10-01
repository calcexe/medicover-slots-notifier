import { Doctor } from "./Doctors";
import { Regions } from "./Regions";
import { Services } from "./Services";

export interface AppointmentRequest {
  regions: Regions[];
  services: Services[];
  doctors: Doctor[];
}
