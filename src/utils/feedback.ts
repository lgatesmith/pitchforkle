export const getFeedbackText = (difference: number): string => {
  if (difference === 0) return 'Perfect!';
  return difference > 0 ? 'Too high' : 'Too low';
};
