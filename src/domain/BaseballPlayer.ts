import BaseballNumber from "./BaseballNumber";

export interface History {
  id: number;
  input: string;
  strike: number;
  ball: number;
}

interface Props {
  id: number;
  history: History[];
  isWinner: boolean;
}

export default class BaseballPlayer {
  id: number;
  history: History[];
  isWinner: boolean;

  constructor({ id, history, isWinner }: Props) {
    this.id = id;
    this.history = history;
    this.isWinner = isWinner;
  }

  tryBall({ answer, input }: { answer: BaseballNumber; input: string }) {
    const baseballNumber = new BaseballNumber(input);

    if (baseballNumber.isEqaul(answer)) {
      this.isWinner = true;
    }

    const { strike, ball } = baseballNumber.compareTo(answer);
    this.history.push({ id: new Date().getTime(), input, strike, ball });

    return this;
  }

  reset() {
    return new BaseballPlayer({
      id: this.id,
      history: [],
      isWinner: false,
    });
  }
}
