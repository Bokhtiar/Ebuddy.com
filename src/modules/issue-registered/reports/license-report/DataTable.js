import React from 'react'; 
import '../../../../styles/report.scss';
// import UserInfoTable from './UserInfoTable';
import moment from "moment";

export default function DataTable({data,licenseTypeList}){

    const licenseWisePriority = (dataItem, licenseListKey) =>{
        if(licenseListKey.id === dataItem.license_type?.id){
            if(dataItem.priority === 'BLOCKER') return 4;
            else if(dataItem.priority === 'CRITICAL') return 3;
            else if(dataItem.priority === 'MAJOR') return 2;
            else return 1;
        }
        else return null;
    }

    const licenseWiseStyle = (dataItem, licenseListKey) =>{
        if(licenseListKey.id === dataItem.license_type?.id){
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

    const remainingDaysColor = (date,status) =>{
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
                    <th className='t-header' style={{textAlign :'center'}} colspan={licenseTypeList?.length * 1}>LICENSE TYPE</th>
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
                    <th className='t-header'>ISSUED BY</th>
                    <th className="t-header ">DEPENDENCY</th>
                    {licenseTypeList?.map(key =>{
                        return(
                            <th className='t-header' style={{writingMode: 'vertical-rl', transform: 'rotate(-180deg)'}}>{key.name}</th>
                        )
                    })}
                    <th className="t-header ">ASSIGNEE</th>
                    <th className='t-header'>ISSUE DATE</th>
                    <th className='t-header'>Valid DATE</th>
                    <th className='t-header'>DAY'S REMAIN</th>
                    <th className='t-header'>NEW RENEWAL DATE</th>
                    <th className='t-header'>AGE</th>
                    <th className='t-header'>STATUS</th>
                </tr>
            </thead>
            <tbody>
            {data.map(item=>{
                    return(
                <tr>
                    <td className='t-body'>{item.title}</td>
                    <td className='t-body'>{item.license_issuer?.name ? item.license_issuer?.name : ''}</td>
                    <td className='t-body'>{Array.prototype.map.call(item?.parent_license, function(item) { return item.title; }).join(",")}</td>
                    {licenseTypeList?.map(key =>{
                        return(
                            <td className={licenseWiseStyle(item, key)} style={{border: 'solid 1px #CCCCCC',borderCollapse:'collapse',padding: '5px',textAlign: 'center',color: '#7E7E7E',fontSize: '11px'}}>{licenseWisePriority(item, key)}</td>
                        )
                    })}
                    <td className='t-body'>{item.assignee?.name ? item.assignee?.name : ''}</td>
                    <td className='t-body'>{item.issue_date ? moment(item?.issue_date).format('YYYY-MM-DD') : ''}</td>
                    <td className='t-body'>{item?.expire_date ? moment(item?.expire_date).format('YYYY-MM-DD') : ''}</td>
                    {/* <td className={remainingDaysColor(item.expire_date)}>{item?.expire_date ? moment(item?.expire_date).from(moment().format('YYYY-MM-DD')) : ''}</td> */}
                    <td className={remainingDaysColor(item.expire_date, item.status)}>{item.status === 'CLOSED' ? '' : item?.expire_date ? moment(item?.expire_date).diff(moment(), 'days') + ' days': ''}</td>
                    <td className='t-body'>{item?.renewal_date ? moment(item?.renewal_date).format('YYYY-MM-DD') : ''}</td>
                    {/* <td className='t-body'>{item?.issue_date ? moment(item?.issue_date).from(moment().format('YYYY-MM-DD')) : ''}</td> */}
                    <td className='t-body'>{item.status === 'CLOSED' ? '' : item?.issue_date ? moment(item?.issue_date).diff(moment(), 'days') + ' days': ''}</td>
                    <td className={statusColor(item.status)}>{item.status ? item.status : ''}</td>
                </tr>
            )})}
            </tbody>
        </table>
        </>
    )
};
