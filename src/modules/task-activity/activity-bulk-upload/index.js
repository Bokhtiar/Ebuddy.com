import React, {useState} from 'react';
import { Form, Select, Radio } from 'antd';
import { useHistory } from 'react-router-dom';
import { TableWrapper, Wrapper } from "../../commons/Wrapper";
import {
  ACTIVITY_BULK_UPLOAD,
  BUSINESS_ACTIVITY_BULK_UPLOAD,
  NON_BUSINESS_ACTIVITY_BULK_UPLOAD,
  ATTENDANCE_BULK_EXPORT
} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import {alertPop} from "../../../scripts/message";
import BulkUpload from './bulk-upload/index';
import BusinessBulkUpload from './business/index';
import NonBusinessBulkUpload from './non-business/index';

const { Option } = Select;


const ActivityBulkImport = Form.create()(({ form, props }) => {
  const history = useHistory()
  const [fileUpload, setFileUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState(true);
  const [nonBusiness, setNonBusiness] = useState(false);
  const [bulkUploadList, setBulkUploadList] = useState();

  const fileUploadHandler = async (event) => {
    let value = event.target.files[0];
    document.getElementById('activity-bulk-import').innerHTML=value.name;
    setFileUpload(value);
  }

  // const exportData = async () => {
  //   let url = ATTENDANCE_BULK_EXPORT;
  //   let res = await getData(url);
  //   let masterData = res?.data;
  //   console.log("masterData>>>>>>>>>>>>", masterData);
  //   window.open(ATTENDANCE_BULK_EXPORT);
  // }

  const submit = async() => {
    setLoading(true);
    let formData = new FormData();
    if(fileUpload) {
      formData.append("file", fileUpload);
      console.log(fileUpload);
    }

    
    const url = business? BUSINESS_ACTIVITY_BULK_UPLOAD : NON_BUSINESS_ACTIVITY_BULK_UPLOAD;
    let res = await postData(url, formData)
      if (res) {
        let masterData = res?.data?.messages;
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
      <div className="m-4">
        <Radio.Group 
          defaultValue="1" 
          buttonStyle="solid" 
          style={{width: '50%'}} 
          // onChange={() => {setIsDisabledType(true)}}
        >
          <Radio.Button 
            onClick={()=> {
              setBusiness(true);
              setNonBusiness(false);
              setBulkUploadList();
            }} 
            value="1" 
          >
            Business
          </Radio.Button>
          <Radio.Button 
            onClick={()=> {
              setNonBusiness(true);
              setBusiness(false);
              setBulkUploadList();
            }} 
            value="2" 
          >
            Non-business
          </Radio.Button>
        </Radio.Group>
        {/* <BulkUpload 
          fileUpload={fileUpload}
          fileUploadHandler={fileUploadHandler}
          submit={submit}
          loading={loading}
          business={business}
          nonBusiness={nonBusiness}
        /> */}
      </div>
      <div className="m-4">
        { business ? 
          <BusinessBulkUpload 
            fileUpload={fileUpload}
            fileUploadHandler={fileUploadHandler}
            submit={submit}
            loading={loading}
            bulkUploadList={bulkUploadList}
          />
          :
          nonBusiness ? 
          <NonBusinessBulkUpload 
            fileUpload={fileUpload}
            fileUploadHandler={fileUploadHandler}
            submit={submit}
            loading={loading}
            bulkUploadList={bulkUploadList}
          />
          : null
        } 
      </div>
    </Wrapper>
  )
})

export default ActivityBulkImport;