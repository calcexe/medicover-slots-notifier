//https://mol.medicover.pl/api/MyVisits/SearchFreeSlotsToBook/GetFiltersData?regionIds=102200&serviceTypeId=2&serviceIds=176&visitType=center
// regionIds: 102200
// serviceTypeId: 2
// serviceIds: 176
// visitType: center

import { Page } from "puppeteer";
import { Regions } from "../shared/Regions";
import { Service } from "../shared/Services";

export const searchDoctors = async (
  page: Page,
  region: Regions,
  service: Service
) => {
  const url = `https://mol.medicover.pl/api/MyVisits/SearchFreeSlotsToBook/GetFiltersData?regionIds=${region}&serviceTypeId=2&serviceIds=${service}&visitType=center`;
  const doctors = await page.evaluate(async (url) => {
    return await new Promise((resolve, reject) => {
      fetch(url)
        .then(async (response) => {
          const body = await response.json();
          const doctors = body.doctors.map((doctor: any) => ({
            name: doctor.text,
            id: doctor.id,
          }));
          resolve(doctors);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }, url);
  return doctors;
};
