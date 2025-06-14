import { useState } from "react";
import BaseballGame from "../domain/BaseballGame";
import { sampleZustandStore } from "../state/ZustandSampleState";

interface Props {
  defaultGame: BaseballGame;
}

const useBaseball = ({ defaultGame }: Props) => {
  const [game, setGame] = useState(defaultGame);

  function addPlayer() {
    setGame(game.addPlayer());
  }

  function removePlayer(id: number) {
    setGame(game.removePlayer(id));
  }

  function tryBall(input: string) {
    setGame(game.tryBall(input));
  }

  function reset() {
    setGame(game.reset());
  }

  return { game, addPlayer, removePlayer, tryBall, reset };
};

export default useBaseball;
