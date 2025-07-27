import { History } from "../../domain/BaseballPlayer";

export interface PlayerResponse {
      id: number;
      isWinner: boolean;
      history: History[];
}