import { Link } from "react-router-dom";
import styles from "./MovieCard/movie.module.css";
/* eslint-disable react/prop-types */
const ColumnDisplay = ({ tab, data }) => {
  return (
    <div>
      <div>
        <div className={styles.wrapper}>
          {data.map((item) => (
            <Link
              to={`/${tab === "movies" ? "movie" : "tvshow"}/${item.id}`}
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
                  <h1>{tab === "movies" ? item.title : item.name}</h1>
                  <h2 className="uppercase">
                    {tab === "movies" ? item.release_date : item.first_air_date}{" "}
                    • {item.original_language} • {item.media_type}
                  </h2>

                  <div className={styles.rating}>
                    <span> {item.vote_average.toString().slice(0, 3)}🌟</span>
                  </div>
                  {/* <div className={styles.tags}>
                  <span className={styles.tag}>{item.video}</span>
                  <span className={styles.tag}>Drama</span>
                  <span className={styles.tag}>Indie</span>
                </div> */}
                  <p className={styles.desc}>
                    {item.overview.slice(0, 200)}...
                  </p>
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
