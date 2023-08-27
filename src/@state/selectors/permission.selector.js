import { createSelector } from "reselect";

export const permissionState = state => state.permission;

export const selectPermissions = createSelector(
    [permissionState],
    ({ permissions }) => permissions,
);
export const selectError = createSelector(
    [permissionState],
    ({ error }) => error
);

export const selectIsFetching = createSelector(
    [permissionState],
    ({ isFetching }) => isFetching,
)
export const selectTaskActivityPermission = createSelector(
    [permissionState],
    ({ taskActivityPermission }) => taskActivityPermission,
)