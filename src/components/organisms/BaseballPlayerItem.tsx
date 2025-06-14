import BaseballPlayer, { History } from "../../domain/BaseballPlayer";
import { FormEventHandler, useState } from "react";
import { BASEBALL_NUMBER_COUNT } from "../../domain/BaseballNumber";

interface Props {
  myIdx: number;
  curPlayerIdx: number;
  player: BaseballPlayer;
  onSubmit: (input: string) => void;
  isEnd: boolean;
}

const BaseballPlayerItem = ({
  myIdx,
  curPlayerIdx,
  player,
  onSubmit,
  isEnd,
}: Props) => {
  const isMyTurn = myIdx === curPlayerIdx;

  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const input = data.get("input") as string;
    console.log(input);
    try {
      onSubmit(input);
      setErrMsg(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrMsg(e.message);
      }
    }

    e.currentTarget.reset();
  };

  const renderResult = () => {
    if (player.history.length === 0) {
      return null;
    }
    return player.isWinner ? "정답" : "오답";
  };

  const renderHistory = (h: History) => {
    if (h.strike === BASEBALL_NUMBER_COUNT) {
      return "정답입니다!";
    }
    if (h.strike === 0 && h.ball === 0) {
      return "나싱...";
    }
    return `${h.strike}S ${h.ball}B`;
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          name="input"
          disabled={!isMyTurn || isEnd}
          placeholder="예: 123"
          className={`border px-3 py-2 rounded w-full max-w-[160px] ${
            !isMyTurn || isEnd
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white"
          }`}
        />
        <button
          type="submit"
          disabled={!isMyTurn || isEnd}
          className={`px-4 py-2 rounded text-white ${
            !isMyTurn || isEnd
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          확인
        </button>
      </form>

      <h3 className="text-sm font-semibold text-gray-700">
        📄 결과: {renderResult()}
      </h3>

      {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}

      <ul className="space-y-1 text-sm text-gray-800">
        {player.history.map((h) => (
          <li key={h.id} className="bg-white rounded px-3 py-1 shadow-sm">
            {renderHistory(h)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaseballPlayerItem;
