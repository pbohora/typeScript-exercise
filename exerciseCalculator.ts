interface exercisesValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  ratings: number;
  ratingsDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exersisesDays: Array<number>,
  target: number
): exercisesValues => {
  const periodLength = exersisesDays.length;
  let trainingDays = 0;
  let success = false;
  let ratings = 0;
  let ratingsDescription = '';

  for (const day of exersisesDays) {
    if (day > 0) {
      trainingDays += 1;
    }
  }

  const totalHours = exersisesDays.reduce((a, b) => a + b, 0);
  const average = totalHours / periodLength;

  if (average < target) {
    success = false;
    ratings = 1;
    ratingsDescription = 'not too bad but could be better';
  } else if (average >= target) {
    success = true;
    ratings = 3;
    ratingsDescription = 'Thats better';
  }
  return {
    periodLength,
    trainingDays,
    success,
    ratings,
    ratingsDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 3, 2, 4.5, 0, 3, 1], 2));
