import { AppointmentRequest } from "../shared/AppointmentRequest";

export const getSearchBody = (body: AppointmentRequest) => ({
  regionIds: [body.region],
  serviceTypeId: 2,
  serviceIds: [body.service],
  clinicIds: [],
  doctorLanguagesIds: [],
  doctorIds: body.doctor ? [body.doctor] : [],
  searchSince: body.startDate
    ? body.startDate.toISOString()
    : new Date().toISOString(),
  startTime: "0:00",
  endTime: "23:59",
  selectedSpecialties: [],
  visitType: "0",
  disablePhoneSearch: "false",
  isChangeDate: "false",
});
