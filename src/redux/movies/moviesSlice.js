import { createSlice } from "@reduxjs/toolkit";

const initialMoviesState = {
  listLoading: false,
  movies:[],
  layouts:[],
  blockedSeats:[],
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
    startCall: (state, action) => {
      // To activate loading screen
      state.error = null;
      state.listLoading = true;
    },

    // movies
    moviesFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.movies = action.payload.movies;
    },

    setLayout: (state, action) => {
      state.layouts = action.payload.layouts;
    },

    updateLayout: (state, action) => {
      state.layouts = state.layouts.map((layout) => {
        if (action.payload.id == layout.id) return action.payload;
        return layout;
      });
    },

    setBlockedSeats: (state, action) => {
      state.blockedSeats = action.payload.blockedSeats;
    },

    updateBlockedSeat: (state,action) => {
      state.blockedSeats = state.blockedSeats.map((seat) => {
        if (action.payload.id == seat.id) return {id:seat.id,blockedIds:action.payload.blockedIds};
        return seat;
      });
    }
  },
});

export const {
  moviesFetched,
  catchError,
  startCall,
  setLayout,
  updateLayout,
  setBlockedSeats
} = moviesSlice.actions;
