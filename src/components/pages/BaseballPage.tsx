"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import useBaseball from "../../hooks/useBaseball";

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

interface Props {}

const BaseballPage = ({}: Props) => {
  const { game, tryGame } = useBaseball();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const input = e.currentTarget.input.value;
      tryGame(input);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <Title>⚾️ 숫자 야구 게임</Title>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>
      <form onSubmit={handleSubmit}>
        <input type="text" name="input" />
        <button type="submit">확인</button>
      </form>
      <SubTitle>📄 결과</SubTitle>
      {game.isEnd && <p>"정답"</p>}
      <div>
        {game.history.map((item) => (
          <div key={item.input}>
            <p>{item.input}</p>
            <p>{item.result.strike}</p>
            <p>{item.result.ball}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default BaseballPage;
