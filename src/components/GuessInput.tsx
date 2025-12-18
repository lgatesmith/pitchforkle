import { useState } from "react";
import { MIN_RATING, MAX_RATING, RATING_STEP } from "@/constants/game";
import { Badge } from "@/components/ui/badge";

interface GuessInputProps {
  onGuess: (guess: number) => void;
  disabled: boolean;
}

export default function GuessInput({ onGuess, disabled }: GuessInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guess = parseFloat(inputValue);

    if (isNaN(guess) || guess < MIN_RATING || guess > MAX_RATING) {
      setError(
        `Enter a valid rating between ${MIN_RATING.toFixed(
          1
        )} and ${MAX_RATING.toFixed(1)}`
      );
      return;
    }

    setError("");
    onGuess(guess);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="w-[140px] h-[140px] rounded-full border-[7px] border-brand-black flex items-center justify-center transition-all hover:border-primary focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/20">
        <input
          type="number"
          step={RATING_STEP}
          min={MIN_RATING}
          max={MAX_RATING}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError("");
          }}
          placeholder="0.0"
          disabled={disabled}
          className="w-full h-full border-none bg-transparent text-5xl font-extrabold text-center text-foreground outline-none placeholder:text-muted-foreground/30 disabled:cursor-not-allowed disabled:text-muted-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      {error && (
        <Badge
          variant="destructive"
          className="mt-4 text-xs animate-in fade-in slide-in-from-top-2 duration-300"
        >
          {error}
        </Badge>
      )}
    </form>
  );
}
