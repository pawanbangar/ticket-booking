import { createSelector } from "reselect";

export const selectMovies = (state) => state.movies;

export const selectisListLoading= createSelector(
  [selectMovies],
  (movies)=>movies.listLoading
);

export const selectMoviesData = createSelector(
  [selectMovies],
  (movies) => movies.movies
);

export const selectMovieFromId =(id)=> createSelector(
  [selectMoviesData],
  (movies) => movies.filter((single)=>single.id==id)[0]
);


export const selectError = createSelector(
  [selectMovies],
  (movies) => movies.error
);
