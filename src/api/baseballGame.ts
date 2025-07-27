import { GameStatus } from "../domain/BaseballGame";
import { BaseballGameCreateRequest } from "./dto/BaseballGameCreateRequest";
import { BaseballGameResponse } from "./dto/BaseballGameResponse";
import { BaseballGameResponses } from "./dto/BaseballGameResponses";
import { PlayerResponse } from "./dto/PlayerResponse";

const BASE_URL = "http://localhost:8080/games";

export default class BaseballGameApi {
  static async getAllGames(): Promise<BaseballGameResponses> {
    const result = await fetch(`${BASE_URL}/list`, {
      method: "GET",
    });
    return result.json();
  }

  static async createGame(request: BaseballGameCreateRequest) {
    const result = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return result.json();
  }

  static async getGameById(id: number): Promise<BaseballGameResponse> {
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
    updatedPlayers: PlayerResponse[];
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
