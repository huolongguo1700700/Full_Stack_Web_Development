interface DailyExerciseHour {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercise = (arr: number[], target: number): DailyExerciseHour => {
  let rating = 1;
  let ratingDescription = '';
  const trainingDays = arr.filter(a => a > 0).length;

  if (trainingDays < target) {
    rating = 1;
    ratingDescription = 'Not too bad but could be better';
  } else if (trainingDays === target) {
    rating = 2;
    ratingDescription = 'Well done';
  }
  else {
    rating = 3;
    ratingDescription = 'Amazing. Good Job.';
  }

  return ({
    periodLength: arr.length,
    trainingDays: arr.filter(a => a > 0).length,
    success: arr.filter(a => a > 0).length >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: arr.reduce((acc, el) => acc + el, 0) / arr.length
  });
};

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));