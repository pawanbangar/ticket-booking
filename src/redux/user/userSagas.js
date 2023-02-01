import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUsers, createUser, deleteUser, updateUser } from "../services";
import UserActionTypes from "./userTypes";
import { catchError, userFetched, userCreated, userUpdated, userDeleted } from "./userSlice";


function* userWorker(action) {
  try {
    const response = yield call(fetchUsers, action.payload);
    const { data } = response;
    yield put(
      userFetched({
        users: data.data.rows,
        total: data.data.count,
        perPage: data.data.perPage,
        currentPage: data.data.currentPage+1, // We always get -1 from server
      })
    );
  } catch (error) {
    yield put(
      catchError({
        type: "user",
        error: error.message,
      })
    );
  }
}

function* deleteUserWorker(action) {
  try {
    yield call(deleteUser, action.payload);
    yield put(userDeleted({ id: action.payload }));
  } catch (error) {
    yield put(catchError({ type: "delete user", error: error.message }));
  }
}

function* createUserWorker(action) {
  try {
    const response = yield call(createUser, action.payload);
    yield put(userCreated({ user: response.data.user }));
  } catch (error) {
    yield put(
      catchError({ type: "create user", error: error.response.data.message })
    );
  }
}

function* updateUserWorker(action) {
  try {
    const response = yield call(updateUser, action.payload);
    yield put(userUpdated({ user: response.data.user }));
  } catch (error) {
    yield put(catchError({ type: "update user", error: error.message }));
  }
}

function* userSagas() {
  yield takeLatest(UserActionTypes.FETCH_USERS, userWorker); // fetch users page
  yield takeLatest(UserActionTypes.DELETE_USER, deleteUserWorker);
  yield takeLatest(UserActionTypes.CREATE_USER, createUserWorker);
  yield takeLatest(UserActionTypes.UPDATE_USER, updateUserWorker);
}

export default userSagas;
