export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}

export interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<DiagnoseEntry['code']>
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type PatientResponse = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;

export const parsePatient = (object: any): NewPatientEntry => {
  return ({
    name: checkString(object.name),
    dateOfBirth: checkString(object.name),
    gender: checkGender(object.gender),
    occupation: checkString(object.occupation),
    ssn: checkString(object.ssn),
    entries: object.entries as Entry[]
  });
};

export const checkString = (str: any): string => {
  if (!str || typeof str !== 'string') throw Error('malformatted parameters');
  return str;
};

export const checkNumber = (num: any): number => {
  if (!num || isNaN(Number(num))) throw Error('malformatted parameters');
  return Number(num);
};

export const checkGender = (str: any): Gender => {
  if (str === 'male' || str === 'female' || str === 'other') return str as Gender;
  throw Error('malformatted parameters');
};

export const parseEntry = (newEntry: any) => {
  if (!newEntry) {
    throw new Error('Missing new entry');
  }

  if (newEntry.type === 'Hospital') {
    if (!newEntry.discharge) throw new Error('Missing discharge');
  }
  
  if (newEntry.type === 'OccupationalHealthcare') {
    if (!newEntry.employerName) throw new Error('Missing employer name');
  }

  return newEntry as Entry;
};
