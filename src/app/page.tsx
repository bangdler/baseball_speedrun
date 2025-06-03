import React from "react";
import BaseballGameApi from "../api/baseballGame";
import MainPage from "../components/pages/MainPage";

interface Props {}

const Page = async ({}: Props) => {
  const games = await BaseballGameApi.getAllGames();

  return <MainPage games={games} />;
};

export default Page;
