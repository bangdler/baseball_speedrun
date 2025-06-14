import BaseballNumber from "./BaseballNumber";
import BaseballPlayer from "./BaseballPlayer";
import RandomBallCreator from "./RandomBallCreator";

export type GameStatus = "IDLE" | "PROGRESS" | "END";
interface Props {
  answer: BaseballNumber;
  players: BaseballPlayer[];
  curPlayerIdx: number;
  status: GameStatus;
}

export default class BaseballGame {
  answer: BaseballNumber;
  players: BaseballPlayer[];
  curPlayerIdx: number;
  status: GameStatus;

  constructor({ answer, players, curPlayerIdx, status }: Props) {
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
      answer: new BaseballNumber(
        RandomBallCreator.createRandomBalls().join("")
      ),
      players: this.players.map((p) => p.reset()),
      curPlayerIdx: 0,
      status: "IDLE",
    });
  }
}
