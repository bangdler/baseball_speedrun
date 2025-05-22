import { History } from "./BaseballGame";

export default class RenderUtils {
  static renderToString({ input, strike, ball }: History) {
    if (strike === 3) {
      return `${input} 정답입니다!`;
    }
    if (strike === 0 && ball === 0) {
      return "나싱...";
    }
    return `${strike}S ${ball}B`;
  }
}
