import express from 'express';
import { calculateBmi, validateParameters } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const paramHeight = Number(req.query.height);
  const paramWeight = Number(req.query.weight);

  try {
    const { height, weight } = validateParameters(paramHeight, paramWeight);
    const result = calculateBmi(height, weight);
    res.status(200).json({ height, weight, bmi: result });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/exercises', (req, res) => {
  const { dailyExercises, target } = req.body;
  console.log(isNaN(target));
  try {
    if (dailyExercises && target) {
      if (
        !isNaN(target) &&
        Array.isArray(dailyExercises) &&
        !dailyExercises.includes(NaN)
      ) {
        const result = calculateExercises(dailyExercises, target);
        res.status(200).json(result);
      } else {
        {
          throw new Error('malformatted parameters!');
        }
      }
    } else {
      {
        throw new Error('parameters missing!');
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
