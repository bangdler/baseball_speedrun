"use client";

import { useState } from "react";
import BaseballGameApi, { BaseballGameDto } from "../../api/baseballGame";
import useFetchAllBaseballGames from "../../hooks/useFetchAllBaseballGames";
import BaseballGameCreateModal from "../organisms/BaseballGameCreateModal";

interface Props {}

const MainPage = ({}: Props) => {
  const { data: games, refetch } = useFetchAllBaseballGames();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;

    try {
      await BaseballGameApi.deleteGame(id);
      refetch();
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex gap-4"}>
        <p>games list </p>
        <button
          className={"border-2 border-blue-200"}
          onClick={() => setIsModalOpen(true)}
        >
          신규 게임 생성
        </button>
      </div>
      <div className={"flex gap-4"}>
        {games?.map((game) => (
          <div
            key={game.id}
            className="flex items-center gap-4 border border-blue-200 p-4 rounded shadow-sm"
          >
            <div className="flex flex-col">
              <span className="text-lg font-medium">{game.name}</span>
              <span
                className={`text-sm font-semibold ${
                  game.isEnd ? "text-red-600" : "text-green-600"
                }`}
              >
                {game.isEnd ? "종료됨" : "진행 중"}
              </span>
            </div>
            <button
              onClick={() => handleDelete(game.id)}
              className="ml-auto text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded disabled:opacity-50"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <BaseballGameCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actionAfterSubmit={refetch}
      />
    </div>
  );
};

export default MainPage;
