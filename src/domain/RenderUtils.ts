import { History } from "./BaseballPlayer";

export default class RenderUtils {
  static renderHistoryToString(history: History) {
    if (history.strike === 3) {
      return "3 Strike! 정답입니다!";
    }
    if (history.ball === 0 && history.strike === 0) {
      return "...나씽";
    }
    return `${history.strike}S ${history.ball}B`;
  }
}
