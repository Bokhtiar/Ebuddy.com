import React, { useState, useRef, useEffect } from 'react';
import { Steps, Row, Col, Card, Button } from 'antd';
import GeneralInformation from './general-information';
import OfficialInformation from './official-information';
import PersonalInformation from './personal-information';
import Reference from './reference';
import StandardSalary from './standard salary';
import GeneralSalary from './general-salary';
import JobExperience from './job-experience';
import EducationalQualification from './educational-qualification';
import Skill from './skill';
import { TableWrapper, Wrapper } from "../../commons/Wrapper";
import {
  ADD_EMPLOYEE_INFO
} from '../../../scripts/api';
import { getData, postData } from '../../../scripts/api-service';
import moment from 'moment';
import {
  commonRemoveItems, dropdownItemsRequests
} from './empRegistationHelper';
import LeaveRegister from './leave-register';

import { useHistory } from 'react-router-dom';
import { async, values } from 'react-shimmer';
import { alertPop } from '../../../scripts/message';

const steps = [
  { title: "General Information" },
  { title: "Official Information" },
  { title: "Personal Information" },
  { title: "Leave Register" },
  { title: "Reference and Others" },
  // { title: "Standard Salary & Allowances" },
  { title: "General Salary & Allowances" },
  { title: "Job Experience" },
  { title: "Educational Qualification" },
  { title: "Skill" }
];

