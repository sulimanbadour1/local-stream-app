/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import styles from "../../../components/MovieCard/movie.module.css";
import { useState } from "react";
import {
  fetchRecommendationsforTV,
  fetchTrailerTv,
  fetchTvDetails,
} from "./query";
const TvShow = () => {
  // force reload the page if the id is changed
  // eslint-disable-next-line no-unused-vars
  const [tab, setTab] = useState("series");
  const { id } = useParams();
  const {
    data,
    isLoading: isLoadingTvDetails,
    status: statusTvDetails,
  } = useQuery({
    queryKey: ["tvshow"],
    queryFn: () => fetchTvDetails(id),
  });
  const {
    data: ReccomdTv,
    isLoading: isReccomdTv,
    status: statusReccomdTv,
  } = useQuery({
    queryKey: ["reccomendationsforTv"],
    queryFn: () => fetchRecommendationsforTV(id),
  });
  const { data: Videos, status: statusVideos } = useQuery({
    queryKey: ["youtube"],
    queryFn: () => fetchTrailerTv(id),
  });
  const { data: ImagesTv, status: ImagesStatus } = useQuery({
    queryKey: ["ImagesTv"],
    queryFn: () => fetchTvDetails(id),
  });

  if (!id) {
    return <div>404</div>;
  }
  // reload the page if the id is changed
  const isDataLoaded = [
    statusTvDetails,
    statusReccomdTv,
    statusVideos,
    ImagesStatus,
  ].every((status) => status === "success");

  if (!isDataLoaded) {
    return (
      <div className="flex justify-center mt-12 flex-col content-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <h1 className="mt-12 text-xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className=" items-center justify-center content-center">
        <div
          className="px-4 md:px-28 mt-12 flex mx-auto justify-center mb-12
        bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${ImagesTv.backdrop_path})`,
          }}
        >
          <div
            className={`p-8 flex gap-10 border border-gray-600/10 rounded-lg 
            shadow-lg flex-col md:flex-row  backdrop-blur-xl bg-white/30 m-8`}
          >
            <div className="flex p-8 object-cover">
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  className="rounded-lg shadow-lg w-96 h-fit z-10 object-cover"
                />
                <div>
                  {Videos.results.length == 0 ? (
                    <></>
                  ) : (
                    <>
                      {Videos.results.map((item) => (
                        <a
                          href={`https://www.youtube.com/watch?v=${item.key}`}
                          target="_blank"
                          rel="noreferrer"
                          key={item.id}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12 absolute top-1/2 left-1/2 text-white rounded-full  p-2
                    transform -translate-x-1/2 -translate-y-1/2 hover:bg-slate-900 transition duration-500 ease-in-out cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            />
                          </svg>
                        </a>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex px-4 flex-col flex-1 mx-auto">
              <div className="text-xl md:text-5xl pt-12 pb-4 font-bold">
                {data.name}
              </div>
              <div className="py-2 flex items-center gap-1">
                {data.genres.map((item) => (
                  <span
                    className="text-xs px-1.5 py-1.5 font-normal rounded-lg bg-slate-700 text-white"
                    key={item.id}
                  >
                    {item.name}
                  </span>
                ))}
              </div>

              <div className=" text-sm md:text-lg  py-4 mb-6 md:font-semibold">
                {data.overview}
              </div>
              <div className="md:text-base  py-2 font-medium text-sm ">
                <span className="font-bold">Release Date: </span>
                {data.first_air_date}
              </div>
              <div className="md:text-base  py-2 font-medium text-sm ">
                <span className="font-bold">Last Air date: </span>
                {data.last_air_date}
              </div>

              <div className="md:text-base  py-2 font-medium text-sm ">
                <span className="font-bold">Original Language: </span>
                {data.original_language}
              </div>
              <div className="md:text-base  py-2 font-medium text-sm ">
                <span className="font-bold py-2">Status: </span>
                {data.status}
              </div>
              <div className="md:text-base  py-2 font-medium text-sm ">
                <span className="font-bold ">Rating: </span>
                {data.vote_average.toString().slice(0, 3)}🌟
              </div>

              <div className="md:text-base  py-2 font-medium text-sm ">
                <span className="font-bold"> Seasons: </span>
                {data.number_of_seasons}
              </div>
              <div className="md:text-base  py-2 font-medium text-sm ">
                <span className="font-bold"> Episodes: </span>
                {data.number_of_episodes}
              </div>
              <div className="md:text-base  py-2 font-medium text-sm ">
                <span className="font-bold">
                  Home page:{" "}
                  <a
                    className="underline"
                    href={data.homepage}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit the {data.title} movie&apos;s official site, or watch
                    it on the streaming platform.
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The recommended movies are: */}
        {isReccomdTv === 0 ? (
          <> </>
        ) : (
          <>
            {ReccomdTv && (
              <div className="mb-24">
                {ReccomdTv.results.length == 0 ? (
                  <div
                    className="text-3xl font-bold pb-8 capitalize
        animate-text-gradient bg-gradient-to-r from-[#853232] via-[#5785c9] to-[#e90e0a] 
        bg-[200%_auto] bg-clip-text text-transparent text-center"
                  ></div>
                ) : (
                  <div
                    className="text-3xl font-bold pb-8 capitalize
      animate-text-gradient bg-gradient-to-r from-[#853232] via-[#5785c9] to-[#e90e0a] 
      bg-[200%_auto] bg-clip-text text-transparent text-center"
                  >
                    You might also like
                  </div>
                )}

                <div className={styles.wrapper}>
                  {ReccomdTv.results.map((item) => (
                    <Link
                      to={`/tvshow/${item.id}`}
                      key={item.id}
                      reloadDocument
                    >
                      <div className={styles.card}>
                        <div className={styles.poster}>
                          <img
                            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                            alt={item.name}
                            loading="lazy"
                          />
                        </div>
                        <div className={styles.details}>
                          <h1>{tab === "series" ? item.name : item.name}</h1>
                          <h2 className="uppercase">
                            {tab === "series"
                              ? item.first_air_date
                              : item.first_air_date}{" "}
                            • {item.original_language} • {item.media_type}
                          </h2>

                          <div className={styles.rating}>
                            <span>
                              {" "}
                              {item.vote_average.toString().slice(0, 3)}🌟
                            </span>
                          </div>

                          <p className={styles.desc}>
                            {item.overview.slice(0, 200)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default TvShow;
