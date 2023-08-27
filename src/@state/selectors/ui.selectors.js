import { createSelector } from "reselect";

export const uiState = state => state.ui;

export const selectSearchText = createSelector(
    [uiState],
    ({searchText})=> searchText,
)

export const selectAssigneeQuery = createSelector(
    [uiState],
    ({assigneeQuery})=> assigneeQuery,
)