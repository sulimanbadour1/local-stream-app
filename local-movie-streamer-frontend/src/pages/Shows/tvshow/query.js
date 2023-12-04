const fetchData = async (url) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NmMyYWJiNDNhMDFmM2MxZDNmMDNkZGUwZmFlNiIsInN1YiI6IjY1NjU0MDIwNmMwYjM2MDBlNGRiNWFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vjxdqC4ct2kpfOnS1WtzNaJ7-_As6PluQKWAF5dCcUI`,
    },
  });
  return res.json();
};

export const fetchTvDetails = async (series_id) => {
  const url = `https://api.themoviedb.org/3/tv/${series_id}?language=en-US`;
  return fetchData(url);
};

export const fetchRecommendationsforTV = async (series_id) => {
  const url = `https://api.themoviedb.org/3/tv/${series_id}/recommendations?language=en-US&page=1`;
  return fetchData(url);
};

export const fetchTrailerTv = async (series_id) => {
  const url = `https://api.themoviedb.org/3/tv/${series_id}/videos?language=en-US`;
  return fetchData(url);
};

export const fetchImages = async (series_id) => {
  const url = `https://api.themoviedb.org/3/tv/${series_id}/images`;
  return fetchData(url);
};
