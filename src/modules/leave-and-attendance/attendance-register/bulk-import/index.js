import React, {useState} from 'react';
import { Form, Select, Input, PageHeader, Row, Col, DatePicker, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import {
  ATTENDANCE_BULK_UPLOAD,
  ATTENDANCE_BULK_EXPORT
} from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import {alertPop} from "../../../../scripts/message";

const { Option } = Select;

const BulkImport = Form.create()(({ form, props }) => {
  const history = useHistory()
  const [fileUpload, setFileUpload] = useState();

  const fileUploadHandler = async (event) => {
    let value = event.target.files[0];
    document.getElementById('attendance-bulk-import').innerHTML=value.name;
    setFileUpload(value);
  }

  // const exportData = async () => {
  //   let url = ATTENDANCE_BULK_EXPORT;
  //   let res = await getData(url);
  //   let masterData = res?.data;
  //   console.log("masterData>>>>>>>>>>>>", masterData);
  //   window.open(ATTENDANCE_BULK_EXPORT);
  // }

  const submit = () => {
    let formData = new FormData();
    if(fileUpload) formData.append("file", fileUpload);

    const url = ATTENDANCE_BULK_UPLOAD;
    postData(url, formData).then(res => {
      if (res?.data?.code === 201 || res?.data?.code === 200) {
        alertPop("success", "Successfully complete the process");
        // alertPop("success", res?.data?.messages?.map(item=> item));
      }
      document.getElementById('attendance-bulk-import').innerHTML="";
      setFileUpload();
    });
  };

  return (
    <Wrapper >
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push(`/leave-and-attendance/attendance-list`)}
        // title="Back to list"
        subTitle="Back to list"
      />
      <div className="m-4">
        <div style={{ textAlign: 'right' }}>
          <Button 
            size='large' 
            type="link" 
            onClick={()=> window.open(process.env.REACT_APP_BASE + 'upload-formats/bulk_attendance.xlsx')}
          >
            Download Sample .xlsx File
          </Button>
        </div>
        <div className="file-upload-content" style={{margin: '1rem 0'}}>
          <label htmlFor="file-upload-field"><span style={{fontWeight: 700, fontSize:'0.8rem', color: '#808080'}}>FILE ATTACHMENT</span></label>
          <div className="file-upload-wrapper" data-text="">
              <span className="attacment-filename" id="attendance-bulk-import"></span>
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
          >
            Upload Now
          </Button>
        </div>
      </div>
    </Wrapper>
  )
})

export default BulkImport;