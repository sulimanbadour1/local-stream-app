/* eslint-disable no-undef */
const fetchMovieDetails = async (movie_id) => {
  return makeApiRequest(`/movie/${movie_id}?language=en-US`);
};

const fetchRecommendations = async (movie_id) => {
  return makeApiRequest(
    `/movie/${movie_id}/recommendations?language=en-US&page=1`
  );
};

const fetchTrailerMovie = async (movie_id) => {
  return makeApiRequest(`/movie/${movie_id}/videos?language=en-US`);
};

const fetchImages = async (movie_id) => {
  return makeApiRequest(`/movie/${movie_id}/images`);
};
const makeApiRequest = async (endpoint) => {
  const url = `https://api.themoviedb.org/3${endpoint}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NmMyYWJiNDNhMDFmM2MxZDNmMDNkZGUwZmFlNiIsInN1YiI6IjY1NjU0MDIwNmMwYjM2MDBlNGRiNWFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vjxdqC4ct2kpfOnS1WtzNaJ7-_As6PluQKWAF5dCcUI`,
    },
  });
  return res.json();
};

export {
  fetchMovieDetails,
  fetchImages,
  fetchRecommendations,
  fetchTrailerMovie,
};
