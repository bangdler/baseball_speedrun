"use client";
import React from "react";
import styled from "@emotion/styled";
import useBaseball from "../../hooks/useBaseball";
import BaseballPlayerItem from "../organisms/BaseballPlayerItem";

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

const PlayerWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

interface Props {}

const BaseballPage = ({}: Props) => {
  const { game, addPlayer, removePlayer, reset, tryBall } = useBaseball();
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
  return (
    <Container>
      <Title>⚾️ 숫자 야구 게임</Title>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>
      <button onClick={addPlayer}>사용자 추가</button>
      <button disabled={game.status === "END"} onClick={reset}>
        다시하기
      </button>
      <SubTitle>{renderStatus()}</SubTitle>

      <PlayerWrapper>
        {game.players.map((player, idx) => (
          <div key={player.id}>
            <button onClick={() => removePlayer(player.id)}>사용자 삭제</button>
            <BaseballPlayerItem
              myIdx={idx}
              curPlayerIdx={game.curPlayerIdx}
              player={player}
              onSubmit={tryBall}
              isEnd={game.status === "END"}
            />
          </div>
        ))}
      </PlayerWrapper>
    </Container>
  );
};

export default BaseballPage;
