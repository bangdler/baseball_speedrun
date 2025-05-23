import BaseballGame from "../domain/BaseballGame";
import BaseballNumber from "../domain/BaseballNumber";
import BaseballPlayer from "../domain/BaseballPlayer";
import RandomBallCreator from "../domain/RandomBallCreator";
import { sampleZustandStore } from "../state/ZustandSampleState";

const useBaseball = () => {
  const { game, setGame } = sampleZustandStore();

  function tryBall(input: string) {
    setGame(game.tryBall(input));
  }

  function resetGame() {
    setGame(
      new BaseballGame({
        answer: new BaseballNumber(
          RandomBallCreator.createRandomBalls().join("")
        ),
        players: [
          new BaseballPlayer({
            id: new Date().getTime() + 1,
            isWinner: false,
            history: [],
          }),
          new BaseballPlayer({
            id: new Date().getTime() + 2,
            isWinner: false,
            history: [],
          }),
        ],
        isEnd: false,
        curPlayerIdx: game.curPlayerIdx,
      })
    );
  }

  return {
    game: game,
    tryBall: tryBall,
    resetGame: resetGame,
  };
};

export default useBaseball;
