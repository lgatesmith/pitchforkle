import { useState } from 'react';
import type { Album, GameState, Guess } from '@/types';
import { RATING_TOLERANCE, MAX_GUESSES } from '@/constants/game';

export const useGameLogic = (initialAlbum: Album) => {
  const [gameState, setGameState] = useState<GameState>({
    album: initialAlbum,
    guesses: [],
    isComplete: false,
    isWon: false,
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
    const isWon = Math.abs(difference) <= RATING_TOLERANCE;
    const isComplete = isWon || newGuesses.length >= MAX_GUESSES;

    setGameState({
      ...gameState,
      guesses: newGuesses,
      isComplete,
      isWon,
      attempts: newGuesses.length,
    });
  };

  const handleReset = () => {
    setGameState({
      ...gameState,
      guesses: [],
      isComplete: false,
      isWon: false,
      attempts: 0,
    });
  };

  return {
    gameState,
    handleGuess,
    handleReset,
  };
};
