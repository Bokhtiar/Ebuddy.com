import React from 'react'
import { Button } from 'antd'


const SampleFileDownloader = ({
    filePath
}) => {
    return (
        <div style={{ textAlign: 'right' }}>
            <Button
                size='large'
                type="link"
                onClick={() => window.open(filePath)}
            >
                Download Sample File
            </Button>
        </div>
    )
}

export default SampleFileDownloader;

{/* <div>
        <div style={{ textAlign: 'right' }}>
            <Button 
            size='large' 
            type="link" 
            onClick={()=> 
                business ? 
                    window.open(process.env.REACT_APP_BASE + 'upload-formats/business_activity.xlsx')
                :
                nonBusiness ? 
                    window.open(process.env.REACT_APP_BASE + 'upload-formats/non_business_activity.xlsx')
                : null
            }
            >
            Download Sample File
            </Button>
        </div>
        <div className="file-upload-content" style={{margin: '1rem 0'}}>
            <label htmlFor="file-upload-field"><span style={{fontWeight: 700, fontSize:'0.8rem', color: '#808080'}}>FILE ATTACHMENT</span></label>
            <div className="file-upload-wrapper" data-text="">
                <span className="attacment-filename" id="activity-bulk-import"></span>
                <input 
                    name="file-upload-field" type="file" className="file-upload-field" value=""
                    onChange={fileUploadHandler}
                    accept=".xlsx"
                />
            </div>
        </div>
        <div style={{ textAlign: 'right' }}>
            <Button 
            size='large' 
            type="primary" 
            onClick={submit}
            disabled={fileUpload ? false : true}
            loading={loading}
            >
                Upload Now
            </Button>
        </div>
    </div> */}
