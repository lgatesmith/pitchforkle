// src/App.tsx

import { useState } from "react";
import GuessInput from "@/components/GuessInput";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGameStore } from "@/store/gameStore";
import { getDailyAlbum } from "@/services/album-service";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    album,
    guesses,
    gamePhase,
    isWon,
    score,
    scoreCeiling,
    guessesLeft,
    setAlbum,
    startGame,
    submitGuess,
    resetGame,
  } = useGameStore();

  const loadAlbum = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetched = await getDailyAlbum();
      setAlbum(fetched);
      startGame();
    } catch (err) {
      console.error("Failed to load album:", err);
      setError("No puzzle scheduled for today. Check back tomorrow!");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    loadAlbum();
  };

  if (loading) return <LoadingSpinner />;

  if (error || !album) {
    return (
      <ErrorMessage
        message={error || "Album not found"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const isComplete = gamePhase === "complete" || gamePhase === "revealed";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brand-black text-white text-center py-8 border-b-[3px] border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl font-semibold tracking-wide">PITCHFORKLE</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-background text-foreground">
        <div
          className={`w-full max-w-7xl border-b border-[#eeeeee] pb-[5vh] ${
            isComplete
              ? "grid grid-cols-2 gap-8 items-center max-md:grid-cols-1"
              : ""
          }`}
        >
          {/* Left column — album info (only when complete) */}
          {isComplete && (
            <div className="flex justify-center items-center">
              <div
                className="max-w-[500px] flex flex-col items-center gap-8 animate-in fade-in duration-500"
                style={{ textAlign: "center" }}
              >
                <h2
                  className="text-brand-black superior-title-700-italic"
                  style={{ fontSize: "48px", lineHeight: "1.16667em" }}
                >
                  {album.title}
                </h2>
                <p
                  className="text-brand-black uppercase underline"
                  style={{ fontSize: "28px" }}
                >
                  {album.artist}
                </p>
                {album.year && (
                  <p className="text-brand-black text-sm mt-2">{album.year}</p>
                )}
              </div>
            </div>
          )}

          {/* Right column — album cover + game */}
          <div
            className={
              isComplete ? "" : "flex justify-center items-center w-full"
            }
          >
            <div className="flex gap-8 items-center max-md:flex-col">
              {/* Album cover */}
              <div className="flex justify-center items-center">
                <img
                  src={album.coverUrl}
                  alt={`${album.artist} - ${album.title}`}
                  className="w-[312px] aspect-square object-cover rounded-sm shadow-md transition-transform hover:scale-[1.02]"
                />
              </div>

              {/* Game area */}
              <div className="flex flex-col justify-center items-center min-w-[200px]">
                {!isComplete ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Score ceiling: {scoreCeiling()}/10
                    </p>
                    <GuessInput onGuess={submitGuess} disabled={isComplete} />
                    <FeedbackDisplay guesses={guesses} />
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
                    <div
                      className={`w-[140px] h-[140px] rounded-full border-[7px] flex items-center justify-center ${
                        isWon ? "border-green-500" : "border-red-500"
                      }`}
                    >
                      <span
                        className={`text-5xl font-extrabold ${isWon ? "text-green-500" : "text-red-500"}`}
                      >
                        {album.rating.toFixed(1)}
                      </span>
                    </div>
                    {isWon && (
                      <p className="text-brand-black font-semibold">
                        {score}/10
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center gap-4 pt-[5vh]">
          {isComplete && (
            <h2 className="text-brand-black font-semibold uppercase">
              {isWon ? "Correct!" : "Game Over!"}
            </h2>
          )}
          {!isComplete ? (
            <Badge variant="pill">
              {guessesLeft()} {guessesLeft() === 1 ? "guess" : "guesses"}{" "}
              remaining
            </Badge>
          ) : (
            isWon && (
              <p className="text-brand-black">
                Got it in {guesses.length}{" "}
                {guesses.length === 1 ? "attempt" : "attempts"}
              </p>
            )
          )}
          {isComplete && <Button onClick={handlePlayAgain}>Play Again</Button>}
        </div>
      </main>
    </div>
  );
}

export default App;
