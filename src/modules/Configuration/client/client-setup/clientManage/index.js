import React, {useState, useEffect} from 'react';
import { Steps, Button, message } from 'antd';
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";
import styled from "styled-components";
import { CLIENT_CREATE, CLIENT_LIST } from "../../../../../scripts/api";
import { postData, getData } from "../../../../../scripts/api-service";

const StyledBtn = styled(Button)`
  padding: 0 4.2rem;
`;

const { Step } = Steps;

const steps = [
    {
        title: 'General',
        content: 'First-content',
        value: '0'
    },
    {
        title: 'Profiling',
        content: 'Second-content',
        value: '1'
    },
    {
        title: 'Departments',
        content: 'Last-content',
        value: '2'
    },
    {
        title: 'Contacts',
        content: 'Last-content',
        value: '3'
    },
];
  
export default function ClintManage({
    industryTypes,
    industrySectors,
    companyTypes,
    companySizes,
    edit,
    isDetailsView,
    resetData,
    closeClientManage,
    designationList,
    generationList,
    setIndustryType
}) {
    const [current, setCurrent] = useState(0);
    const [refresh, setRefresh] = useState(0);

    const [content1stValue, setContent1stValue] = useState();
    const [content2ndValue, setContent2ndValue] = useState();
    const [content3rdValue, setContent3rdValue] = useState();
    const [content4thValue, setContent4thValue] = useState();
    const [client, setClient] = useState();
    const [stepperNumber, setStepperNumber] = useState();

    const next = (count) => {
        if (count) setCurrent(count * 1);
        else setCurrent(current + 1);

        setStepperNumber(null);
    }
    
    const prev = () =>  {
        setCurrent(current - 1);
        setStepperNumber(null);
    }

    const nextSubmit = () => {
        setRefresh(refresh + 1);
    }

    const firstSubmit = (data) => {
        setContent1stValue(data);

        if (isDetailsView) {
            next(stepperNumber);
        } else {
            if (client && client.id) {
                updateClient(data)
            } else {
                clientCreate(data);
            }
        }
    }

    const secontSubmit = (data) => {
        setContent2ndValue(data);
        if (isDetailsView) {
            next(stepperNumber)
        } else {
            if (client && client.id) {
                // data.establish_date = moment(data.establish_date).format("YYYY-MM-DD");
                updateClient(data);
            }
        }
    }

    const ThirdSubmit = (data) => {
        setContent3rdValue(data);

        if (isDetailsView) {
            next(stepperNumber)
        } else {
            if (data?.length) {
                let departments = [];
    
                data.forEach(val => {
                    departments.push({
                        "id": val.dep_id || '',
                        "department_name": val.dept_name,
                        "status": val.status
                    })
                });
    
                updateClient({departments: JSON.stringify(departments)});
            }
        }
    }

    const submit = (data) => {
        if (isDetailsView) {
            next(stepperNumber)
        } else { 
            if (data && data.length) {
                let contacts = [];
    
                data.forEach(value => {
                    contacts.push({
                        "id": value.contact_id || "",
                        "client_department_id": (typeof value.department_name === 'number') ? value.department_name : value.client_department_id ? value.client_department_id : '',
                        "contact_name": value.contact_name,
                        "contact_email": value.contact_email,
                        "contact_mobile": value.contact_mobile,
                        "status": value.status,
                        "client_designation_id": value.client_designation_id
                    })
                });
                updateClient({contacts: JSON.stringify(contacts)}, true)
            }
        }
    };

    const clientCreate = async (data) => {
        let res = await postData(CLIENT_CREATE, {...data});

        if (res) {
            let masterData = res.data.data;
            setClient(masterData);
            resetData(CLIENT_LIST)
            next(stepperNumber);
        }
    }

    const updateClient = async (data, isSubmit) => {
        let res = await postData(CLIENT_LIST + `/${client.id}`, {...data});

        if (res) {
            let masterData = res.data.data;
            setClient(masterData);
            resetData(CLIENT_LIST)
            if (!isSubmit || stepperNumber) next(stepperNumber);
            else closeClientManage();
        }
    }

    const getClientInfo = async () => {
        let res = await getData(CLIENT_LIST + `/${client.id}`);

        if (res) {
            let masterData = res.data.data;
            setClient(masterData);
        }
    }

    const stepChanges = (item) => {
        setStepperNumber(item.value);
        nextSubmit(stepperNumber);
    }

    useEffect(() => {
        setClient(edit);
    }, [edit]) 

    return (
        <div className="pb-5">
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} style={{cursor: 'pointer'}}
                        onClick={() => stepChanges(item)} />
                ))}
            </Steps>
            <div className="steps-content">
                <StepOne refresh={refresh}
                    current={current}
                    industryTypes={industryTypes}
                    industrySectors={industrySectors}
                    firstSubmit={firstSubmit}
                    client={client}
                    isDetailsView={isDetailsView}
                    setIndustryType={setIndustryType}
                />

                <StepTwo refresh={refresh}
                    current={current}
                    companySizes={companySizes}
                    companyTypes={companyTypes}
                    generationList={generationList}
                    secontSubmit ={secontSubmit }
                    client={client}
                    isDetailsView={isDetailsView}
                />

                <StepThree
                    refresh={refresh} 
                    current={current}
                    ThirdSubmit ={ ThirdSubmit }
                    client={client}
                    getClientInfo={getClientInfo}
                    isDetailsView={isDetailsView}
                />

                <StepFour 
                    refresh={refresh} 
                    current={current}
                    departments={content3rdValue}
                    client={client}
                    designationList={designationList}
                    generationList={generationList}
                    getClientInfo={getClientInfo}
                    submit ={ submit }
                    isDetailsView={isDetailsView}
                />

            </div>
            
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <StyledBtn size="large" type="primary" onClick={() => {nextSubmit()}} style={{float: 'right'}}>
                        Next
                    </StyledBtn>
                )}
                {current === steps.length - 1 && !isDetailsView ? (
                    <StyledBtn size="large" type="primary" onClick={() => {nextSubmit()}} style={{float: 'right'}}>
                        Done
                    </StyledBtn>
                ) : ''}

                {current > 0 && (
                    <StyledBtn size="large" style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Previous
                    </StyledBtn>
                )}
            </div>
        </div>
    )
}
