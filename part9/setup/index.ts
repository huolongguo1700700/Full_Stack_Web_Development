/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './calculateExercises';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.status(400).end({
      error: "malformatted parameters"
    });
  }

  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: any = req.body;
  
  if (!daily_exercises || !target) {
    res.status(400).end({
      error: "parameters missing"
    });
  }

  if (!Array.isArray(daily_exercises)) {
    res.status(400).end({
      error: "malformatted parameters"
    });
  }

  if ((daily_exercises as number[]).some((ex: number) => isNaN(Number(ex)))) {
    res.status(400).end({
      error: "malformatted parameters"
    });
  }

  const result = calculateExercise(daily_exercises as number[], target as number);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});