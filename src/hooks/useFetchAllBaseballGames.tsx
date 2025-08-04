import { useQuery } from "@tanstack/react-query";
import BaseballGameApi from "../api/baseballGame";

const useFetchAllBaseballGames = () => {
  return useQuery({
    queryKey: ["useFetchAllBaseballGames"],
    queryFn: BaseballGameApi.getAllGames,
  });
};

export default useFetchAllBaseballGames;
