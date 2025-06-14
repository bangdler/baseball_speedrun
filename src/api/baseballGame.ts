import { GameStatus } from "../domain/BaseballGame";
import { History } from "../domain/BaseballPlayer";

const BASE_URL = "http://localhost:8080/games";

export interface PlayerDto {
  id: number;
  isWinner: boolean;
  history: History[];
}

export interface BaseballGameDto {
  id: number;
  name: string;
  status: GameStatus;
  players: PlayerDto[];
  curPlayerIdx: number;
  answer: number[];
}

export default class BaseballGameApi {
  static async getAllGames(): Promise<BaseballGameDto[]> {
    const result = await fetch(`${BASE_URL}/list`, {
      method: "GET",
    });
    return result.json();
  }

  static async createGame(name: string) {
    const result = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    return result.json();
  }

  static async getGameById(id: number): Promise<BaseballGameDto> {
    const result = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
    });
    return result.json();
  }

  static async deleteGame(id: number) {
    const result = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (result.status === 204) return true;
    throw new Error("Failed to delete game");
  }

  static async updateGame({
    id,
    status,
    updatedPlayers,
    curPlayerIdx,
  }: {
    id: number;
    status: GameStatus;
    updatedPlayers: PlayerDto[];
    curPlayerIdx: number;
  }) {
    const result = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, updatedPlayers, curPlayerIdx }),
    });
    if (result.status === 204) return true;
    throw new Error("Failed to update game");
  }
}
