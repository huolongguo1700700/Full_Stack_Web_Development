import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from "@material-ui/core";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry } from '../state';
import {
  Patient,
  Entry,
  HealthCheckRating,
  HealthCheckEntry,
  HospitalEntry as IHospitalEntry,
  OccupationalHealthcareEntry
} from '../types';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcare from './OccupationalHealthcare';
import HealthCheck from './HealthCheck';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return null;
  }
};

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string}>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(
    () => {
      if (!patient || patient?.id !== id) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchPatientDetails();
      }
    },
    [patient, id, dispatch]
  );

  const fetchPatientDetails = async () => {
    if (!id) return;
    const { data: fetchedPatient } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    dispatch(setPatient(fetchedPatient));
  };

  const getEntryType = (values: EntryFormValues) => {
    let type;
    console.log(values);
    if ((values as HealthCheckEntry).healthCheckRating === HealthCheckRating.LowRisk ||
      (values as HealthCheckEntry).healthCheckRating === HealthCheckRating.Healthy ||
      (values as HealthCheckEntry).healthCheckRating === HealthCheckRating.HighRisk ||
      (values as HealthCheckEntry).healthCheckRating === HealthCheckRating.CriticalRisk) {
      type = "HealthCheck";
    } else if ((values as OccupationalHealthcareEntry).employerName) {
      type = "OccupationalHealthcare";
    } else if ((values as IHospitalEntry).discharge.date && (values as IHospitalEntry).discharge.criteria) {
      type = "Hospital";
    }

    return type;
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const type = getEntryType(values);
    let entry;

    console.log(type);
    if (type === "HealthCheck") {
      entry = {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        healthCheckRating: (values as HealthCheckEntry).healthCheckRating,
        type: "HealthCheck"
      } as Omit<HealthCheckEntry, "id">;
    }

    if (type === "OccupationalHealthcare") {
      if (!(values as OccupationalHealthcareEntry).sickLeave?.startDate
        || !(values as OccupationalHealthcareEntry).sickLeave?.endDate) {
          entry = {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            employerName: (values as OccupationalHealthcareEntry).employerName,
            sickLeave: undefined,
            type: "OccupationalHealthcare"
          } as Omit<OccupationalHealthcareEntry, "id">;
        }
      else {
        entry = {
          description: values.description,
          date: values.date,
          specialist: values.specialist,
          diagnosisCodes: values.diagnosisCodes,
          employerName: (values as OccupationalHealthcareEntry).employerName,
          sickLeave: (values as OccupationalHealthcareEntry).sickLeave,
          type: "OccupationalHealthcare"
        } as Omit<OccupationalHealthcareEntry, "id">;
      }
    }

    if (type === "Hospital") {
      entry = {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        type: "Hospital",
        discharge: (values as IHospitalEntry).discharge
      } as Omit<IHospitalEntry, "id">;
    }

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id ?? ""}/entries`,
        entry
      );

      dispatch(addEntry(newEntry));
      closeModal();
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err?.response?.data || "Unrecognized axios error");
        setError(String(err?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", err);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>

      <h3>entries</h3>
      {patient?.entries.map(
        entry => (
          <EntryDetails key={entry.id} entry={entry} />
        )
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetailsPage;
