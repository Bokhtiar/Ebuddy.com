import React, {useState, useEffect} from 'react';
import { Form, Select, Radio, Button, Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import { TableWrapper, Wrapper } from "../../commons/Wrapper";
import { Flex } from "../../commons/Flex";
import * as Cookies from "js-cookie";
import {
  PIS_DEPARTMENT_LIST,
  ACTIVITY_BULK_UPLOAD,
  DEPARTMENT_SERVICE_MATRIX_BULK_UPLOAD
} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import {alertPop} from "../../../scripts/message";

const { Option } = Select;

const UploadOption = Form.create()(({ form, props }) => {
  const company_id = JSON.parse(Cookies.get("profile")).company_id;
  const history = useHistory();
  const [filterData, setFilterData] = useState();
  const [selectValue, setSelectedValue] = useState();
  const [fileUpload, setFileUpload] = useState();
  const [loading, setLoading] = useState(false);

  const fileUploadHandler = async (event) => {
    let value = event.target.files[0];
    document.getElementById('activity-bulk-import').innerHTML=value.name;
    setFileUpload(value);
  }

  const getDepartmentList = async () => {
    let url = PIS_DEPARTMENT_LIST + '?' + "&company_id=" + company_id;
    const res = await getData(url);

    if (res) {
        let masterData = res?.data?.data;
        if (res?.data?.code === 200) {
            setFilterData(prevState => ({
              ...prevState,
              ["department"]: masterData
            }));
        }
    }
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  const submit = async() => {
    if(!selectValue?.department_id){
      alertPop("error", "Please select a department");
      document.getElementById('activity-bulk-import').innerHTML="";
      setFileUpload();
    }
    else{
      setLoading(true);
      let formData = new FormData();
      if(fileUpload) formData.append("attachment", fileUpload);
      if(fileUpload) formData.append("department_id", selectValue?.department_id);
  
      const url = DEPARTMENT_SERVICE_MATRIX_BULK_UPLOAD;
      let res = await postData(url, formData)
      if (res) {
        alertPop("success", "Successfully complete the process");
        setLoading(false);
        // alertPop("success", res?.data?.messages?.map(item=> item));
      }
      else{
        setLoading(false);
      }
      document.getElementById('activity-bulk-import').innerHTML="";
      setFileUpload();
    }
  };

  return (
    <Wrapper >
       <Flex space="1rem" justify="space-between">
          <Select
              style={{ width: '30%', margin: '0 1rem' }}
              allowClear={true}
              placeholder='Department Name'
              showSearch
              optionFilterProp="children"
              onChange={val => setSelectedValue(prevState => ({
                  ...prevState,
                  ["department_id"]: val
              }))}
              filterOption={(input, option) =>
                  option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0}
          >
              {filterData?.department?.length ?
                  filterData?.department.map(dept => <Select.Option value={dept.id} key={dept.id}>{dept.name}</Select.Option>) : ''
              }
          </Select>
          <div style={{ textAlign: 'right' }}>
            <Button 
            size='large' 
            type="link" 
            onClick={()=> window.open(process.env.REACT_APP_BASE + 'upload-formats/service-matrix.xlsx')}
            >
            Download Sample File
            </Button>
          </div>
        </Flex>
        {/* <Divider /> */}
      <div className="m-4">
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
      </div>
    </Wrapper>
  )
})

export default UploadOption;
