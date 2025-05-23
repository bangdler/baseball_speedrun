import { create } from "zustand/react";
import BaseballGame from "../domain/BaseballGame";
import BaseballNumber from "../domain/BaseballNumber";
import RandomBallCreator from "../domain/RandomBallCreator";
import BaseballPlayer from "../domain/BaseballPlayer";

interface State {
  game: BaseballGame;
}

interface Actions {
  setGame: (game: BaseballGame) => void;
}

export const sampleZustandStore = create<State & Actions>((set) => ({
  game: new BaseballGame({
    answer: new BaseballNumber(RandomBallCreator.createRandomBalls().join("")),
    players: [
      new BaseballPlayer({
        id: new Date().getTime() + 1,
        isWinner: false,
        history: [],
      }),
      new BaseballPlayer({
        id: new Date().getTime() + 2,
        isWinner: false,
        history: [],
      }),
    ],
    isEnd: false,
    curPlayerIdx: 0,
  }),
  setGame: (game: BaseballGame) => set({ game }),
}));
