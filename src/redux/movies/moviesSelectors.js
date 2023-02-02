import { createSelector } from "reselect";
import { getDefaultLayout } from "../../utils/helpers";

export const selectMovies = (state) => state.movies;

export const selectisListLoading= createSelector(
  [selectMovies],
  (movies)=>movies.listLoading
);

export const selectMoviesData = createSelector(
  [selectMovies],
  (movies) => movies.movies
);

export const selectLayoutData = createSelector(
  [selectMovies],
  (movies) => movies.layouts
);

export const selectBookedData = createSelector(
  [selectMovies],
  (movies) => movies.booked
);


export const selectMovieFromId =(id)=> createSelector(
  [selectMoviesData],
  (movies) => movies.filter((single)=>single.id==id)[0]
);

export const selectBookedTickets =(id)=> createSelector(
  [selectBookedData],
  (booked) => booked.filter((single)=>single.id==id).length>0?booked.filter((single)=>single.id==id)[0]['booked']:[]
);

export const selectLayoutFromId =(id)=> createSelector(
  [selectLayoutData],
  (layouts) => layouts.filter(single=>single.id==id).length>0?layouts.filter(single=>single.id==id)[0]:getDefaultLayout(id)
)

export const selectError = createSelector(
  [selectMovies],
  (movies) => movies.error
);
