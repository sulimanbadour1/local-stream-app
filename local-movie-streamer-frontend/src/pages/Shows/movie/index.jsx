import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetails, fetchRecommendations } from "./query";
import styles from "../../../components/MovieCard/movie.module.css";
import { useState } from "react";
const Movie = () => {
  const [tab, setTab] = useState("movies");
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });
  const { data: ReccomdMovies, isLoading: isReccomdMovies } = useQuery({
    queryKey: ["reccomendations"],
    queryFn: () => fetchRecommendations(id),
  });
  console.log(ReccomdMovies);

  if (!id) {
    return <div>404</div>;
  }
  if (isLoading) {
    return (
      <div className="flex justify-center mt-12 flex-col content-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <h1 className="mt-12 text-xl">Loading...</h1>
      </div>
    );
  }

  // let bg = `https://image.tmdb.org/t/p/original/${data.backdrop_path}`;
  return (
    <div className=" items-center justify-center content-center">
      <div className="pr-12 pl-12 mt-12 flex mx-auto justify-center mb-12 ">
        <div
          className={`p-8 flex gap-10 border rounded-lg flex-col md:flex-row`}
        >
          <div className="flex p-8 object-cover">
            <img
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              className="rounded-lg shadow-lg w-96 h-fit"
            />
          </div>
          <div className="flex px-4 flex-col flex-1 mx-auto">
            <div className="text-xl md:text-5xl pt-12 pb-4 font-bold">
              {data.title}
            </div>
            <div className="py-2 flex items-center gap-4">
              {data.genres.map((item) => (
                <span
                  className="text-xs px-1 py-1 font-normal rounded-lg bg-slate-400 text-white"
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
              {data.release_date}
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
              <span className="font-bold"> Duration </span>
              {data.runtime} {data.runtime > 1 ? "mins" : "min"}
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
                  Visit the {data.title} movie&apos;s official site, or watch it
                  on the streaming platform.
                </a>
              </span>
            </div>
            <div className="md:text-base  py-2 font-medium text-sm ">
              <span className="font-bold">Tag Line: </span>
              {data.tagline}
            </div>
            <div className="md:text-base  py-2 font-medium text-sm ">
              {data.video ? (
                <span className="font-bold">Video: </span>
              ) : (
                <span className="font-bold">No Video</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* The recommended movies are: */}
      {ReccomdMovies && (
        <div className="mb-24">
          <div
            className="text-3xl font-bold pb-8 capitalize
            animate-text-gradient bg-gradient-to-r from-[#853232] via-[#5785c9] to-[#e90e0a] 
            bg-[200%_auto] bg-clip-text text-transparent text-center"
          >
            You might also like
          </div>
          <div className={styles.wrapper}>
            {ReccomdMovies.results.map((item) => (
              <Link to={`/movie/${item.id}`} key={item.id} reloadDocument>
                <div className={styles.card}>
                  <div className={styles.poster}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                      alt="Poster"
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.details}>
                    <h1>{tab === "movies" ? item.title : item.name}</h1>
                    <h2>
                      {tab === "movies"
                        ? item.release_date
                        : item.first_air_date}{" "}
                      • {item.original_language} • {item.media_type}
                    </h2>

                    <div className={styles.rating}>
                      <span> {item.vote_average.toString().slice(0, 3)}🌟</span>
                    </div>

                    <p className={styles.desc}>{item.overview.slice(0, 300)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
