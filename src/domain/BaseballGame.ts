import { Baseball } from "./Baseball";
import RandomBallCreator from "./RandomBallCreator";

interface History {
  input: string;
  result: {
    strike: number;
    ball: number;
  };
}

interface Config {
  answer?: Baseball;
  history?: History[];
  isEnd?: boolean;
}

export default class BaseballGame {
  answer: Baseball;
  history: History[];
  isEnd: boolean;

  constructor({ answer, history, isEnd }: Config) {
    this.answer =
      answer ??
      new Baseball(RandomBallCreator.createRandomBalls().map(String).join(""));
    this.history = history ?? [];
    this.isEnd = isEnd ?? false;
  }

  try(input: string): BaseballGame {
    const baseball = new Baseball(input);

    if (baseball.isEqual(this.answer)) {
      this.isEnd = true;
    }

    const result = baseball.compareTo(this.answer);

    this.history.push({ input, result });

    return new BaseballGame({
      answer: this.answer,
      history: this.history,
      isEnd: this.isEnd,
    });
  }
}
