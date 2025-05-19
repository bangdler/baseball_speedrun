import RandomBallCreator from "./RandomBallCreator";

export default class BaseballGame {
  answer: number[];

  constructor() {
    this.answer = RandomBallCreator.createRandomBalls();
  }
}
