import moviesActionTypes from "./moviesTypes";

export const fetchMovies = () => (dispatch) => {
  dispatch({
    type: moviesActionTypes.FETCH_MOVIES,
  });
};
