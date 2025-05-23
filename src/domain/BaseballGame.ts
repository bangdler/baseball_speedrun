import BaseballNumber from "./BaseballNumber";
import BaseballPlayer from "./BaseballPlayer";
import RandomBallCreator from "./RandomBallCreator";

export default class BaseballGame {
  answer: BaseballNumber;
  players: BaseballPlayer[];
  isEnd: boolean;
  curPlayerIdx: number;

  constructor({
    answer,
    players,
    isEnd,
    curPlayerIdx,
  }: {
    answer: BaseballNumber;
    players: BaseballPlayer[];
    isEnd: boolean;
    curPlayerIdx: number;
  }) {
    this.answer = answer;
    this.players = players;
    this.isEnd = isEnd;
    this.curPlayerIdx = curPlayerIdx;
  }

  tryBall(input: string) {
    const curPlayer = this.players[this.curPlayerIdx];
    const isAnswer = curPlayer.tryBall({ answer: this.answer, input });
    if (isAnswer) {
      this.isEnd = true;
    }
    this.curPlayerIdx = this.turnNext();

    return new BaseballGame({
      answer: this.answer,
      players: this.players.map((p) => p.clone()),
      isEnd: this.isEnd,
      curPlayerIdx: this.curPlayerIdx,
    });
  }

  turnNext() {
    const next = this.curPlayerIdx + 1;
    if (next > this.players.length - 1) return 0;
    return next;
  }
}
