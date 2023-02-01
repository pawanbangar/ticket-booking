import { put, takeLatest } from "redux-saga/effects";
import moviesActionTypes from "./moviesTypes";
import { catchError, moviesFetched, setBlockedSeats, setLayout } from "./moviesSlice";
import * as data from "../../data/movies.json";
import { getDefaultBlockedFromMovies, getDefaultLayoutFromMovies } from "./moviesUtil";

function* fetchmoviesWorker(action) {
  try {
    const response = data;
    yield put(
      moviesFetched({
        movies:response.movies
      })
    );
    yield put(
      setLayout({
        layouts:getDefaultLayoutFromMovies(response.movies)
      })
    );
    yield put(
      setBlockedSeats({
        blockedSeats:getDefaultBlockedFromMovies(response.movies)
      })
    );
  } catch (error) {
    yield put(
      catchError({
        error: error.message,
      })
    );
  }
}

function* userSagas() {
  yield takeLatest(moviesActionTypes.FETCH_MOVIES, fetchmoviesWorker); // fetch movies
}

export default userSagas;
