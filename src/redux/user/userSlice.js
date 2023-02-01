import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  listLoading: false,
  actionsLoading: false,
  entities: [],
  currentPage: 1,
  perPage: 10,
  total: 0,
  error: null,
  isCreateCompleted: false,
  isUpdateCompleted: false,
  isDeleteCompleted: false,
};

export const ActionTypes = {
  list: "list",
  action: "action",
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialUserState,
  reducers: {
    catchError: (state, action) => {
      state.error = action.payload.error;
      if (action.payload.callType === ActionTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === ActionTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    // user By Filters
    userFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.actionsLoading = false;
      state.entities = action.payload.users;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.perPage = action.payload.perPage;
    },

    // createuser
    userCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.user];
      state.isCreateCompleted = true;
    },
    // updateProduct
    userUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.isUpdateCompleted = true;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.user.id) {
          return action.payload.user;
        }
        return entity;
      });
    },

    // deleteUser
    userDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.isDeleteCompleted = true;
      state.entities = state.entities.filter(
        (entity) => entity.id !== action.payload.id
      );
    },

    // reset Delete
    userActionsReset: (state, action) => {
      state.isCreateCompleted = false;
      state.isDeleteCompleted = false;
      state.isUpdateCompleted = false;
    },

    // remove Error
    userErrorRemove: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  userFetched,
  userCreated,
  userUpdated,
  userDeleted,
  userActionsReset,
  catchError,
  startCall,
  userErrorRemove,
} = userSlice.actions;
