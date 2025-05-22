import BaseballNumber from "./BaseballNumber";
import RandomBallCreator from "./RandomBallCreator";

export interface History {
  id: number;
  input: string;
  strike: number;
  ball: number;
}

interface Props {
  answer: BaseballNumber;
  isEnd: boolean;
  history: History[];
}
export default class BaseballGame {
  answer: BaseballNumber;
  isEnd: boolean;
  history: History[];

  constructor({ answer, isEnd, history }: Props) {
    this.answer = answer;
    this.isEnd = isEnd;
    this.history = history;
    console.log(answer.numbers.join(""));
  }

  tryBall(input: string): BaseballGame {
    const baseballNumber = new BaseballNumber(input);

    if (baseballNumber.isEqual(this.answer)) {
      this.isEnd = true;
    }

    const { strike, ball } = baseballNumber.compareTo(this.answer);

    this.history.push({ id: new Date().getTime(), input, strike, ball });

    return new BaseballGame({
      answer: this.answer,
      isEnd: this.isEnd,
      history: this.history,
    });
  }
}
