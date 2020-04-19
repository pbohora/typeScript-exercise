import express from 'express';
import { calculateBmi, validateParameters } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const premHeight = Number(req.query.height);
  const paremWeight = Number(req.query.weight);

  try {
    const { height, weight } = validateParameters(premHeight, paremWeight);
    const result = calculateBmi(height, weight);
    res.json({ height, weight, bmi: result });
  } catch (e) {
    res.json({ error: e.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
