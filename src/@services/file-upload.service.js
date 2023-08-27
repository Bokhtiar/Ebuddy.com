"use strict"

import { postData } from "../scripts/api-service";

export class FileUploadService {

    filePath;
    htmlElememtId;

    async getFilePath(event, elementId) {
        this.htmlElememtId = elementId;
        this.filePath = event.target.files[0];
        document.getElementById(this.htmlElememtId).innerHTML = this.filePath["name"];
        return this.filePath;
    }


    async uploadFile(apiUrl, _filePath) {
        const formData = new FormData();
        try {
            if (_filePath) {
                formData.append('file', _filePath);
                const response = await postData(apiUrl, formData);
                return {
                    response,
                    status: "success",
                    message: "Successfully complete the process"
                };
            }
        } catch (error) {
            return {
                status: "failed",
                message: "Unable to complete the process. Please retry"
            }
        }

    }
}

