import { createSelector } from "reselect";

export const bulkUploadState = state=> state.bulkUpload;

export const selectError = createSelector(
    [bulkUploadState],
    ({error})=> error,
);

export const selectIsFetching = createSelector(
    [bulkUploadState],
    ({isFetching})=> isFetching,
);
export const selectProjectFilePath = createSelector(
    [bulkUploadState],
    ({projectFilePath})=> projectFilePath,
);
export const selectMilestoneFilePath = createSelector(
    [bulkUploadState],
    ({milestoneFilePath})=> milestoneFilePath,
);

export const selectProjectUploadMessages = createSelector(
    [bulkUploadState],
    ({projectUploadMessages})=> projectUploadMessages,
)

export const selectMilestoneUploadMessages = createSelector(
    [bulkUploadState],
    ({milestoneUploadMessages})=> milestoneUploadMessages,
)