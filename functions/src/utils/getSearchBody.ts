import { AppointmentRequest } from "../shared/AppointmentRequest";

export const getSearchBody = (body: AppointmentRequest) => ({
  regionIds: body.regions,
  serviceTypeId: 2,
  serviceIds: body.services,
  clinicIds: [],
  doctorLanguagesIds: [],
  doctorIds: body.doctors,
  searchSince: new Date().toISOString(),
  startTime: "0:00",
  endTime: "23:59",
  selectedSpecialties: [],
  visitType: "0",
  disablePhoneSearch: "false",
  isChangeDate: "false",
});
