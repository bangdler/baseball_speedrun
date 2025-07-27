import { GameStatus } from "../../domain/BaseballGame";
import { PlayerResponse } from "./PlayerResponse";

export interface BaseballGameResponse {
  id: number;
  name: string;
  status: GameStatus;
  players: PlayerResponse[];
  curPlayerIdx: number;
  answer: number[];
}
