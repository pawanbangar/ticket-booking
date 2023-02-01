import { userErrorRemove, userSlice, userActionsReset } from "./userSlice";
import userActionTypes from "./userTypes";
const { actions } = userSlice;

export const fetchUsers = (params) => (dispatch) => {
  dispatch(actions.startCall({ callType: userActionTypes.list }));
  dispatch({
    type: userActionTypes.FETCH_USERS,
    payload: params,
  });
};
export const deleteUser = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: userActionTypes.action }));
  dispatch({ type: "DELETE_USER", payload: id });
};

export const createUser = (userForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: userActionTypes.action }));
  dispatch({ type: "CREATE_USER", payload: userForCreation });
};

export const updateUser = (userForUpdate) => (dispatch) => {
  dispatch(actions.startCall({ callType: userActionTypes.action }));
  dispatch({ type: "UPDATE_USER", payload: userForUpdate });
};

export const removeError = () => (dispatch) => {
  dispatch(userErrorRemove());
};


export const clearUserActionCompleted = () => (dispatch) => {
  dispatch(userActionsReset());
};
