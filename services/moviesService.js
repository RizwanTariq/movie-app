const API_KEY = process.env.NUXT_APP_API_KEY;
export const getMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=9f52b5a0a26a92bc2bea69635022f1a9&language=en-US&page=1`
  );
  const { results } = await res.json();
  return results;
};

export const getMovie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=9f52b5a0a26a92bc2bea69635022f1a9&language=en-US&page=1`
  );
  const { results } = await res.json();
  return results;
};
export const getSearchedMovies = async (term) => {
  const res = await fetch(
    `
    https://api.themoviedb.org/3/search/movie?api_key=9f52b5a0a26a92bc2bea69635022f1a9&language=en-US&query=${term}&page=1&include_adult=false`
  );
  const { results } = await res.json();
  return results;
};
