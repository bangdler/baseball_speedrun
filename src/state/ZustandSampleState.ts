import { create } from "zustand/react";
import BaseballGame from "../domain/BaseballGame";

interface State {
  game: BaseballGame;
}

interface Actions {
  setGame: ({ game }: { game: BaseballGame }) => void;
}

export const sampleZustandStore = create<State & Actions>((set) => ({
  game: new BaseballGame({}),
  setGame: ({ game }: { game: BaseballGame }) => set({ game }),
}));
