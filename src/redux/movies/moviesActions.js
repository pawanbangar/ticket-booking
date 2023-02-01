import moviesActionTypes from "./moviesTypes";
import {updateLayout} from "./moviesSlice";
export const fetchMovies = () => (dispatch) => {
  dispatch({
    type: moviesActionTypes.FETCH_MOVIES,
  });
};

export const updateLayoutStart = (payload) => (dispatch)=>{
  dispatch(updateLayout({...payload}));
}