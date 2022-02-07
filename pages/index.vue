<template>
  <div class="home"></div>
</template>

<script>
import { getMovies } from "../services/moviesService";
export default {
  name: "IndexPage",
  data() {
    return {
      movies: [],
    };
  },
  async fetch() {
    this.movies = await getMovies();
    console.log(this.movies);
  },
};
</script>
