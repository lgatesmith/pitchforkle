import { create } from "zustand";
import type { Album, Guess, GamePhase, UnlockType } from "@/types";
import {
  MAX_GUESSES,
  RATING_TOLERANCE,
  BASE_SCORE,
  WRONG_GUESS_PENALTY,
  UNLOCK_PENALTIES,
} from "@/constants/game";

interface GameStore {
  // State
  album: Album | null;
  guesses: Guess[];
  gamePhase: GamePhase;
  activeUnlocks: UnlockType[];
  score: number;
  isWon: boolean;

  // Derived
  scoreCeiling: () => number;
  guessesLeft: () => number;

  // Actions
  setAlbum: (album: Album) => void;
  startGame: () => void;
  submitGuess: (value: number) => void;
  activateUnlock: (unlock: UnlockType) => void;
  resetGame: () => void;
}

const initialState = {
  album: null as Album | null,
  guesses: [] as Guess[],
  gamePhase: "idle" as GamePhase,
  activeUnlocks: [] as UnlockType[],
  score: BASE_SCORE,
  isWon: false,
};

export const useGameStore = create<GameStore>()((set, get) => ({
  ...initialState,

  scoreCeiling: () => {
    const { activeUnlocks, guesses } = get();
    const unlockPenalty = activeUnlocks.reduce(
      (total, unlock) => total + UNLOCK_PENALTIES[unlock],
      0,
    );
    const guessPenalty = guesses.length * WRONG_GUESS_PENALTY;
    return Math.max(1, BASE_SCORE - unlockPenalty - guessPenalty);
  },

  guessesLeft: () => MAX_GUESSES - get().guesses.length,

  setAlbum: (album) => set({ album }),

  startGame: () => {
    if (!get().album) return;
    set({ gamePhase: "guessing" });
  },

  submitGuess: (value) => {
    const state = get();
    if (state.gamePhase !== "guessing" || !state.album) return;

    const difference = value - state.album.rating;
    const isExactMatch = Math.abs(difference) <= RATING_TOLERANCE;
    const newGuess: Guess = { value, difference };
    const newGuesses = [...state.guesses, newGuess];
    const outOfGuesses = newGuesses.length >= MAX_GUESSES;

    if (isExactMatch) {
      set({
        guesses: newGuesses,
        isWon: true,
        score: get().scoreCeiling(),
        gamePhase: "complete",
      });
    } else if (outOfGuesses) {
      set({
        guesses: newGuesses,
        isWon: false,
        score: 0,
        gamePhase: "revealed",
      });
    } else {
      set({ guesses: newGuesses });
    }
  },

  activateUnlock: (unlock) => {
    const state = get();
    if (state.gamePhase !== "guessing") return;
    if (state.activeUnlocks.includes(unlock)) return;
    set({ activeUnlocks: [...state.activeUnlocks, unlock] });
  },

  resetGame: () => set({ ...initialState }),
}));
