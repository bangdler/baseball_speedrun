import { create } from "zustand/react";
import BaseballGame from "../domain/BaseballGame";
import BaseballNumber from "../domain/BaseballNumber";
import RandomBallCreator from "../domain/RandomBallCreator";

interface State {
  game: BaseballGame;
}

interface Actions {
  setGame: (game: BaseballGame) => void;
}

export const sampleZustandStore = create<State & Actions>((set) => ({
  game: new BaseballGame({
    answer: new BaseballNumber(RandomBallCreator.createRandomBalls().join("")),
    players: [],
    curPlayerIdx: 0,
    status: "IDLE",
  }),
  setGame: (game: BaseballGame) => set({ game }),
}));
