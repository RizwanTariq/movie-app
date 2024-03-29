<template>
  <div class="home">
    <div class="container search">
      <input
        type="text"
        v-model="searchText"
        @keyup.prevent="handleSearch"
        placeholder="Search movies..."
      />
      <button v-show="searchText" @click.prevent="handleClear" class="button">
        Clear Search
      </button>
    </div>
    <div v-if="isLoading" class="container">
      <Loading />
    </div>
    <div v-else-if="!isLoading" class="container movies">
      <div class="movies-grid" id="movie-grid">
        <div class="movie" v-for="(movie, index) in movies" :key="index">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25)
              }}<span v-show="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString("en-us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </p>
            <nuxt-link
              class="button button-light"
              :to="{ name: 'movies-id', params: { id: movie.id } }"
              >More About This Movie</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import { getMovies, getSearchedMovies } from "../services/moviesService";
export default {
  components: { Loading },
  name: "IndexPage",
  data() {
    return {
      movies: [],
      searchText: "",
      isLoading: false,
    };
  },
  async fetch() {
    this.isLoading = true;
    this.movies = await getMovies();
    this.isLoading = false;
  },
  methods: {
    async handleSearch() {
      this.isLoading = true;
      if (this.searchText) {
        const movies = await getSearchedMovies(this.searchText);
        this.movies = movies;
        this.isLoading = false;
      } else {
        this.$fetch();
        this.isLoading = false;
      }
    },
    async handleClear() {
      this.isLoading = true;
      if (this.searchText) {
        this.searchText = "";
        this.$fetch();
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .search {
    display: flex;
    padding: 32px 16px;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        .movie-img {
          position: relative;
          overflow: hidden;
          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }
        .info {
          margin-top: auto;
          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }
          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
