import { sampleZustandStore } from "../state/ZustandSampleState";

const useBaseball = () => {
  const { game, setGame } = sampleZustandStore();

  const tryGame = (input: string) => {
    setGame({ game: game.try(input) });
  };

  return { game, tryGame };
};

export default useBaseball;
