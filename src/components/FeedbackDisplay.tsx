import type { Guess } from '@/types';
import { getFeedbackText } from '@/utils/feedback';

interface FeedbackDisplayProps {
  guesses: Guess[];
}

export default function FeedbackDisplay({ guesses }: FeedbackDisplayProps) {
  if (guesses.length === 0) return null;

  const lastGuess = guesses[guesses.length - 1];
  const feedbackText = getFeedbackText(lastGuess.difference);

  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      <p className="text-lg font-medium text-foreground uppercase mb-2 relative after:content-[''] after:block after:w-[50px] after:h-[1px] after:bg-[rgb(204,204,204)] after:mx-auto after:mt-2">
        {feedbackText}
      </p>
    </div>
  );
}
