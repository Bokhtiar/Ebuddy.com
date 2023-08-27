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
import SingleUserSummary from './SingleUserSummary';
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

export default function SingleDate({item}){
    return (
        <Wrapper style={{padding:'2rem 1rem'}}>
            <Timeline.Item 
                dot={
                <div style={{ textAlign:'right', padding:'1rem'}}>
                    <p><strong>{moment(item.date).format("dddd")}</strong></p>
                    <p>{item.date}</p>
                </div>
                } 
                color="black"
                position="right"
                key={item.date}
            >   
                {item?.employees?.length ? item.employees.map(employ=> <SingleUserSummary userData={employ} />) : null}
            </Timeline.Item>        
        </Wrapper>
    );
};
