import { createSelector } from "reselect";

export const selectUsers = (state) => state.users;

export const selectIsActionLoading= createSelector(
  [selectUsers],
  (users)=>users.actionsLoading
);

export const selectUsersData = createSelector(
  [selectUsers],
  (users) => users.entities
);

export const selectCurrentPage = createSelector(
  selectUsers,
  (users) => users.currentPage
);

export const selectTotals = createSelector(
  selectUsers,
  (users) => users.total
);

export const selectPerPage = createSelector(
  selectUsers,
  (users) => users.perPage
);

export const selectError = createSelector(
  [selectUsers],
  (users) => users.error
);
