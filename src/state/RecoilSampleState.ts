import { atom } from "recoil";
import BaseballGame from "../domain/BaseballGame";

type State = {
  game: BaseballGame;
};

export const sampleRecoilStore = atom<State>({
  key: "sampleState",
  default: { game: new BaseballGame() },
});
