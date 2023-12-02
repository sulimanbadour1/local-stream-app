// Trending Movies
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
  return res.json();
};
// Trending TV Shows
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

  return res.json();
};

// Now Playing Movies
export const fetchNowPlayingMovies = async (page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NmMyYWJiNDNhMDFmM2MxZDNmMDNkZGUwZmFlNiIsInN1YiI6IjY1NjU0MDIwNmMwYjM2MDBlNGRiNWFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vjxdqC4ct2kpfOnS1WtzNaJ7-_As6PluQKWAF5dCcUI",
      },
    }
  );

  return res.json();
};
// Now Playing TvShows
export const fetchNowPlayingTvShows = async (page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page}`,
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

// Top Rated Movies
export const fetchTopRatedMovies = async (page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
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
// Top Rated TvShows
export const fetchTopRatedTvShows = async (page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`,
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

// popular movies
export const fetchPopularMovies = async (page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
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

// popular tvshows
export const fetchPopularTvShows = async (page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
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

//upcoming movies
export const fetchUpComingMovies = async (page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
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
//upcoming tvshows
export const fetchUpComingTvShows = async (page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}`,
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
