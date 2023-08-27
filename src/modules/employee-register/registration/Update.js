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
import { ADD_EMPLOYEE_INFO, EMPLOYEE_INFO } from '../../../scripts/api';
import { getData, postData } from '../../../scripts/api-service';
import moment from 'moment';
import {
    commonRemoveItems,
    dropdownItemsRequests
} from './empRegistationHelper';
import LeaveRegister from './leave-register';

import { useHistory } from 'react-router-dom';
import { async, values } from 'react-shimmer';

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

const UpdateRegistration = () => {
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
    const [isDetailsView, setIsDetailsView] = useState(false);

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
        let result = await dropdownItemsRequests();

        setAllDropDown(result);
    }

    const submit = async (data) => {
        if (isDetailsView) {
            if (current < 8) {
                setCurrent(current + 1);
            } else {
                history.push('/employee-register/employee-list');
            }
        } else {
            let updateData = {};

            if (current === 4 || current === 0) {
                updateData = data;
            } else {
                updateData = { ...{ page: current + 1 }, ...data }; //...empInfo
            }

            let url = empInfo.id ? ADD_EMPLOYEE_INFO + '/' + empInfo.id : ADD_EMPLOYEE_INFO;
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
    }

    const generalInfosubmitForm = (values) => {
        // if (values.dob) values.dob = moment(values.dob).format('YYYY-MM-DD');
        // if (values.joining_date) values.joining_date = moment(values.joining_date).format('YYYY-MM-DD');
        // if (values.disable_date) values.disable_date = moment(values.disable_date).format('YYYY-MM-DD');

        submit(values);
    }

    const officalInfosubmitForm = (values) => {
        if (values.separation_date) values.separation_date = moment(values.dob).format('YYYY-MM-DD');
        if (values.appraisal_date) values.appraisal_date = moment(values.dob).format('YYYY-MM-DD');
        if (values.confirmation_date) values.confirmation_date = moment(values.dob).format('YYYY-MM-DD');

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

    const getEmployeeInfo = async () => {
        let searchUrl = window.location.search;
        let params = new URLSearchParams(searchUrl);

        let employeeId = params.get('rowId');
        let detailsView = params.get('detailsView');
        if (detailsView === 'true') setIsDetailsView(true);
        let res = await getData(EMPLOYEE_INFO + employeeId);

        if (res) {
            let masterData = res?.data?.data;
            let removeItems = commonRemoveItems();
            if(masterData) removeItems.forEach(e => delete masterData[e]);
            setEmpInfo(masterData);
        }
    }

    useEffect(() => {
        getALLDropdownItems();
        getEmployeeInfo()
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
                        {steps.map((item, index) => (
                            <Steps.Step
                                key={`step-${item.id}-${index}`} title={item.title}
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
                                isDetailsView={isDetailsView}
                            />
                            : null}
                        <div style={ current === 1 ? {} : {display: 'none'}}>
                            <OfficialInformation
                                ref={officialInfoRef}
                                empInfo={empInfo}
                                officalInfosubmitForm={officalInfosubmitForm}
                                setEmpInfo={setEmpInfo}
                                current={current}
                                dropDownData={allDropDown}
                                isDetailsView={isDetailsView}
                            />
                        </div>
                        {/* {current === 1 ?
                        : null} */}
                        {current === 2 ?
                            <PersonalInformation
                                personalInfosubmitForm={personalInfosubmitForm}
                                ref={personalInfoRef}
                                empInfo={empInfo}
                                setEmpInfo={setEmpInfo}
                                dropDownData={allDropDown}
                                isDetailsView={isDetailsView}
                            />
                            : null}
                        {current === 3 ?
                            <LeaveRegister
                                leaveRegistersubmitForm={leaveRegistersubmitForm}
                                ref={leaveRegister}
                                empInfo={empInfo}
                                setEmpInfo={setEmpInfo}
                                dropDownData={allDropDown}
                                isDetailsView={isDetailsView}
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
                                isDetailsView={isDetailsView}
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
                                GeneralSalaryForm={GeneralSalaryForm}
                                isDetailsView={isDetailsView}
                            />
                            : null}
                        {current === 6 ?
                            <JobExperience
                                ref={jobExperienceRef}
                                empInfo={empInfo}
                                setEmpInfo={setEmpInfo}
                                jobExperienceSubmitForm={jobExperienceSubmitForm}
                                isDetailsView={isDetailsView}
                            />
                            : null}
                        {current === 7 ?
                            <EducationalQualification
                                ref={educationalQualificationRef}
                                empInfo={empInfo}
                                setEmpInfo={setEmpInfo}
                                educationQualifiactionSubmitForm={educationQualifiactionSubmitForm}
                                isDetailsView={isDetailsView}
                            />
                            : null}
                        {current === 8 ?
                            <Skill
                                ref={skillRef}
                                empInfo={empInfo}
                                setEmpInfo={setEmpInfo}
                                skillSubmitForm={skillSubmitForm}
                                isDetailsView={isDetailsView}
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
                        <Button size='large' type="primary" ghost className='mr-4' 
                            onClick={() => {setCurrent(current -1)}}>Back </Button>
                        <Button size='large' type="primary" onClick={saveItem}> {isDetailsView ? 'Next' : 'Update'}</Button>
                    </div>
                </Col>
            </Row>
        </Wrapper>
    )
}

export default UpdateRegistration;