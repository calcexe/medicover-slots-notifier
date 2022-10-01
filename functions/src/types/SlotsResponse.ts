export interface SlotsResponse {
  items: Slot[];
}

export interface Slot {
  appointmentDate: Date;
  serviceId: number;
  doctorId: number;
  specializationName: string;
  doctorName: string;
}
