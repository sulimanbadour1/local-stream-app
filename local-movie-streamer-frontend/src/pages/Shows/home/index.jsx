import { useState } from "react";
import ColumnDisplay from "../../../components/ColumnDisplay";
import { fetchMovies, fetchTvShows } from "./query";
import { useQuery } from "@tanstack/react-query";
const HomeShows = () => {
  const [tab, setTab] = useState("movies");

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
  const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTvShows,
  });
  return (
    <div className="mt-14 h-auto mx-auto flex justify-center flex-col">
      <div className="flex flex-col justify-center items-center">
        <ul className="flex flex-wrap text-lg font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <a
              href="#"
              className={`inline-block px-6 py-3 text-white rounded-lg  
            ${tab === "movies" ? "bg-slate-950" : "bg-slate-400"}
           `}
              aria-current="page"
              onClick={() => setTab("movies")}
            >
              Movies
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => setTab("series")}
              className={`inline-block px-6 py-3 text-white rounded-lg
            ${tab === "series" ? "bg-slate-950 " : "bg-slate-400"}
           `}
            >
              Series
            </a>
          </li>
        </ul>
      </div>
      {isLoadingMovies || isLoadingTvShows ? (
        <div className="flex justify-center mt-12 flex-col content-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          <h1 className="mt-12 text-xl">Loading...</h1>
        </div>
      ) : (
        <div className="mt-10 h-auto mx-auto flex justify-center">
          {tab === "movies" ? (
            <ColumnDisplay data={movieData.results} tab={tab} />
          ) : (
            <ColumnDisplay data={tvShowData.results} tab={tab} />
          )}
        </div>
      )}
    </div>
  );
};

export default HomeShows;
