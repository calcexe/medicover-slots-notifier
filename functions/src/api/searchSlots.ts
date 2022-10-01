import { Page } from "puppeteer";
import { AppointmentRequest } from "../shared/AppointmentRequest";
import { Slot, SlotsResponse } from "../types/SlotsResponse";
import { getSearchBody } from "../utils/getSearchBody";
import { getSearchHeaders } from "../utils/getSearchHeaders";

export const searchSlots = async (page: Page, body: AppointmentRequest) => {
  const searchBody = getSearchBody(body);
  const searchHeaders = getSearchHeaders();

  const response = await page.evaluate(
    async (body, headers) => {
      return await new Promise<Slot[]>((resolve, reject) => {
        fetch(
          `https://mol.medicover.pl/api/MyVisits/SearchFreeSlotsToBook?language=pl-PL`,
          {
            credentials: "include",
            headers: headers,
            method: "POST",
            body: JSON.stringify(body),
          }
        )
          .then(async (response) => {
            const body: SlotsResponse = await response.json();
            const removedFields: Slot[] = body.items.map((slot) => ({
              appointmentDate: slot.appointmentDate,
              doctorId: slot.doctorId,
              doctorName: slot.doctorName,
              serviceId: slot.serviceId,
              specializationName: slot.specializationName,
            }));
            resolve(removedFields);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    searchBody,
    searchHeaders
  );
  return response;
};
