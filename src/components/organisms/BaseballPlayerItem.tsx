import styled from "@emotion/styled";
import BaseballPlayer, { History } from "../../domain/BaseballPlayer";
import { FormEventHandler, useState } from "react";
import { BASEBALL_NUMBER_COUNT } from "../../domain/BaseballNumber";

const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Description = styled.p``;
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
    <Container>
      <form onSubmit={handleSubmit}>
        <input type="text" name={"input"} disabled={!isMyTurn || isEnd} />
        <button>확인</button>
      </form>
      <SubTitle>📄 결과 {renderResult()}</SubTitle>
      {errMsg && <span>{errMsg}</span>}
      <ul>
        {player.history.map((h) => (
          <li key={h.id}>{renderHistory(h)}</li>
        ))}
      </ul>
    </Container>
  );
};

export default BaseballPlayerItem;
