import BaseballNumber from "./BaseballNumber";

export interface History {
  id: number;
  input: string;
  strike: number;
  ball: number;
}

export default class BaseballPlayer {
  id: number;
  isWinner: boolean;
  history: History[];

  constructor({
    id,
    isWinner,
    history,
  }: {
    id: number;
    isWinner: boolean;
    history: History[];
  }) {
    this.id = id;
    this.isWinner = isWinner;
    this.history = history;
  }

  tryBall({ answer, input }: { answer: BaseballNumber; input: string }) {
    const baseball = new BaseballNumber(input);
    let isAnswer = false;
    if (baseball.isEqual(answer)) {
      isAnswer = true;
      this.isWinner = true;
    }
    const { strike, ball } = baseball.compareTo(answer);

    this.history.push({ id: new Date().getTime(), input, strike, ball });

    return isAnswer;
  }

  clone() {
    return new BaseballPlayer({
      id: this.id,
      isWinner: this.isWinner,
      history: this.history,
    });
  }
}
