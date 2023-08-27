import { createSelector } from "reselect";

export const dashboardReportState = state => state.dashboardReport;

export const selectMeetingTracks = createSelector(
    [dashboardReportState],
    ({ meetingTracks }) => meetingTracks,
)
export const selectEmployeeScheduleWork = createSelector(
    [dashboardReportState],
    ({ employeeScheduleWork }) => employeeScheduleWork,
)

export const selectWeeklyTaskCount = createSelector(
    [dashboardReportState],
    ({ weeklyTaskCount }) => weeklyTaskCount,
)

export const selectUserListMdCTOOthers = createSelector(
    [dashboardReportState],
    ({userListMdCTOOthers})=> userListMdCTOOthers,
)

export const selectMeeting = createSelector(
    [dashboardReportState],
    ({meeting})=> meeting,
)

export const selectIsFetching = createSelector(
    [dashboardReportState],
    ({isFetching})=> isFetching,
);
export const selectError = createSelector(
    [dashboardReportState],
    ({error})=> error,
)

export const selectActivity = createSelector(
    [dashboardReportState],
    ({activity})=> activity,
)

export const selectActivityId = createSelector(
    [dashboardReportState],
    ({activityId})=> activityId,
)
export const selectEmployeeTaskList = createSelector(
    [dashboardReportState],
    ({employeeTaskList})=> employeeTaskList,
)
export const selectActivityCountAllUser = createSelector(
    [dashboardReportState],
    ({activityCountAllUser})=> activityCountAllUser,
)
export const selectPaginatorInfo = createSelector(
    [dashboardReportState],
    ({paginatorInfo})=> paginatorInfo,
)

export const selectSopDetails = createSelector(
    [dashboardReportState],
    ({sop}) => sop
)