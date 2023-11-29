import { Link } from "react-router-dom";
import styles from "./MovieCard/movie.module.css";
/* eslint-disable react/prop-types */
const ColumnDisplay = ({ tab, data }) => {
  console.log(data[1].video);
  return (
    <div>
      <div>
        <div className="justify-center flex content-center py-4">
          <div
            className="text z-10 text-black text-2xl font-medium capitalize 
            animate-text-gradient bg-gradient-to-r from-[#852f2f] via-[#e03c3c] to-[#980a07] 
            bg-[200%_auto] bg-clip-text text-transparent"
          >
            Trending {tab}
          </div>
        </div>
        <div className={styles.wrapper}>
          {data.map((item) => (
            <Link to={"/"} key={item.id}>
              <div className={styles.card}>
                <div className={styles.poster}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    alt="Poster"
                  />
                </div>
                <div className={styles.details}>
                  <h1>{tab === "movies" ? item.title : item.name}</h1>
                  <h2>
                    {tab === "movies" ? item.release_date : item.first_air_date}{" "}
                    • {item.original_language} • {item.media_type}
                  </h2>

                  <div className={styles.rating}>
                    <span> {parseInt(item.vote_average)}🌟</span>
                  </div>
                  {/* <div className={styles.tags}>
                  <span className={styles.tag}>{item.video}</span>
                  <span className={styles.tag}>Drama</span>
                  <span className={styles.tag}>Indie</span>
                </div> */}
                  <p className={styles.desc}>{item.overview.slice(0, 300)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColumnDisplay;