const Registration = () => {
  const generalInfoRef = useRef(null);
  const officialInfoRef = useRef(null);
  const personalInfoRef = useRef(null);
  const leaveRegister = useRef(null);
  const referenceRef = useRef(null);
  const standardSalaryRef = useRef(null);
  const generalSalaryRef = useRef(null);
  const jobExperienceRef = useRef(null);
  const educationalQualificationRef = useRef(null);
  const skillRef = useRef(null);
  const history = useHistory();

  const [current, setCurrent] = useState(0);
  const [empInfo, setEmpInfo] = useState();
  const [allDropDown, setAllDropDown] = useState();
  const [joiningDate, setjoiningDate] = useState();

  const saveItem = () => {
    if (current === 0) {
      generalInfoRef.current.submitGeneralInfo();
    } else if (current === 1) {
      officialInfoRef.current.submitOfficalInfo();
    } else if (current === 2) {
      personalInfoRef.current.submitPersonalInfo();
    } else if (current === 3) {
      leaveRegister.current.submitLeaveRegister();
    } else if (current === 4) {
      referenceRef.current.submitReference();
    }
    // else if (current === 5) {
    //   standardSalaryRef.current.StandardSalaryFormRef();
    // } 
    else if (current === 5) {
      generalSalaryRef.current.submitGeneralSalary();
    } else if (current === 6) {
      jobExperienceRef.current.submitJobExperience();
    } else if (current === 7) {
      educationalQualificationRef.current.submitEducationalQualification();
    } else if (current === 8) {
      skillRef.current.submitSkill();
    }
  };

  const getALLDropdownItems = async () => {
    let result = await dropdownItemsRequests()

    setAllDropDown(result);
  }

  const submit = async (data) => {
    // for (const value of data.values()) {
    //   console.log("form data>>>>>>>>>>>>",value);
    // }

    let updateData = {};
    if (current === 4 || current === 0) {
      updateData = data;
    } else {
      updateData = { ...{ page: current + 1 }, ...data }; //{ ...empInfo, ...data };
    }

    let url = empInfo?.id ? ADD_EMPLOYEE_INFO + '/' + empInfo.id : ADD_EMPLOYEE_INFO;
    let res = await postData(url, updateData);

    if (res) {
      let masterData = res?.data?.data;
      if (masterData.id) {
        let removeItems = commonRemoveItems();
        removeItems.forEach(e => delete masterData[e]);

        setEmpInfo(masterData);
        if (current < 8) {
          setCurrent(current + 1);
        } else {
          history.push('/employee-register/employee-list');
        }
      }
    }
  }

  const generalInfosubmitForm = (values) => {
    // if (values.dob) values.dob = moment(values.dob).format('YYYY-MM-DD');
    // if (values.joining_date) values.joining_date = moment(values.joining_date).format('YYYY-MM-DD');
    // if (values.disable_date) values.disable_date = moment(values.disable_date).format('YYYY-MM-DD');

    submit(values);
  }

  const officalInfosubmitForm = (values) => {
    if (values.separation_date && values.confirmation_date){
      if(values.separation_date > values.confirmation_date) values.separation_date = moment(values.dob).format('YYYY-MM-DD');
      else return alertPop('error', 'Separation date cannot be earlier than confirmation date!')
    }
    if (values.appraisal_date && values.confirmation_date){
      if(values.appraisal_date > values.confirmation_date) values.appraisal_date = moment(values.dob).format('YYYY-MM-DD');
      else return alertPop('error', 'Appraisal date cannot be earlier than confirmation date!')
    }
    if (values.confirmation_date && joiningDate) {
      if(values.confirmation_date > joiningDate) values.confirmation_date = moment(values.dob).format('YYYY-MM-DD');
      else return alertPop('error', 'Confirmation date cannot be earlier than joining date!')
    }
    submit(values);
  }

  const personalInfosubmitForm = async (values) => {
    submit(values);
  }

  const leaveRegistersubmitForm = async (values) => {
    submit(values);
  }

  const referencesubmitForm = async (values) => {
    submit(values);
  }

  const jobExperienceSubmitForm = async (values) => {
    submit(values)
  }

  const educationQualifiactionSubmitForm = async (values) => {
    submit(values);
  }

  const skillSubmitForm = async (values) => {
    submit(values);
  }

  const GeneralSalaryForm = async (values) => {
    submit(values)
  }

  useEffect(() => {
    getALLDropdownItems()
  }, [])

  return (
    <Wrapper className="mx-2" style={{ width: '99%', marginTop: '1rem', marginBottom: 0 }}>
      <Row style={{ margin: '1rem' }}>
        <Col span={8} style={{ top: 0, position: 'sticky' }}>
          <Steps
            direction="vertical"
            current={current}
          // onChange={(value) => setCurrent(value)}
          >
            {steps.map(item => (
              <Steps.Step
                title={item.title}
              />
            ))}
          </Steps>
        </Col>
        <Col span={16}>
          <Card>
            {current === 0 ?
              <GeneralInformation
                ref={generalInfoRef}
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
                generalInfosubmitForm={generalInfosubmitForm}
                dropDownData={allDropDown}
                current={current}
                setjoiningDate={setjoiningDate}
              />
              : null}
            {current === 1 ?
              <OfficialInformation
                ref={officialInfoRef}
                empInfo={empInfo}
                officalInfosubmitForm={officalInfosubmitForm}
                setEmpInfo={setEmpInfo}
                dropDownData={allDropDown}
              />
              : null}
            {current === 2 ?
              <PersonalInformation
                personalInfosubmitForm={personalInfosubmitForm}
                ref={personalInfoRef}
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
                dropDownData={allDropDown}
              />
              : null}
            {current === 3 ?
              <LeaveRegister
                leaveRegistersubmitForm={leaveRegistersubmitForm}
                ref={leaveRegister}
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
                dropDownData={allDropDown}
              ></LeaveRegister>
              : null}
            {current === 4 ?
              <Reference
                referencesubmitForm={referencesubmitForm}
                ref={referenceRef}
                empInfo={empInfo}
                current={current}
                setEmpInfo={setEmpInfo}
                dropDownData={allDropDown}
              />
              : null}
            {/* {current === 5 ? 
              <StandardSalary
                ref={standardSalaryRef}   
                empInfo={empInfo}
                setEmpInfo={setEmpInfo} 
              /> 
            : null} */}
            {current === 5 ?
              <GeneralSalary
                ref={generalSalaryRef}
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
                current={current}
                GeneralSalaryForm={GeneralSalaryForm}
              />
              : null}
            {current === 6 ?
              <JobExperience
                ref={jobExperienceRef}
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
                jobExperienceSubmitForm={jobExperienceSubmitForm}
              />
              : null}
            {current === 7 ?
              <EducationalQualification
                ref={educationalQualificationRef}
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
                educationQualifiactionSubmitForm={educationQualifiactionSubmitForm}
              />
              : null}
            {current === 8 ?
              <Skill
                ref={skillRef}
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
                skillSubmitForm={skillSubmitForm}
              />
              : null}
          </Card>
        </Col>
      </Row>

      <Row style={{ margin: '1rem' }}>
        <Col span={12}>
          <Button size='large' type="danger" ghost className='mr-4'
            onClick={() => { history.push('/employee-register/employee-list') }}> Close </Button>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: 'right' }}>
            {
              current ? <Button size='large' type="primary" ghost className='mr-4'
                onClick={() => { setCurrent(current - 1) }}>Back </Button> : ''
            }
            <Button size='large' type="primary" onClick={saveItem}>{current === 0 ? 'Save' : 'Update'} </Button>
          </div>
        </Col>
      </Row>
    </Wrapper>
  )
}

export default Registration