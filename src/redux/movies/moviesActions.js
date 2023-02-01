import moviesActionTypes from "./moviesTypes";
import {updateBooked, updateLayout} from "./moviesSlice";
export const fetchMovies = () => (dispatch) => {
  dispatch({
    type: moviesActionTypes.FETCH_MOVIES,
  });
};

export const updateLayoutStart = (payload) => (dispatch)=>{
  dispatch(updateLayout({...payload}));
}

export const updateBookedStart = (payload) =>dispatch=>{
  dispatch(updateBooked(payload));
}