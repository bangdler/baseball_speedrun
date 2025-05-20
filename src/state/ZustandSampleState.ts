import { create } from "zustand/react";
import BaseballGame from "../domain/BaseballGame";

interface State {
  game: BaseballGame;
}

interface Actions {
  setGame: (game: BaseballGame) => void;
}

export const sampleZustandStore = create<State & Actions>((set) => ({
  game: new BaseballGame({}),
  setGame: (game) => set({game}),
}));
