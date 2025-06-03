const BASE_URL = "http://localhost:8080/games";

class BaseballGameApi {
  static async getAllGames() {
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

  static async getGameById(id: number) {
    const result = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
    });
    return result.json();
  }

  static async deleteGame(id:number) {
    const result = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (result.status === 204) return true; 
    throw new Error("Failed to delete game");
  }

  static async updateGame({id, isEnd, updatedPlayers}: {id:number, isEnd:boolean, updatePlayers: }) {
    const result = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isEnd, updatedPlayers }),
    });
    if (result.status === 204) return true; 
    throw new Error("Failed to update game");
  }
}
