import { useState } from "react";
import ColumnDisplay from "../../../components/ColumnDisplay";
import {
  fetchMovies,
  fetchNowPlayingMovies,
  fetchNowPlayingTvShows,
  fetchPopularMovies,
  fetchPopularTvShows,
  fetchTopRatedMovies,
  fetchTopRatedTvShows,
  fetchTvShows,
  fetchUpComingMovies,
  fetchUpComingTvShows,
} from "./query";
import { useQuery } from "@tanstack/react-query";
// types of movies
const cats = [
  { type: "trending", name: "Trending" },
  { type: "top_rated", name: "Top Rated" },
  { type: "popular", name: "Popular" },
  { type: "upcoming", name: "Upcoming" },
  { type: "now_playing", name: "Now Playing" },
];

const HomeShows = () => {
  const [tab, setTab] = useState("movies");
  const [type, setType] = useState("trending");

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTvShows,
  });
  // Now Playing Movies
  const { data: NowPlayingMovies, isLoading: isLoadingNowPlayingMovies } =
    useQuery({
      queryKey: ["NowPlayingMovies"],
      queryFn: fetchNowPlayingMovies,
    });
  // Now Playing TvShows
  const { data: NowPlayingTv, isLoading: isLoadingNowPlayingTv } = useQuery({
    queryKey: ["NowPlayingTv"],
    queryFn: fetchNowPlayingTvShows,
  });

  // Top Rated Movies
  const { data: TopRatedMovies, isLoading: isTopRatedMovies } = useQuery({
    queryKey: ["TopRatedMovies"],
    queryFn: fetchTopRatedMovies,
  });
  // Top Rated TvShows
  const { data: TopRatedTvShows, isLoading: isTopRatedTvShows } = useQuery({
    queryKey: ["TopRatedTvShows"],
    queryFn: fetchTopRatedTvShows,
  });
  // popular movies
  const { data: PopularMovies, isLoading: isPopularMovies } = useQuery({
    queryKey: ["PopularMovies"],
    queryFn: fetchPopularMovies,
  });
  //  popular tvshows
  const { data: PopularTvShows, isLoading: isPopularTvShows } = useQuery({
    queryKey: ["PopularTvShows"],
    queryFn: fetchPopularTvShows,
  });

  //Upcoming Movies
  const { data: UpComingMovies, isLoading: isUpComingMovies } = useQuery({
    queryKey: ["UpComingMovies"],
    queryFn: fetchUpComingMovies,
  });
  //Upcoming Series
  const { data: UpComingTvShows, isLoading: isUpComingTvShows } = useQuery({
    queryKey: ["UpComingTvShows"],
    queryFn: fetchUpComingTvShows,
  });
  return (
    <div className="mt-14 h-auto mx-auto flex  pb-36 flex-col justify-center items-center text-center">
      <div className="justify-center flex content-center">
        <div
          className="text-xl font-bold pb-8 capitalize
            animate-text-gradient bg-gradient-to-r from-[#853232] via-[#5785c9] to-[#e90e0a] 
            bg-[200%_auto] bg-clip-text text-transparent"
        >
          {type} {tab}
        </div>
      </div>
      <div className="flex-col justify-center items-center text-center">
        <div className="flex gap-3 flex-wrap justify-center items-center">
          {/* // Treding poplar etc */}
          {cats.map((item) => (
            <ul
              className="flex flex-row text-base font-medium "
              key={item.name}
            >
              <li>
                <div
                  className={`px-6 py-3 text-white rounded-lg  cursor-pointer 
            ${type === item.type ? "bg-slate-950" : "bg-slate-400"}
           `}
                  aria-current="page"
                  onClick={() => setType(`${item.type}`)}
                >
                  {item.name}
                </div>
              </li>
            </ul>
          ))}
        </div>

        <div className="flex justify-center ">
          <ul
            className="flex flex-wrap text-base font-medium text-center
           text-gray-500 dark:text-gray-400 mt-8"
          >
            <li className="me-2">
              <a
                href="#"
                className={`px-4 py-2 text-white rounded-lg  
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
                className={`px-4 py-2 text-white rounded-lg
            ${tab === "series" ? "bg-slate-950 " : "bg-slate-400"}
           `}
              >
                Series
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* /*Treding Movies */}
      {type === "trending" && (
        <div>
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
      )}
      {/* Now Playing Movies */}
      {type === "now_playing" && (
        <div>
          {isLoadingNowPlayingMovies || isLoadingNowPlayingTv ? (
            <div className="flex justify-center mt-12 flex-col content-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              <h1 className="mt-12 text-xl">Loading...</h1>
            </div>
          ) : (
            <div className="mt-10 h-auto mx-auto flex justify-center">
              {tab === "movies" ? (
                <ColumnDisplay data={NowPlayingMovies.results} tab={tab} />
              ) : (
                <ColumnDisplay data={NowPlayingTv.results} tab={tab} />
              )}
            </div>
          )}
        </div>
      )}
      {/* Top Rated Movies */}
      {type === "top_rated" && (
        <div>
          {isTopRatedMovies || isTopRatedTvShows ? (
            <div className="flex justify-center mt-12 flex-col content-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              <h1 className="mt-12 text-xl">Loading...</h1>
            </div>
          ) : (
            <div className="mt-10 h-auto mx-auto flex justify-center">
              {tab === "movies" ? (
                <ColumnDisplay data={TopRatedMovies.results} tab={tab} />
              ) : (
                <ColumnDisplay data={TopRatedTvShows.results} tab={tab} />
              )}
            </div>
          )}
        </div>
      )}
      {/* Popular Movies */}
      {type === "popular" && (
        <div>
          {isPopularMovies || isPopularTvShows ? (
            <div className="flex justify-center mt-12 flex-col content-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              <h1 className="mt-12 text-xl">Loading...</h1>
            </div>
          ) : (
            <div className="mt-10 h-auto mx-auto flex justify-center">
              {tab === "movies" ? (
                <ColumnDisplay data={PopularMovies.results} tab={tab} />
              ) : (
                <ColumnDisplay data={PopularTvShows.results} tab={tab} />
              )}
            </div>
          )}
        </div>
      )}
      {/* Popular Movies */}
      {type === "upcoming" && (
        <div>
          {isUpComingMovies || isUpComingTvShows ? (
            <div className="flex justify-center mt-12 flex-col content-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              <h1 className="mt-12 text-xl">Loading...</h1>
            </div>
          ) : (
            <div className="mt-10 h-auto mx-auto flex justify-center">
              {tab === "movies" ? (
                <ColumnDisplay data={UpComingMovies.results} tab={tab} />
              ) : (
                <ColumnDisplay data={UpComingTvShows.results} tab={tab} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeShows;
