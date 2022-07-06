import patientData from '../../data/patientsData';
import { v4 as uuidv4 } from 'uuid';

import { NewPatientEntry, Patient, PatientResponse, Entry } from "../types";
const patients = patientData;
const patientsResponse: Array<PatientResponse> = patientData
    .map(p => ({
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation
    }));

export const getAll = (): Array<PatientResponse> => patientsResponse;

export const getById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export const addPatient = (entry: NewPatientEntry): PatientResponse => {
  const newPatient: Patient = {
    ...entry,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuidv4()
  };
  patientData.push(newPatient);
  return {
    id: newPatient.id,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    name: newPatient.name,
    occupation: newPatient.occupation
  };
};

export const addEntry = (
  patient: Patient,
  newEntry: Entry
): Patient => {
  const id = uuidv4();

  const entryToAdd: Entry = {
    ...newEntry,
    id,
  };
  patient.entries.push(entryToAdd);

  return patient;
};