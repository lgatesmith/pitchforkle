import AlbumCover from "@/components/AlbumCover";
import GuessInput from "@/components/GuessInput";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGameLogic } from "@/hooks/useGameLogic";
import { SAMPLE_ALBUMS } from "@/data/albums";

function App() {
  const { gameState, handleGuess, handleReset } = useGameLogic(
    SAMPLE_ALBUMS[0]
  );
  const { album, guesses, isComplete, isWon, attempts } = gameState;

  if (!album) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brand-black text-white text-center py-8 border-b-[3px] border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl font-semibold tracking-wide">PITCHFORKLE</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-background text-foreground gap-[5vw]">
        <div className="flex gap-8 items-center max-md:flex-col">
          <div className="flex justify-center items-center">
            <AlbumCover album={album} showDetails={isComplete} />
          </div>

          <div className="flex flex-col justify-center items-center min-w-[200px]">
            {!isComplete ? (
              <>
                <GuessInput onGuess={handleGuess} disabled={isComplete} />
                <FeedbackDisplay guesses={guesses} />
              </>
            ) : (
              <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
                <div className={`w-[140px] h-[140px] rounded-full border-[7px] flex items-center justify-center shadow-lg ${
                  isWon
                    ? "border-green-500 shadow-green-500/20"
                    : "border-red-500 shadow-red-500/20"
                }`}>
                  <span className={`text-5xl font-extrabold ${
                    isWon ? "text-green-500" : "text-red-500"
                  }`}>
                    {album.rating.toFixed(1)}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold">
                  {isWon ? "Correct!" : "Game Over!"}
                </h2>
                <Badge variant="outline" className="text-base">
                  {attempts} {attempts === 1 ? "attempt" : "attempts"}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {isComplete && (
          <Button
            onClick={handleReset}
            className="bg-brand-black hover:bg-brand-black/90 text-white uppercase tracking-wide"
            size="lg"
          >
            Play Again
          </Button>
        )}
      </main>
    </div>
  );
}

export default App;
