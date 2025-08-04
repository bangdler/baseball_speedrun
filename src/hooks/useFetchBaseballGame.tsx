import { useQuery } from "@tanstack/react-query";
import BaseballGameApi from "../api/baseballGame";

const useFetchBaseballGame = (id: number) => {
  return useQuery({
    queryKey: ["useFetchBaseballGame"],
    queryFn: async () => BaseballGameApi.getGameById(id),
  });
};

export default useFetchBaseballGame;
