"use client";
import React, { FormEventHandler } from "react";
import styled from "@emotion/styled";
import useBaseball from "../../hooks/useBaseball";
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

interface Props {}

const BaseballPage = ({}: Props) => {
  const { isEnd, history, tryBall, errorMsg, reset } = useBaseball();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const input = data.get("input") as string;
    tryBall(input);
    e.currentTarget.reset();
  };

  function renderResult() {
    if (history.length === 0) return null;
    return <span>{isEnd ? "정답" : "오답"}</span>;
  }

  return (
    <Container>
      <Title>⚾️ 숫자 야구 게임</Title>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>
      <form onSubmit={handleSubmit}>
        <input type="text" name="input" />
        <button>확인</button>
      </form>
      {errorMsg ?? <span>{errorMsg}</span>}
      <SubTitle>📄 결과 {renderResult()}</SubTitle>
      <button disabled={!isEnd} onClick={reset}>
        다시 하기
      </button>
      <ul>
        {history.map((h) => (
          <li key={h.id}>{RenderUtils.renderToString(h)}</li>
        ))}
      </ul>
    </Container>
  );
};

export default BaseballPage;
