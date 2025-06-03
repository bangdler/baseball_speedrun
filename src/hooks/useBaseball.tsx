import { sampleZustandStore } from "../state/ZustandSampleState";

const useBaseball = () => {
  const { game, setGame } = sampleZustandStore();

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
