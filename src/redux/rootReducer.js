import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { moviesSlice } from "./movies/moviesSlice";
const persistConfig = {
  key: "root",
  storage,
//   blacklist: [],
  // whitelist: ['auth']
};

const rootReducer = combineReducers({
  movies: moviesSlice.reducer,
});

export default persistReducer(persistConfig, rootReducer);