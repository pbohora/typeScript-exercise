interface bmiValues {
  height: number;
  weight: number;
}

const parseArgument = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = height / 100;
  const result = weight / (heightInMeter * heightInMeter);
  if (result < 15) {
    return 'Very severely underweight';
  } else if (15 <= result && result < 16) {
    return 'Severely underweight';
  } else if (16 <= result && result < 18.5) {
    return 'Underweight';
  } else if (18.5 <= result && result < 25) {
    return 'Normal (healthy weight)';
  } else if (25 <= result && result < 30) {
    return 'Overweight';
  } else if (30 <= result && result < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (35 <= result && result < 40) {
    return 'Obese Class II (Severely obese)';
  } else if (result > 40) {
    return 'Obese Class III (Very severely obese)';
  }
};

try {
  const { height, weight } = parseArgument(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

// console.log(calculateBmi(180, 74));
