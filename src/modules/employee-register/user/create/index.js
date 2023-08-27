import React, { useState } from 'react'
import { Radio, Form } from 'antd';
import { Wrapper } from "../../../commons/Wrapper";
import UserCreate from "./user-create/index";
import EmployeeFromRegister from "./employee-from-register/index";

const User = () => {
  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsUpdate = params.get('edit');
  let isUpdate = parseInt(paramsUpdate) === 1 ? true : false;
  console.log("paramsUpdate>>>>>", paramsUpdate)
  console.log("isUpdate>>>>>", isUpdate)

  const [ employeeRegisterEmployee, setEmployeeRegisterEmployee ] = useState();

  return (
    <Wrapper >
      {!isUpdate ? 
        <div className="m-4">
          <Radio.Group 
            defaultValue="1" 
            buttonStyle="solid" 
            // onChange={() => {setIsDisabledType(true)}}
          >
            <Radio.Button 
              onClick={()=> setEmployeeRegisterEmployee(false)} 
              value="1" 
            >
              New User
            </Radio.Button>
            <Radio.Button 
              onClick={()=> setEmployeeRegisterEmployee(true)} 
              value="2" 
            >
              User from Register
            </Radio.Button>
          </Radio.Group>
          <div style={{margin: '2rem 0'}}>
            {employeeRegisterEmployee ? 
              <EmployeeFromRegister />
              :
              <UserCreate />
            }
          </div>
        </div>
      :
        <div style={{margin: '2rem'}}><UserCreate isUpdate={isUpdate}/></div>
      }
    </Wrapper>
  )
}

export default User