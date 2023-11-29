export const fetchMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NmMyYWJiNDNhMDFmM2MxZDNmMDNkZGUwZmFlNiIsInN1YiI6IjY1NjU0MDIwNmMwYjM2MDBlNGRiNWFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vjxdqC4ct2kpfOnS1WtzNaJ7-_As6PluQKWAF5dCcUI",
      },
    }
  );
  //   console.log(res.json());
  return res.json();
};

export const fetchTvShows = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NmMyYWJiNDNhMDFmM2MxZDNmMDNkZGUwZmFlNiIsInN1YiI6IjY1NjU0MDIwNmMwYjM2MDBlNGRiNWFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vjxdqC4ct2kpfOnS1WtzNaJ7-_As6PluQKWAF5dCcUI",
      },
    }
  );
  //   console.log(res.json());
  return res.json();
};
