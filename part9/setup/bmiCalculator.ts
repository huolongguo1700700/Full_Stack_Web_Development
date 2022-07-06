const calculateBmiValue = (
  height: number,
  weight: number
): number => {
  const heightInMeter = height / 100;
  return weight / (heightInMeter * heightInMeter);
};

export const calculateBmi = (
  height: number,
  weight: number
) => {
  const bmiValue = calculateBmiValue(height, weight);
  if (bmiValue < 16) return 'Underweight (Severe thinness)';
  else if (bmiValue >= 16 && bmiValue <= 16.9) return 'Underweight (Moderate thinness)';
  else if (bmiValue >= 17 && bmiValue <= 18.4) return 'Underweight (Mild thinness)';
  else if (bmiValue >= 18.5 && bmiValue <= 24.9) return 'Normal range';
  else if (bmiValue >= 25.0 && bmiValue <= 29.9) return 'Overweight (Pre-obese)';
  else if (bmiValue >= 30.0 && bmiValue <= 34.9) return 'Obese (Class I)';
  else if (bmiValue >= 35.0 && bmiValue <=39.9) return 'Obese (Class II)';
  else return 'Obese (Class III)';
};

console.log(calculateBmi(180, 74));