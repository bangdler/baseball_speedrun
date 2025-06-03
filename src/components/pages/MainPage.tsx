"use client";

import BaseballGameApi, { BaseballGameDto } from "../../api/baseballGame";

interface Props {
  games: BaseballGameDto[];
}

const MainPage = ({ games }: Props) => {
  console.log(games);
  const handleClick = async () => {
    try {
      const result = await BaseballGameApi.createGame("test1");
      console.log(result);
    } catch (e) {}
  };

  return (
    <div>
      <p>games : </p>
      {games.map((game) => (
        <div key={game.id}>
          <span>{game.name}</span>
        </div>
      ))}

      <button onClick={handleClick}>game 생성하기</button>
    </div>
  );
};

export default MainPage;
