import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoseRoutes';
import patientRoutes from './routes/patientRoutes';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});