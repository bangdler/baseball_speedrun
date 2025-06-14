"use client";
import React from "react";
import useBaseball from "../../hooks/useBaseball";
import BaseballPlayerItem from "../organisms/BaseballPlayerItem";
import BaseballGame from "../../domain/BaseballGame";
import BaseballGameApi, { BaseballGameDto } from "../../api/baseballGame";
import BaseballNumber from "../../domain/BaseballNumber";
import BaseballPlayer from "../../domain/BaseballPlayer";
import useFetchBaseballGame from "../../hooks/useFetchBaseballGame";
import RandomBallCreator from "../../domain/RandomBallCreator";

interface Props {
  id: number;
}

const BaseballPage = ({ id }: Props) => {
  const { data, refetch } = useFetchBaseballGame(id);

  const defaultGame = new BaseballGame({
    id: data?.id ?? new Date().getTime(),
    answer: new BaseballNumber(
      data?.answer.join("") ?? RandomBallCreator.createRandomBalls().join("")
    ),
    players:
      data?.players.map(
        (p) =>
          new BaseballPlayer({
            id: p.id,
            history: p.history,
            isWinner: p.isWinner,
          })
      ) ?? [],
    curPlayerIdx: data?.curPlayerIdx ?? 0,
    status: data?.status ?? "IDLE",
  });
  const { game, addPlayer, removePlayer, reset, tryBall } = useBaseball({
    defaultGame: defaultGame,
  });

  console.log(game.answer.numbers);

  function renderStatus() {
    switch (game.status) {
      case "IDLE":
        return "게임 시작";
      case "PROGRESS":
        return "진행중...";
      case "END":
        return "종료";
      default:
        const _exhaustiveCheck: never = game.status;
        throw new Error(`Unhandled status: ${_exhaustiveCheck}`);
    }
  }

  async function saveGame() {
    try {
      await BaseballGameApi.updateGame({
        id: game.id,
        curPlayerIdx: game.curPlayerIdx,
        status: game.status,
        updatedPlayers: game.players.map((p) => {
          return { id: p.id, history: p.history, isWinner: p.isWinner };
        }),
      });
      refetch();
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
      <h1 className="text-2xl font-bold">⚾️ 숫자 야구 게임</h1>
      <p className="text-gray-600">
        1~9까지의 수를 중복 없이 3개 입력해주세요.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={addPlayer}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          사용자 추가
        </button>
        <button
          disabled={game.status !== "END"}
          onClick={reset}
          className={`px-4 py-2 rounded text-white ${
            game.status !== "END"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          다시하기
        </button>
        <button
          onClick={saveGame}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          게임 저장
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">{renderStatus()}</h2>

      <div className="grid gap-4">
        {game.players.map((player, idx) => (
          <div
            key={player.id}
            className="border border-gray-300 p-4 rounded shadow-sm bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">
                플레이어 {idx + 1}
              </span>
              <button
                onClick={() => removePlayer(player.id)}
                className="text-sm text-red-500 hover:underline"
              >
                사용자 삭제
              </button>
            </div>

            <BaseballPlayerItem
              myIdx={idx}
              curPlayerIdx={game.curPlayerIdx}
              player={player}
              onSubmit={tryBall}
              isEnd={game.status === "END"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseballPage;
