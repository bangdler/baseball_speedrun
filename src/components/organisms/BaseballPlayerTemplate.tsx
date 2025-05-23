import styled from "@emotion/styled";
import BaseballPlayer from "../../domain/BaseballPlayer";
import { FormEventHandler, useState } from "react";
import RenderUtils from "../../domain/RenderUtils";

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
  playerIndex: number;
  curPlayerIndex: number;
  player: BaseballPlayer;
  onSubmit: (input: string) => void;
  isEnd: boolean;
}

const BaseballPlayerTemplate = ({
  player,
  playerIndex,
  curPlayerIndex,
  onSubmit,
  isEnd,
}: Props) => {
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
  const myTurn = playerIndex === curPlayerIndex;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const input = data.get("input") as string;
    try {
      onSubmit(input);
      setErrorMsg(undefined);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrorMsg(e.message);
      }
    }

    e.currentTarget.reset();
  };

  function RenderResult() {
    if (player.history.length === 0) {
      return null;
    }

    return player.isWinner ? ": 정답!" : ": 오답..";
  }

  return (
    <Container>
      <span>{myTurn ? "당신 차례!" : "상대턴입니다."}</span>
      <form onSubmit={handleSubmit}>
        <input type="text" name={"input"} disabled={!myTurn || isEnd} />
        <button>확인</button>
      </form>
      <span>{errorMsg}</span>
      <SubTitle>📄 결과 {RenderResult()} </SubTitle>
      <ul>
        {player.history.map((h) => {
          return <li key={h.id}>{RenderUtils.renderHistoryToString(h)}</li>;
        })}
      </ul>
    </Container>
  );
};

export default BaseballPlayerTemplate;
