import React from 'react'
import { FileUploadService } from '../../../@services/file-upload.service'

const FileUploader = ({
    elementId="NOT_FOUND",
    onChangeFilePathEmitter,
}) => {
    const uploadService = new FileUploadService();
    return (
        <div className="file-upload-content" style={{ margin: '1rem 0' }}>
            <label htmlFor="file-upload-field" >
                <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>FILE ATTACHMENT</span>
            </label>
            <div className="file-upload-wrapper" data-text="">
                <span className="attacment-filename" id={elementId}></span>
                <input
                    name="file-upload-field" type="file" className="file-upload-field" value=""
                    onChange={(event)=> {
                        const path = uploadService.getFilePath(event, elementId);
                        const fromData = event.target.files[0]
                        onChangeFilePathEmitter(event.target.files[0])
                    }}
                    accept=".xlsx"
                />
            </div>
        </div>
    )
}

export default FileUploader