import React from 'react'
import { Card } from 'antd'
import SampleFileDownloader from './@components/SampleFileDownloader'
import { SampleFilePaths } from './mocks/sample-file-paths'
import FileUploader from './@components/FileUploader'
import UploadButton from './@components/UploadButton'

const {bulkUpload:{projectPage}} = SampleFilePaths

const MilestoneBulkUpload = ({
  titleTxt="Milestone Bulk Upload",
  uploadAction,
    setPathAction,
    filePathSelector
}) => {
  return (
      <div>
          <Card title={titleTxt} extra={<SampleFileDownloader filePath={projectPage.milestone} />}>
              <FileUploader elementId={'MILESTONE_BULK_UPLOAD'} onChangeFilePathEmitter={setPathAction} />
              <UploadButton onUploadEvent={uploadAction} />
          </Card>
      </div>
  )
}

export default MilestoneBulkUpload;