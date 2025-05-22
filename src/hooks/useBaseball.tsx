import { useState } from "react";
import { sampleZustandStore } from "../state/ZustandSampleState";
import BaseballGame from "../domain/BaseballGame";
import BaseballNumber from "../domain/BaseballNumber";
import RandomBallCreator from "../domain/RandomBallCreator";

const useBaseball = () => {
  const { game, setGame } = sampleZustandStore();

  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);

  function tryBall(input: string) {
    try {
      setGame(game.tryBall(input));
      setErrorMsg(undefined);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrorMsg(e.message);
      }
    }
  }

  function reset() {
    setGame(
      new BaseballGame({
        answer: new BaseballNumber(
          RandomBallCreator.createRandomBalls().join("")
        ),
        isEnd: false,
        history: [],
      })
    );
  }

  return {
    errorMsg: errorMsg,
    tryBall: tryBall,
    isEnd: game.isEnd,
    history: game.history,
    reset: reset,
  };
};

export default useBaseball;
