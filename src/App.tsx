import { useState, useEffect } from "react";
import AlbumCover from "@/components/AlbumCover";
import GuessInput from "@/components/GuessInput";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGameLogic } from "@/hooks/useGameLogic";
import { getRandomAlbum } from "@/services/album-service";
import type { Album } from "@/types";

function App() {
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to load a new album
  const loadAlbum = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedAlbum = await getRandomAlbum();
      setAlbum(fetchedAlbum);
    } catch (err) {
      console.error('Failed to load album:', err);
      setError('Failed to load album. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load initial album on mount
  useEffect(() => {
    loadAlbum();
  }, []);

  const { gameState, handleGuess, handleReset } = useGameLogic(album);
  const { guesses, isComplete, isWon, attempts } = gameState;

  // Handle play again - reset game and load new album
  const handlePlayAgain = () => {
    handleReset();
    loadAlbum();
  };

  // Show loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show error state
  if (error || !album) {
    return (
      <ErrorMessage
        message={error || 'Album not found'}
        onRetry={() => window.location.reload()}
      />
    );
  }

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
            onClick={handlePlayAgain}
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
