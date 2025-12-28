import type { Guess } from "@/types";
import { getFeedbackText } from "@/utils/feedback";

interface FeedbackDisplayProps {
  guesses: Guess[];
}

export default function FeedbackDisplay({ guesses }: FeedbackDisplayProps) {
  if (guesses.length === 0) return null;

  const lastGuess = guesses[guesses.length - 1];
  const feedbackText = getFeedbackText(lastGuess.difference);

  return (
    <div className="flex flex-col items-center mt-6">
      <p className="text-lg font-medium text-foreground uppercase relative before:content-[''] before:block before:w-[50px] before:h-[1px] before:bg-[rgb(204,204,204)] before:mx-auto before:mb-4">
        {feedbackText}
      </p>
    </div>
  );
}
