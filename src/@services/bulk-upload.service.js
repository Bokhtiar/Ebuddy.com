import { PROJECT_BULK_UPLOAD, PROJECT_WISE_MILESTONE_BULK_UPLOAD } from "../scripts/api";
import { FileUploadService } from "./file-upload.service"


export const projectBulkUploadService = async (input) => {
    const fileService = new FileUploadService();
    try {
        const data = await fileService.uploadFile(PROJECT_BULK_UPLOAD, input);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export const milestoneBulkUploadService = async (input) => {
    const fileService = new FileUploadService();
    try {
        const data = await fileService.uploadFile(PROJECT_WISE_MILESTONE_BULK_UPLOAD, input);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}