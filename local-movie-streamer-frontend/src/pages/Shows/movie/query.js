// To fetch movie details from the backend
export const fetchMovieDetails = async (movie_id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NmMyYWJiNDNhMDFmM2MxZDNmMDNkZGUwZmFlNiIsInN1YiI6IjY1NjU0MDIwNmMwYjM2MDBlNGRiNWFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vjxdqC4ct2kpfOnS1WtzNaJ7-_As6PluQKWAF5dCcUI",
      },
    }
  );
  return res.json();
};

// provide the movie id to fetch the movie details
export const fetchRecommendations = async (movie_id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?language=en-US&page=1`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NmMyYWJiNDNhMDFmM2MxZDNmMDNkZGUwZmFlNiIsInN1YiI6IjY1NjU0MDIwNmMwYjM2MDBlNGRiNWFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vjxdqC4ct2kpfOnS1WtzNaJ7-_As6PluQKWAF5dCcUI",
      },
    }
  );
  return res.json();
};

//get the trailer for the movie
export const fetchTrailerMovie = async (movie_id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NmMyYWJiNDNhMDFmM2MxZDNmMDNkZGUwZmFlNiIsInN1YiI6IjY1NjU0MDIwNmMwYjM2MDBlNGRiNWFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vjxdqC4ct2kpfOnS1WtzNaJ7-_As6PluQKWAF5dCcUI",
      },
    }
  );
  return res.json();
};
