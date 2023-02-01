import { createSlice } from "@reduxjs/toolkit";

const initialMoviesState = {
  listLoading: false,
  movies:[],
  error:null
};

export const ActionTypes = {
  list: "list",
  action: "action",
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialMoviesState,
  reducers: {
    catchError: (state, action) => { 
      state.error = action.payload.error;
        state.listLoading = false;
    },
    startCall: (state, action) => {  // To activate loading screen
      state.error = null;
      state.listLoading = true;
    },

    // user By Filters
    moviesFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.movies = action.payload.movies;
    },
   
  },
});

export const {
  moviesFetched,
  catchError,
  startCall,
} = moviesSlice.actions;
