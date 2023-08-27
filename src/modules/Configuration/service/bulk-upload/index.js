import React, {useState, useEffect} from 'react';
import { Form, Select, Radio, Button, Divider, PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { Flex } from "../../../commons/Flex";
import * as Cookies from "js-cookie";
import {
  SERVICE_BULK_UPLOAD
} from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import {alertPop} from "../../../../scripts/message";
import BulkUploadList from './bulk-upload-list';

const { Option } = Select;

const ServiceBulkUpload = Form.create()(({ form, props }) => {
  const [fileUpload, setFileUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [bulkUploadList, setBulkUploadList] = useState();

  const fileUploadHandler = async (event) => {
    let value = event.target.files[0];
    document.getElementById('activity-bulk-import').innerHTML=value.name;
    setFileUpload(value);
  }

  const submit = async() => {
    setLoading(true);
    let formData = new FormData();
    if(fileUpload) formData.append("attachment", fileUpload);

    const url = SERVICE_BULK_UPLOAD;
    let res = await postData(url, formData)
    if (res) {
      let masterData = res?.data?.data;
      if(masterData) setBulkUploadList(masterData);
    alertPop("success", "Successfully complete the process");
    setLoading(false);
    // alertPop("success", res?.data?.messages?.map(item=> item));
    }
    else{
    setLoading(false);
    }
    document.getElementById('activity-bulk-import').innerHTML="";
    setFileUpload();
  };

  return (
    <Wrapper >
        <PageHeader 
            style={{border: '1px solid rgb(235, 237, 240)'}}
            title="Service Bulk Upload" 
        />
      <div className="m-4">
        <div style={{ textAlign: 'right' }}>
            <Button 
            size='large' 
            type="link" 
            onClick={()=> window.open(process.env.REACT_APP_BASE + 'upload-formats/bulk_services.xlsx')}
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
            <div><small>*Please insert less than 2000 rows at a time!</small></div>
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
        {bulkUploadList ? <BulkUploadList bulkUploadList={bulkUploadList} /> : null}
      </div>
    </Wrapper>
  )
})

export default ServiceBulkUpload;
