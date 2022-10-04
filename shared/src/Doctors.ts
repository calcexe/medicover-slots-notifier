import { Service } from "./Services";

export enum Doctor {
  SZYMANSKA_MALGORZATA = 325278,
  KOZUB_DOROTA_ILONA = 219202,
  KUMOR_KLAUDIUSZ = 142094,
}

export interface DoctorData {
  name: string;
  service: Service;
  doctor: Doctor;
}

type Key = keyof typeof Doctor;

type DoctorEntry = {
  [key in Key]: DoctorData;
};

export const Doctors: DoctorEntry = {
  KUMOR_KLAUDIUSZ: {
    name: "Kumor Klaudiusz",
    doctor: Doctor.KUMOR_KLAUDIUSZ,
    service: Service.NEUROLOG_DOROSLI,
  },
  SZYMANSKA_MALGORZATA: {
    name: "Szymańska Małgorzata",
    doctor: Doctor.SZYMANSKA_MALGORZATA,
    service: Service.NEUROLOG_DOROSLI,
  },
  KOZUB_DOROTA_ILONA: {
    name: "Kozub - Doros Ilona",
    doctor: Doctor.KOZUB_DOROTA_ILONA,
    service: Service.NEUROLOG_DOROSLI,
  },
};
