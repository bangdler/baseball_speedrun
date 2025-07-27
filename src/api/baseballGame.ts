import { GameStatus } from "../domain/BaseballGame";
import { BaseballGameCreateRequest } from "./dto/BaseballGameCreateRequest";
import { BaseballGameResponse } from "./dto/BaseballGameResponse";
import { BaseballGameResponses } from "./dto/BaseballGameResponses";
import { BaseballGameTryBallRequest } from "./dto/BaseballGameTryBallRequest";
import { PlayerResponse } from "./dto/PlayerResponse";

const BASE_URL = "http://localhost:8080/games";

export default class BaseballGameApi {
  static async getAllGames(): Promise<BaseballGameResponses> {
    const result = await fetch(`${BASE_URL}/list`, {
      method: "GET",
    });
    if (result.ok) {
      return result.json();
    }
    const error = await result.json();
    throw Error(error?.error.message);
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
    if (result.ok) {
      return result.json();
    }
    const error = await result.json();
    throw Error(error?.error.message);
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

  static async addPlayer({ id }: { id: number }) {
    const result = await fetch(`${BASE_URL}/${id}/player`, {
      method: "POST",
    });
    return result.json();
  }

  static async removePlayer({
    id,
    playerId,
  }: {
    id: number;
    playerId: number;
  }) {
    const result = await fetch(`${BASE_URL}/${id}/player/${playerId}`, {
      method: "DELETE",
    });
    return result;
  }

  static async tryBall({
    id,
    request,
  }: {
    id: number;
    request: BaseballGameTryBallRequest;
  }) {
    const result = await fetch(`${BASE_URL}/${id}/try-ball`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (result.ok) {
      return result.json();
    }
    const error = await result.json();
    throw Error(error?.error.message);
  }
}
