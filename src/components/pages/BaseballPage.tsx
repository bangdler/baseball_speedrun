"use client";
import React from "react";
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
  const { game, tryGame, isEnd, history, isError, errorMessage } =
    useBaseball();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("input");
    const input = typeof value === "string" ? value : "";

    tryGame(input);
  };

  return (
    <Container>
      <Title>⚾️ 숫자 야구 게임</Title>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>

      <form onSubmit={handleSubmit}>
        <input type="text" name={"input"} />
        <button type={"submit"}>확인</button>
      </form>
      <SubTitle>
        📄 결과 :{" "}
        {isEnd ? "정답입니다!" : history.length !== 0 ? "오답입니다." : ""}
      </SubTitle>

      {isError && <p>{errorMessage}</p>}
      <ul>
        {history.map((h) => {
          return (
            <li key={h.id}>
              {h.input} : {h.strike}S {h.ball}B
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default BaseballPage;
