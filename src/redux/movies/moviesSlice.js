import { createSlice } from "@reduxjs/toolkit";

const initialMoviesState = {
  listLoading: false,
  movies:[],
  layouts:[],
  booked:[],
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
    setBooked: (state, action) => {
      state.booked = action.payload.booked;
    },

    updateLayout: (state, action) => {
      if (
        state.layouts.filter(
          ((single) => single.id == action.payload.id)
        ).length >0
      ) {
        state.layouts = state.layouts.map((layout) => {
          if (action.payload.id == layout.id) return action.payload;
          return layout;
        });
      } else {
        state.layouts = [...state.layouts, action.payload];
      }
    },

    updateBooked: (state, action) => {
      if (
        state.booked.filter(
          ((single) => single.id == action.payload.id)
        ).length > 0
      ) {
        state.booked = state.booked.map((single) => {
          if (action.payload.id == single.id)
            return {
              id: single.id,
              booked: [...single.booked, ...action.payload.booked],
            };
          return single;
        });
      } else {
        state.booked = [
          ...state.booked,
          { id: action.payload.id, booked: action.payload.booked },
        ];
      }
    },
  },
});

export const {
  moviesFetched,
  catchError,
  startCall,
  setLayout,
  updateLayout,
  updateBooked,
  setBooked
} = moviesSlice.actions;
