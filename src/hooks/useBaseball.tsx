import { useEffect, useState } from "react";
import BaseballGame from "../domain/BaseballGame";
import { sampleZustandStore } from "../state/ZustandSampleState";

interface Props {
  defaultGame: BaseballGame | null;
}

const useBaseball = ({ defaultGame }: Props) => {
  const [game, setGame] = useState(defaultGame);

  useEffect(() => {
    setGame(defaultGame);
  }, [defaultGame]);

  function addPlayer() {
    if (!game) return;
    setGame(game.addPlayer());
  }

  function removePlayer(id: number) {
    if (!game) return;
    setGame(game.removePlayer(id));
  }

  function tryBall(input: string) {
    if (!game) return;
    setGame(game.tryBall(input));
  }

  function reset() {
    if (!game) return;
    setGame(game.reset());
  }

  return { game, addPlayer, removePlayer, tryBall, reset };
};

export default useBaseball;
