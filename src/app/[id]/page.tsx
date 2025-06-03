import React from "react";
import BaseballPage from "../../components/pages/BaseballPage";

interface Props {
  params: { id: string };
}

const Page = ({ params }: Props) => {
  console.log(params);
  return <BaseballPage />;
};

export default Page;
