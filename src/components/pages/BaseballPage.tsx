"use client";
import React from "react";
import styled from "@emotion/styled";
import useBaseball from "../../hooks/useBaseball";
import BaseballPlayerTemplate from "../organisms/BaseballPlayerTemplate";

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

const Wrapper = styled.div`
  display: flex;
`;
interface Props {}

const BaseballPage = ({}: Props) => {
  const { game, tryBall, resetGame } = useBaseball();
  console.log(game.answer.numbers);

  return (
    <Container>
      <Title>⚾️ 숫자 야구 게임</Title>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>
      <SubTitle>📄 {game.isEnd ? "게임 종료!" : "진행중.."}</SubTitle>
      <button onClick={resetGame} disabled={!game.isEnd}>
        다시하기
      </button>
      <Wrapper>
        {game.players.map((p, idx) => {
          return (
            <BaseballPlayerTemplate
              key={p.id}
              playerIndex={idx}
              curPlayerIndex={game.curPlayerIdx}
              player={game.players[idx]}
              onSubmit={tryBall}
              isEnd={game.isEnd}
            />
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default BaseballPage;
