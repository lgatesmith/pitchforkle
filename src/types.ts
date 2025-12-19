export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  rating: number;
}

export interface Guess {
  value: number;
  difference: number;
}

export interface GameState {
  album: Album | null;
  guesses: Guess[];
  isComplete: boolean;
  isWon: boolean;
  attempts: number;
}
