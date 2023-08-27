import React from 'react'; 
import '../../../../styles/report.scss';
// import UserInfoTable from './UserInfoTable';
import moment from "moment";

export default function DataTable({data,issueTypeList}){

    const issueWisePriority = (dataItem, issueListKey) =>{
        if(issueListKey.id === dataItem.issue_type?.id){
            if(dataItem.priority === 'BLOCKER') return 4;
            else if(dataItem.priority === 'CRITICAL') return 3;
            else if(dataItem.priority === 'MAJOR') return 2;
            else return 1;
        }
        else return null;
    }

    const IssueWiseStyle = (dataItem, issueListKey) =>{
        if(issueListKey.id === dataItem.issue_type?.id){
            if(dataItem.priority === 'BLOCKER') return 'issue-color-blocker';
            else if(dataItem.priority === 'CRITICAL') return 'issue-color-critical';
            else if(dataItem.priority === 'MAJOR') return 'issue-color-major';
            else return 'issue-color-minor';
        }
        else return null;
    }

    const statusColor = (status) =>{
        if(status === 'OPEN') return 't-body status-color-open';
        if(status === 'WIP') return 't-body status-color-wip';
        if(status === 'CLOSED') return 't-body status-color-closed';
    }

    const remainingDaysColor = (date, status) =>{
        if(status === 'CLOSED') return 't-body';
        else if(moment(date) < moment()) return 't-body status-color-open';
        else return 't-body status-color-closed';
    }

    return(
        <>
        <table id="data-table px-3">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className='t-header' style={{textAlign :'center'}} colspan={issueTypeList?.length * 1}>ISSUE TYPE</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th className="t-header ">ISSUES/ACTIVITY</th>
                    <th className="t-header ">ASSIGNEE</th>
                    <th className="t-header ">DEPENDENCY</th>
                    {issueTypeList?.map(key =>{
                        return(
                            <th className='t-header' style={{writingMode: 'vertical-rl', transform: 'rotate(-180deg)'}}>{key.name}</th>
                        )
                    })}
                    <th className='t-header'>ISSUED BY</th>
                    <th className='t-header'>REPORTED DATE</th>
                    <th className='t-header'>EXP DUE DATE</th>
                    <th className='t-header'>DAY'S REMAIN</th>
                    <th className='t-header'>CLOSED DATE</th>
                    <th className='t-header'>AGE</th>
                    <th className='t-header'>STATUS</th>
                </tr>
            </thead>
            <tbody>
            {data.map(item=>{
                    return(
                <tr>
                    <td className='t-body'>{item.title}</td>
                    <td className='t-body'>{item.assignee?.name ? item.assignee?.name : ''}</td>
                    <td className='t-body'>{Array.prototype.map.call(item?.parent_issues, function(item) { return item.title; }).join(",")}</td>
                    {issueTypeList?.map(key =>{
                        return(
                            <td className={IssueWiseStyle(item, key)} style={{border: 'solid 1px #CCCCCC',borderCollapse:'collapse',padding: '5px',textAlign: 'center',color: '#7E7E7E',fontSize: '11px'}}>{issueWisePriority(item, key)}</td>
                        )
                    })}
                    <td className='t-body'>{item.issued_by?.name ? item.issued_by?.name : ''}</td>
                    <td className='t-body'>{item.reported_date ? moment(item?.reported_date).format('YYYY-MM-DD') : ''}</td>
                    <td className='t-body'>{item?.due_date ? moment(item?.due_date).format('YYYY-MM-DD') : ''}</td>
                    {/* <td className={remainingDaysColor(item.due_date)}>{item?.due_date ? moment(item?.due_date).from(moment().format('YYYY-MM-DD')) : ''}</td> */}
                    <td className={remainingDaysColor(item.due_date, item.status)}>{item.status === 'CLOSED' ? '' : item?.due_date ? moment(item?.due_date).diff(moment(), 'days') + ' days': ''}</td>
                    <td className='t-body'>{item?.complete_date ? moment(item?.complete_date).format('YYYY-MM-DD') : ''}</td>
                    {/* <td className='t-body'>{item?.reported_date ? moment(item?.reported_date).from(moment().format('YYYY-MM-DD')) : ''}</td> */}
                    <td className='t-body'>{item.status === 'CLOSED' ? '' : item?.reported_date ? moment(item?.reported_date).diff(moment(), 'days') + ' days': ''}</td>
                    <td className={statusColor(item.status)}>{item.status ? item.status : ''}</td>
                </tr>
            )})}
            </tbody>
        </table>
        </>
    )
};
