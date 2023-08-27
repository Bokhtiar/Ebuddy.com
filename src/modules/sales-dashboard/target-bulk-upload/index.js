import React, {useEffect, useState} from 'react';
import {Button, Icon} from 'antd';
import {useDropzone} from 'react-dropzone';
import {TableWrapper, Wrapper} from "../../commons/Wrapper";
import {
  SALES_TARGET_BULK_UPLOAD,
} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import {alertPop} from "../../../scripts/message";
import TargetBulkUploadList from './target-bulk-upload-list';

export default () => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [targetBulkUploadList, setTargetBulkUploadList] = useState();

  const targetBulkUpload = async() =>{
    setLoading(true);
    let formData = new FormData();
    if(fileUpload) formData.append("attachment", fileUpload);

    const url = SALES_TARGET_BULK_UPLOAD;
    let res = await postData(url, formData)
      if (res) {
        let masterData = res?.data?.data;
        if(masterData) setTargetBulkUploadList(masterData);
        alertPop("success", "New sketch updates might introduce changes that are incompatible with our feature sets. This might cause the import to be temporarily unavailable or affect the content transfer quality!");
        setLoading(false);
      }
      else{
        setLoading(false)
      }
  }

  //declare state to hold and trigger file submission on selecting file
  useEffect(()=>{
    if(acceptedFiles) setFileUpload(acceptedFiles[0]);
  },[acceptedFiles]);

  useEffect(()=>{
    if(fileUpload) {
      targetBulkUpload();
    }
  },[fileUpload]);

  return (
    <Wrapper>
      <section style={{display: 'flex', justifyContent:'center', border: '2px dashed #dfe6e9', borderRadius: '5px', margin: '1rem', backgroundColor: '#F1F1F1'}}>
        <div {...getRootProps({className: 'dropzone'})} 
          style={{margin: '2rem', textAlign: 'center'}}
        >
          <Icon 
            type="cloud-upload" 
            style={{fontSize: '3rem', color: '#08A7FB', margin:'1rem'}}
          />
          <input {...getInputProps()} />
          <p style={{fontWeight: 'bold', fontSize: '1.2rem', margin:'1rem'}}>Drag and drop files here</p>
          <Button 
            type="primary" 
            style={{margin:'1rem'}} 
            loading={loading}
          >
            Browse Files
          </Button>
        </div>
      </section>
      <Button 
        type="link" 
        style={{float: "right", margin:"1rem"}}
        onClick={()=> window.open(process.env.REACT_APP_BASE + 'upload-formats/bulk_sales_target.xlsx')}
      >
        Download sample .xlsx file from here
      </Button>
      {targetBulkUploadList ? <TargetBulkUploadList targetBulkUploadList={targetBulkUploadList} /> : null}
    </Wrapper>
  );
}