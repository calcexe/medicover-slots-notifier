export enum Service {
  NEUROLOG_DOROSLI = 16,
  MEDICOVER_EXPRES_PRZEZIEBIENIE_GRYPA = 16234,
  ALERGOLOG_DOROSLI = 176,
  ALERGOLOG_DOROSLI_ODCZULANIE = 178,
  CHIRURG_DOROSLI = 2,
  CHOROBY_ZAKAZNE_DOROSLI = 1190,
  CYTOLOGIA = 6254,
  DERMATOLOG_DOROSLI = 3,
  DERMATOLOG_DOROSLI_KURZAJKI_KONSULTACJA = 69362,
  DIABETOLOG = 99,
  // DIETETYK_DOROSLI = 182
  // ENDODONTA_LECZENIE = 28764
  // ENDOKRYNOLOG_DOROSLI = 5
  // GINEKOLOG_PROWADZENIE_CIAZY = 4800
  // GINEKOLOG_DOROSLI = 4798
  // GINEKOLOGIA_INFKECJA_INTYMNA_U_POLOZNEJ = 46068
  HIGIENISTKA_STOMATOLOGICZNA = 112,
  INTERNISTA = 9,
  LARYNGOLOG_DOROSLI = 192,
  OKULISTA_DOROSLI = 198,
  ORTOPEDA_DOROSLI = 163,
  URLOGO_DOROSLI = 30,
}

export interface ServiceData {
  name: string;
  service: Service;
}

type Key = keyof typeof Service;

type ServiceEntry = {
  [key in Key]: ServiceData;
};

export const Services: ServiceEntry = {
  MEDICOVER_EXPRES_PRZEZIEBIENIE_GRYPA: {
    service: Service.MEDICOVER_EXPRES_PRZEZIEBIENIE_GRYPA,
    name: "Medicover Express - przeziębienie, grypa",
  },
  ALERGOLOG_DOROSLI: {
    service: Service.ALERGOLOG_DOROSLI,
    name: "Alergolog dorośli",
  },
  ALERGOLOG_DOROSLI_ODCZULANIE: {
    service: Service.ALERGOLOG_DOROSLI_ODCZULANIE,
    name: "Alergolog dorośli odczulanie",
  },
  NEUROLOG_DOROSLI: {
    service: Service.NEUROLOG_DOROSLI,
    name: "Neurolog dorośli",
  },
  CHIRURG_DOROSLI: {
    service: Service.CHIRURG_DOROSLI,
    name: "Chirurg dorośli",
  },
  CHOROBY_ZAKAZNE_DOROSLI: {
    service: Service.CHOROBY_ZAKAZNE_DOROSLI,
    name: "Choroby zakaźne dorośli",
  },
  CYTOLOGIA: {
    service: Service.CYTOLOGIA,
    name: "Cytologia",
  },
  DERMATOLOG_DOROSLI: {
    service: Service.DERMATOLOG_DOROSLI,
    name: "Dermatolog dorośli",
  },
  DERMATOLOG_DOROSLI_KURZAJKI_KONSULTACJA: {
    service: Service.DERMATOLOG_DOROSLI_KURZAJKI_KONSULTACJA,
    name: "Dermatolog dorośli - kurzajki - konsultacja",
  },
  DIABETOLOG: {
    service: Service.DIABETOLOG,
    name: "Diabetolog",
  },
  URLOGO_DOROSLI: {
    service: Service.URLOGO_DOROSLI,
    name: "Urolog dorośli",
  },
  HIGIENISTKA_STOMATOLOGICZNA: {
    service: Service.HIGIENISTKA_STOMATOLOGICZNA,
    name: "Higienistka stomatologiczna",
  },
  INTERNISTA: {
    service: Service.INTERNISTA,
    name: "Internista",
  },
  LARYNGOLOG_DOROSLI: {
    service: Service.LARYNGOLOG_DOROSLI,
    name: "Laryngolog dorośli",
  },
  OKULISTA_DOROSLI: {
    service: Service.OKULISTA_DOROSLI,
    name: "Okulista dorośli",
  },
  ORTOPEDA_DOROSLI: {
    service: Service.ORTOPEDA_DOROSLI,
    name: "Ortopeda dorośli",
  },
};
