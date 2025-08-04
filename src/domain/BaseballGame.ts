import BaseballNumber from "./BaseballNumber";
import BaseballPlayer from "./BaseballPlayer";
import RandomBallCreator from "./RandomBallCreator";

export type GameStatus = "IDLE" | "PROGRESS" | "END";
interface Props {
  id: number;
  answer: BaseballNumber;
  players: BaseballPlayer[];
  curPlayerIdx: number;
  status: GameStatus;
}

export default class BaseballGame {
  id: number;
  answer: BaseballNumber;
  players: BaseballPlayer[];
  curPlayerIdx: number;
  status: GameStatus;

  constructor({ id, answer, players, curPlayerIdx, status }: Props) {
    this.id = id;
    this.answer = answer;
    this.players = players;
    this.curPlayerIdx = curPlayerIdx;
    this.status = status;
  }

  addPlayer() {
    const newPlayer = new BaseballPlayer({
      id: new Date().getTime(),
      history: [],
      isWinner: false,
    });

    this.players.push(newPlayer);

    return this.reset();
  }

  removePlayer(id: number) {
    this.players = this.players.filter((p) => p.id !== id);

    return this.reset();
  }

  tryBall(input: string) {
    const curPlayer = this.players[this.curPlayerIdx];
    curPlayer.tryBall({ input, answer: this.answer });

    if (curPlayer.isWinner) {
      this.status = "END";
    } else {
      this.status = "PROGRESS";
    }

    this.curPlayerIdx = this.turnNext();

    return new BaseballGame({
      id: this.id,
      answer: this.answer,
      players: this.players,
      curPlayerIdx: this.curPlayerIdx,
      status: this.status,
    });
  }

  turnNext() {
    const nextIdx = this.curPlayerIdx + 1;
    if (nextIdx > this.players.length - 1) {
      return 0;
    }
    return nextIdx;
  }

  reset() {
    return new BaseballGame({
      id: this.id,
      answer: new BaseballNumber(
        RandomBallCreator.createRandomBalls().join("")
      ),
      players: this.players.map((p) => p.reset()),
      curPlayerIdx: 0,
      status: "IDLE",
    });
  }
}
