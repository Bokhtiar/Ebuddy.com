import React, { useState, useEffect }  from 'react'; 

export default function DataTable({nomineeList}){

    // console.log("nomineeList>>>>>", nomineeList[0]);

    let reasonIdList = [];
    let attributeIdList = [];

    nomineeList[0].eom_reasons.forEach(item=>{
        reasonIdList.push(item.eom_reason_id)
    })

    nomineeList[0].eom_attributes.forEach(item=>{
        attributeIdList.push(item.eom_attribute_id);
    })

    reasonIdList.sort((a,b) => {
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
    });

    attributeIdList.sort((a,b) => {
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
    });


    const reasonListShow = (items, reasonItem) => {
        let dom = '';

        //filtering reasons
        if(items.eom_reasons){
            items.eom_reasons.forEach(reason =>{
                if(reasonItem === reason.eom_reason_id) { 
                    if(reasonItem === reason.eom_reason_id){
                        if(!!reason.checked) dom = <td className="t-body" key={reason.eom_reason_id} style={{backgroundColor: '#CCEDD2', color: '#588053'}}>Y</td> 
                        else dom = <td className="t-body" key={reason.eom_reason_id}></td>
                    } 
                    else dom = <td className="t-body" key={reason.eom_reason_id}></td>
                }
            }) 
        }
        return dom;
    }

    const attributeListShow = (items, attributeItem) => {
        let dom = '';

        //filtering reasons
        if(items.eom_attributes){
            items.eom_attributes.forEach(attribute =>{
                if(attributeItem === attribute.eom_attribute_id) {
                    if(attributeItem === attribute.eom_attribute_id){
                        if(attribute.score) {
                            dom = <td className="t-body" key={attribute.eom_attribute_id}>{parseInt(attribute.score)}</td>
                        }
                        else dom = <td className="t-body" key={attribute.eom_attribute_id}></td>
                    } 
                }
            }) 
        }
        return dom;
    }

    return(
        <table id="revenue-target-table">
            <thead>
                <tr>
                    <th className="t-header" colSpan="3"></th>
                    <th className="t-header bg-gray" style={{textAlign:'center'}} colSpan={nomineeList[0]?.eom_reasons?.length}>REASON</th>
                    <th className="t-header bg-gray" style={{textAlign:'center'}} colSpan={nomineeList[0]?.eom_attributes?.length}>ATTRIBUTES</th>
                    <th className="t-header" colSpan="2"></th>
                </tr>
                <tr>
                    <th className="t-header bg-gray">EMPLOYEE</th>
                    <th className="t-header bg-gray">WINGS NAME</th>
                    <th className="t-header bg-gray">KEY ACHIEVEMENT</th>
                    {nomineeList[0].eom_reasons?.map(reason => {
                        return(
                            <th className='t-header bg-gray' style={{writingMode: 'vertical-rl', transform: 'rotate(-180deg)'}} key={reason?.id}>{reason?.eom_reason_name}</th>
                        )
                    })}
                    {nomineeList[0].eom_attributes?.map(attribute => {
                        return(
                            <th className='t-header bg-gray' style={{writingMode: 'vertical-rl', transform: 'rotate(-180deg)'}} key={attribute?.id}>{attribute?.eom_attribute_name}</th>
                        )
                    })}
                    <th className='t-header bg-gray'>TOTAL MARKS</th>
                    <th className='t-header bg-gray'>SCALE</th>
                </tr>
            </thead>
            <tbody>
                {nomineeList.map(items=>{
                    return(
                        <tr>
                            <td className="t-body">{items.employee?.name}</td>
                            <td className="t-body">{items.eom_wing?.name}</td>
                            <td className="t-body">{items.key_achievement}</td>
                            {reasonIdList.map(reasonItem => reasonListShow(items, reasonItem))}
                            {attributeIdList.map(attributeItem => attributeListShow(items, attributeItem))}
                            <td className="t-body">{items.total_mark ? parseInt(items.total_mark) : 0}</td>
                            <td style={{border: 'solid 1px #CCCCCC', borderCollapse:'collapse',padding: '20px', textAlign: 'center', color: items.eom_scale?.color}}>{items.eom_scale?.name ? items.eom_scale?.name : null}</td>
                        </tr>
                    )
                })} 
            </tbody>
        </table>
    )
};
