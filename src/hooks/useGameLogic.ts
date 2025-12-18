import { useState } from 'react';
import type { Album, GameState, Guess } from '@/types';
import { RATING_TOLERANCE } from '@/constants/game';

export const useGameLogic = (initialAlbum: Album) => {
  const [gameState, setGameState] = useState<GameState>({
    album: initialAlbum,
    guesses: [],
    isComplete: false,
    attempts: 0,
  });

  const handleGuess = (guessValue: number) => {
    if (!gameState.album) return;

    const difference = guessValue - gameState.album.rating;
    const newGuess: Guess = {
      value: guessValue,
      difference,
    };

    const newGuesses = [...gameState.guesses, newGuess];
    const isComplete = Math.abs(difference) < RATING_TOLERANCE;

    setGameState({
      ...gameState,
      guesses: newGuesses,
      isComplete,
      attempts: newGuesses.length,
    });
  };

  const handleReset = () => {
    setGameState({
      ...gameState,
      guesses: [],
      isComplete: false,
      attempts: 0,
    });
  };

  return {
    gameState,
    handleGuess,
    handleReset,
  };
};
