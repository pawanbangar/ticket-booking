import { put, takeLatest } from "redux-saga/effects";
import moviesActionTypes from "./moviesTypes";
import { catchError, moviesFetched } from "./moviesSlice";
import * as data from "../../data/movies.json";

function* fetchmoviesWorker(action) {
  try {
    const response = data;
    yield put(
      moviesFetched({
        movies:response.movies
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
