import { createSelector } from "reselect";

export const meetingState = state=> state.meeting;

export const selectIsFetching = createSelector(
    [meetingState],
    ({isFetching})=> isFetching,
);

export const selectError = createSelector(
    [meetingState],
    ({error})=> error,
);

export const selectAgendaList = createSelector(
    [meetingState],
    ({agendaList})=> agendaList
)