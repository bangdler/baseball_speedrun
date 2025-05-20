import Baseball from "./Baseball";
import RandomBallCreator from "./RandomBallCreator";

interface History {
  id: number;
  input: string;
  strike: number;
  ball: number;
}

interface Props {
  answer?: Baseball;
  isEnd?: boolean;
  history?: History[];
}
export default class BaseballGame {
  answer: Baseball;
  isEnd: boolean;
  history: History[];

  constructor({ answer, isEnd, history }: Props) {
    this.answer =
      answer ?? new Baseball(RandomBallCreator.createRandomBalls().join(""));
    this.isEnd = isEnd ?? false;
    this.history = history ?? [];
    console.log(this.answer);
  }

  tryBall(input: string) {
    const curBaseball = new Baseball(input);

    if (curBaseball.isEqual(this.answer)) {
      this.isEnd = true;
    }

    const { strike, ball } = curBaseball.compareTo(this.answer);

    this.history.push({ id: new Date().getTime(), input, strike, ball });

    return new BaseballGame({
      answer: this.answer,
      isEnd: this.isEnd,
      history: this.history,
    });
  }
}
