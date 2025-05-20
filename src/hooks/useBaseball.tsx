import { useState } from "react";
import { sampleZustandStore } from "../state/ZustandSampleState";

const useBaseball = () => {
  const { game, setGame } = sampleZustandStore();

  const [status, setStatus] = useState({ isError: false, message: "" });

  const tryGame = (input: string) => {
    try {
      setGame(game.tryBall(input));
      setStatus({ isError: false, message: "" });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setStatus({ isError: true, message: e.message });
      }
    }
  };

  return {
    game,
    tryGame,
    isEnd: game.isEnd,
    history: game.history,
    isError: status.isError,
    errorMessage: status.message,
  };
};

export default useBaseball;
