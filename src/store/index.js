import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { API_KEY, TMDB_BASE_URL } from "../utils/tmdbauth";
  
  const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
  };
  
  export const getGenres = createAsyncThunk("karsanth/genres", async () => {
    const {
      data: { genres },
    } = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return genres;
  });
  //const search_key= encodeURI((String)(document.getElementById("search_input").value));
  
  export const searchMovies = createAsyncThunk(
    "karsanth/search",
    async ({ type }, thunkAPI) => {
     const search_key = encodeURI(type);
      const {
        karsanth: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${search_key}&page=1&include_adult=false`,
        genres,
        true
      );
    }
  );

  const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };
  
  const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
  };

 export const getSearchData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
  };
  
  
  export const getDataByGenre = createAsyncThunk(
    "karsanth/moviesByGenres",
    async ({genre, type }, thunkAPI) => {
      const {
        karsanth: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres
      );
    }
  );

  export const getMovies = createAsyncThunk(
    "karsanth/trending",
    async ({ type }, thunkAPI) => {
      const {
        karsanth: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres
      );
    }
  );
  
  export const getUsersLikedMovies = createAsyncThunk(
    "karsanth/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "karsanth/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );
  
  const KarsanthSlice = createSlice({
    name: "Karsanth",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      });
      builder.addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(getDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    },
  });
  
  export const store = configureStore({
    reducer: {
      karsanth: KarsanthSlice.reducer,
    },
  });
  
  export const { setGenres, setMovies } = KarsanthSlice.actions;