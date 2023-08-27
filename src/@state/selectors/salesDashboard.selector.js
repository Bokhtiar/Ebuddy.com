import { createSelector } from "reselect";

export const salesDashboardState = state => state.salesDashboard;

export const selectNonBudgeAchivements = createSelector(
    [salesDashboardState],
    ({nonBudgeAchivements})=>  nonBudgeAchivements,
);

export const selectError = createSelector(
    [salesDashboardState],
    ({error})=> error,
);

export const selectIsFetching = createSelector(
    [salesDashboardState],
    ({isFetching})=> isFetching,
);

export const selectDateRangeQuery = createSelector(
    [salesDashboardState],
    ({dateRangeQuery})=> dateRangeQuery,
);

export const selectAchivementStatus = createSelector(
    [salesDashboardState],
    ({achivementStatus})=> achivementStatus,
);

export const selectTotal = createSelector(
    [salesDashboardState],
    ({total})=> total,
);

export const selectTo = createSelector(
    [salesDashboardState],
    ({to})=> to,
);

export const selectCurrentPage = createSelector(
    [salesDashboardState],
    ({currentPage})=> currentPage,
);

export const selectSearchQuery = createSelector(
    [salesDashboardState],
    ({searchQuery})=> searchQuery,
);