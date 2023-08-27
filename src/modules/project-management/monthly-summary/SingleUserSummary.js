import React, {useEffect, useState} from "react";
import {Button, Divider, Modal, Select, Skeleton, Table, Row, Col, Timeline, Collapse,Avatar,Icon, Tag, Progress, PageHeader } from "antd";
import {
    CLIENT_LIST,
    COMPANY_SIZE_LIST,
    COMPANY_TYPE_LIST,
    INDUSTRY_SECTOR_LIST,
    INDUSTRY_TYPE_LIST,
    GET_CLIENT_FILTER ,
    PROJECT_MILESTONE_SUMMARY_REPORT
} from "../../../scripts/api";
import {alertPop} from "../../../scripts/message";
import {getData} from "../../../scripts/api-service";
import {Flex} from "../../commons/Flex";
import {PageTitle} from "../../commons/PageTitle";
import SearchFilter from "../../commons/SearchFilter";
import {Wrapper} from "../../commons/Wrapper";
import {dateFormat} from "../../../scripts/helper";
import moment from 'moment';

/*
    These are newer modules and ant design Tables are used instead
    of custom designed Tables in the project commons directory
*/
// className: 'text-primary',
//     style: {backgroundColor: 'black'},

export default function SingleUserSummary({userData}){
    return (
        <Wrapper>
            <Collapse
                defaultActiveKey={userData.empId || 0}
                // onChange={callback}
                expandIconPosition='right'
                style={{margin:'1rem 3rem'}}
                bordered="true"
                >
                <Collapse.Panel 
                    header={
                    <div style={{display:'flex'}}>
                        <Avatar><Icon type="user" /></Avatar>
                        <p style={{marginLeft: '1rem'}}>{userData.empName || 'N/A'}</p>
                    </div>
                    } 
                    key={userData.empId || 'N/A'}
                >
                    {userData?.items?.length ? 
                        userData.items.map(user=> {
                            return(
                                <>
                                    <Row gutter={16} style={{display:'flex', alignItems:'center'}}>
                                        <Col span={6}>
                                            <strong>{user.project_name}</strong>
                                            <p>{user.client_name}</p>
                                        </Col>
                                        <Col span={4}>
                                            <Button type="danger" ghost>{user.failed_milestones}</Button>
                                            <p>Failed Milestone</p>
                                        </Col>
                                        <Col span={5}>
                                            <strong>{user.milestone_name}</strong>
                                            <div style={{display: 'flex'}}>
                                                <Tag color="#87d068" style={{display: 'flex', alignItems:'center'}}><strong>{user.status}</strong></Tag>
                                                {user.review_status ? <p style={{color:"green"}}>{user.review_status}</p> :null}
                                            </div>
                                        </Col>
                                        <Col span={4}>
                                            <p>Progress: <strong>{user.milestone_progress}</strong></p>
                                            <Progress percent={user.milestone_progress} showInfo={false}/>
                                        </Col>
                                        <Col span={5} style={{display: 'flex', justifyContent:' center', alignItems: 'center'}}>
                                            {user.payment ? <strong>{user.payment}</strong> : 'N/A'}
                                            {user.payment_status ? <Tag color="orange" style=
                                            {{marginLeft:'1rem',backgroundColor: 'white', color:'black', fontSize:'11px'}}>{user.payment_status}</Tag>:null}
                                        </Col>
                                    </Row>
                                    <hr style={{margin:'1rem 0'}}/>
                                </>
                    )})  :null}
                </Collapse.Panel>
            </Collapse>
        </Wrapper>
    );
};
