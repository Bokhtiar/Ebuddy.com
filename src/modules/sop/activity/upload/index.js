import React, {useEffect, useState} from 'react';
import {Button, Icon} from 'antd';
import {useDropzone} from 'react-dropzone';
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import {
  SOP_ACTIVITY_BULK_UPLOAD,
  SOP_BULK_UPLOAD_LIST
} from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import {alertPop} from "../../../../scripts/message";
import SOPBulkUploadList from './sop-bulk-upload-list';

export default (props) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [sopBulkUploadList, setSOPBulkUploadList] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [pageCount, setPageCount] = useState();

  // const files = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  const getSOPBulkUploadList = async() =>{
    let url = SOP_BULK_UPLOAD_LIST + "?";
    if (currentPage) url = url + '&page=' + currentPage;
    let res = await getData(url)
      if (res) {
        let masterData = res?.data?.data?.data;
        setSOPBulkUploadList(masterData);
        setPageCount(res?.data?.data?.last_page);
      }
  }

  const sopBulkUpload = async() =>{
    setLoading(true);
    let formData = new FormData();
    if(fileUpload) formData.append("attachment", fileUpload);

    const url = SOP_ACTIVITY_BULK_UPLOAD;
    let res = await postData(url, formData)
      if (res) {
        alertPop("success", "New sketch updates might introduce changes that are incompatible with our feature sets. This might cause the import to be temporarily unavailable or affect the content transfer quality!");
        setLoading(false);
        getSOPBulkUploadList();
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
      sopBulkUpload();
      getSOPBulkUploadList();
    }
  },[fileUpload]);

  useEffect(()=>{
    getSOPBulkUploadList();
  },[currentPage]);

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
        {/* <aside>
          <ul>{files}</ul>
        </aside> */}
      </section>
      <Button 
        type="link" 
        style={{float: "right", margin:"1rem"}}
        onClick={()=> window.open(process.env.REACT_APP_BASE + 'upload-formats/bulk_sop_activities.xlsx')}
      >
        Download sample .xlsx file from here
      </Button>
      <SOPBulkUploadList 
        sopBulkUploadList={sopBulkUploadList}
        currentPage={currentPage}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
      />
    </Wrapper>
  );
}