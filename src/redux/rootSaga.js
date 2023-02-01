import { all, call } from "redux-saga/effects";
import moviesSagas from "./movies/moviesSagas";


function* rootSaga() {
  yield all([
    call(moviesSagas),
    // Add more sagas here
  ]);
}

export default rootSaga;