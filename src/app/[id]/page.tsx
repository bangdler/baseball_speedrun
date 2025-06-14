import React from "react";
import BaseballPage from "../../components/pages/BaseballPage";
import BaseballGame from "../../domain/BaseballGame";
import BaseballGameApi from "../../api/baseballGame";
import BaseballNumber from "../../domain/BaseballNumber";
import BaseballPlayer from "../../domain/BaseballPlayer";

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const idNum = Number(params.id);

  if (!Number.isInteger(idNum) || idNum <= 0) {
    console.warn("잘못된 id:", params.id);
    return <div>잘못된 접근입니다.</div>;
  }

  const data = await BaseballGameApi.getGameById(idNum);


  return <BaseballPage data={data} />;
};

export default Page;
