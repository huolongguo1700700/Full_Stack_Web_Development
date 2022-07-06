import express from 'express';
import { getAll, addPatient, getById, addEntry } from '../services/patientServices';
import { parsePatient, parseEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getAll());
});

router.get('/:id', (req, res) => {
  res.send(getById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = parsePatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.send(addedPatient);
  }
  catch (err) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log(req.body);
    const patient = getById(req.params.id);
    const newEntry = parseEntry(req.body);

    if (patient && newEntry) {
      const addedEntry = addEntry(patient, newEntry);
      res.send(addedEntry);
    }
  }
  catch (e) {
    res.status(400).send({ error: 'Bad request' });
  }
});

export default router;