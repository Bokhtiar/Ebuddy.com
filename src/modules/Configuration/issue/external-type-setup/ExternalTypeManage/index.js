import React, {useState, useEffect} from 'react';
import { Steps, Button, message, Divider } from 'antd';
import {Wrapper} from "../../../../commons/Wrapper";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import styled from "styled-components";
import { EXTERNAL_TYPE_CREATE, EXTERNAL_TYPE_LIST, EXTERNAL_POC } from "../../../../../scripts/api";
import { postData, getData } from "../../../../../scripts/api-service";
import {alertPop} from "../../../../../scripts/message";
// import {Flex} from "../../../../commons/Flex";
// import {PageTitle} from "../../../../commons/PageTitle";

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
        title: 'Contacts',
        content: 'Second-content',
        value: '1'
    },
];
  
export default function ExternalSetup({
    externalTypesList,
    industryTypes,
    industrySectors,
    companyTypes,
    companySizes,
    edit,
    isDetailsView,
    resetData,
    closeExternalTypeManage,
    designationList,
    generationList
}) {
    const [current, setCurrent] = useState(0);
    const [refresh, setRefresh] = useState(0);

    const [content1stValue, setContent1stValue] = useState();
    const [externalType, setExternalType] = useState();
    const [stepperNumber, setStepperNumber] = useState();

    const next = (count) => {
     setCurrent(current + 1);
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
        }else {
            if (externalType && externalType.id) {
                updateClient(data);
            } else {
                externalCreate(data);
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
                        "external_type_id": externalType.id,
                        "name": value.name,
                        "email": value.email,
                        "mobile": value.mobile,
                        "status": value.status,
                    })
                });
                externalPOCCreate({contacts: JSON.stringify(contacts)}, true)
            }
        }
    };

    const externalCreate = async (data) => {
        let res = await postData(EXTERNAL_TYPE_CREATE, {...data});

        if (res) {
            let masterData = res.data.data;
            setExternalType(masterData);
            resetData(EXTERNAL_TYPE_LIST);
            next(stepperNumber);
            alertPop("success", "Process completed successfully");
        }
    }

    const externalPOCCreate = async (data) => {
        let res = await postData(EXTERNAL_POC, {...data});

        if (res) {
            let masterData = res.data.data;
            setExternalType(masterData);
            resetData(EXTERNAL_TYPE_LIST);
            if (stepperNumber) next(stepperNumber);
            else {
                closeExternalTypeManage();
                alertPop("success", "Process completed successfully");
            }
        }
    }

    const updateClient = async (data, isSubmit) => {
        let res = await postData(EXTERNAL_TYPE_LIST + `/${externalType.id}`, {...data});

        if (res) {
            let masterData = res.data.data;
            setExternalType(masterData);
            resetData(EXTERNAL_TYPE_LIST)
            if (!isSubmit || stepperNumber) next(stepperNumber);
            else {
                closeExternalTypeManage();
                alertPop("success", "Process completed successfully");
            }
        }
    }

    const getExternalTypeInfo = async () => {
        let res = await getData(EXTERNAL_TYPE_LIST);

        if (res) {
            let masterData = res.data.data;
            setExternalType(masterData);
        }
    }

    const stepChanges = (item) => {
        setStepperNumber(item.value);
        nextSubmit(stepperNumber);
    }

    useEffect(() => {
        setExternalType(edit);
    }, [edit]) 

    return (
        <div className="pb-5">
            <Steps current={current} style={{marginTop:'1rem'}}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} style={{cursor: 'pointer'}}
                        onClick={() => stepChanges(item)} />
                ))}
            </Steps>
            <div className="steps-content">
                <StepOne 
                    refresh={refresh}
                    current={current}
                    firstSubmit={firstSubmit}
                    externalType={externalType}>
                </StepOne> 
                <StepTwo 
                    refresh={refresh} 
                    current={current}
                    externalTypes={content1stValue}
                    externalType={externalType}
                    getExternalTypeInfo={getExternalTypeInfo}
                    submit ={ submit }></StepTwo>
            </div>
            
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <StyledBtn size="large" type="primary" onClick={() => {nextSubmit()}} style={{float: 'right'}}>
                        Save and Next
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
