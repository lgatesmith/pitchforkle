export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  rating: number;
  year?: string;
  genre?: string;
  reviewer?: string;
  isBestNewMusic?: boolean;
}

export interface Guess {
  value: number;
  difference: number;
}

export type GamePhase = "idle" | "guessing" | "revealed" | "complete";

export type UnlockType = "year" | "genre" | "reviewer" | "bestNewMusic";
