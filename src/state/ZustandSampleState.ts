import { create } from "zustand/react";
import BaseballGame from "../domain/BaseballGame";
import RandomBallCreator from "../domain/RandomBallCreator";
import BaseballNumber from "../domain/BaseballNumber";

interface State {
  game: BaseballGame;
}

interface Actions {
  setGame: (game: BaseballGame) => void;
}

export const sampleZustandStore = create<State & Actions>((set) => ({
  game: new BaseballGame({
    answer: new BaseballNumber(RandomBallCreator.createRandomBalls().join("")),
    isEnd: false,
    history: [],
  }),
  setGame: (game: BaseballGame) => set({ game }),
}));
