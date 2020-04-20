interface ExercisesValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  ratings: number;
  ratingsDescription: string;
  target: number;
  average: number;
}

interface TargetAndDays {
  target: number;
  days: Array<number>;
}

const parseArguments = (args: Array<string>): TargetAndDays => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [, , target, ...days] = args;
  const daysArray: Array<number> = [];

  for (const day of days) {
    daysArray.push(Number(day));
  }
  if (!isNaN(Number(target)) && !daysArray.includes(NaN)) {
    return {
      target: Number(target),
      days: daysArray,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (
  exersisesDays: Array<number>,
  target: number
): ExercisesValues => {
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
    if (average < target / 2) {
      success = false;
      ratings = 1;
      ratingsDescription = 'you can do better then this';
    } else {
      success = false;
      ratings = 2;
      ratingsDescription = 'not too bad but could be better';
    }
  } else if (average >= target) {
    success = true;
    ratings = 3;
    ratingsDescription = 'You are doing great keep it up';
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

try {
  const { target, days } = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

// console.log(calculateExercises([0, 4, 0, 1, 0, 3, 1], 2));
