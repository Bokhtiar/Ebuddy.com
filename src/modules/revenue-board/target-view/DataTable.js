import React from 'react'; 
import '../../../styles/revenue_target.scss';

const caculateTotal = (items, name) =>{
    let totalTarget = 0;
    let totalAchievement = 0;
    let totalPercentage = 0;

    if (items) {
        items.map(item=>item.servises.map(key=> totalTarget += key.t));
        items.map(item=>item.servises.map(key=> totalAchievement += key.a));
        items.map(item=>item.servises.map(key=> totalPercentage += key.p));
    }

    if(name === "T") return parseInt(totalTarget);
    else return parseInt(totalPercentage) + '%';
}

const caculateTotalServiceWiseForOTC = (items, key, name) =>{
    let totalTarget = 0;
    let totalAchievement = 0;
    let totalPercentage = 0;

    items.forEach(item => {
        if (item.OTC) {
            item.OTC.forEach(otc => {
                if (otc.servises) {
                    otc.servises.forEach(ser => {
                        if(ser.label === key.full_name){
                            totalTarget = totalTarget + ser.t;
                            totalAchievement = totalAchievement + ser.a;
                            totalPercentage = totalPercentage + ser.p;
                        }
                    })
                }
            })
        }
    })

    if(name === "T") return Math.round(totalTarget);
    else return  Math.round(totalPercentage) + '%';
}

const caculateTotalServiceWiseForMRC = (items, key, name) =>{
    let totalTarget = 0;
    let totalAchievement = 0;
    let totalPercentage = 0;

    items.forEach(item => {
        if (item['MRC/AMC']) {
            item['MRC/AMC'].forEach(mrc => {
                if (mrc.servises) {
                    mrc.servises.forEach(ser => {
                        if(ser.label === key.full_name){
                            totalTarget = totalTarget + ser.t;
                            totalAchievement = totalAchievement + ser.a;
                            totalPercentage = totalPercentage + ser.p;
                        }
                    })
                }
            })
        }
    })

    if(name === "T") return Math.round(totalTarget);
    else return  Math.round(totalPercentage) + '%';
}

const totalServiceWiseOTCValue = (items, name) =>{

    let t = 0;
    let a = 0;
    let p = 0;

    items.forEach(item => {
        if (item.OTC) {
            item.OTC.forEach(otc => {
                if (otc.servises) {
                    otc.servises.forEach(ser => {
                        t = t + ser.t;
                        a = a + ser.a;
                        p = p + ser.p;
                    })
                }
            })
        }
    })

    if(name === "T") return parseInt(t);
    else return parseInt(p) + '%';
}

const totalServiceWiseMRCValue = (items, name, color) =>{

    let t = 0;
    let a = 0;
    let p = 0;

    items.forEach(item => {
        if (item['MRC/AMC']) {
            item['MRC/AMC'].forEach(mrc => {
                if (mrc.servises) {
                    mrc.servises.forEach(ser => {
                        t = t + ser.t;
                        a = a + ser.a;
                        p = p + ser.p;
                    })
                }
            })
        }
    })

    if(name === "T") return parseInt(t);
    else return parseInt(p) + '%';
}


export default function DataTable({data}){
    return(
        <table id="revenue-target-table">
            <thead>
                <tr>
                    <th colSpan="4"></th>
                    {data.serviceTypes.map(item=>{
                        return(
                            <th className="t-header bg-gray" style={{textAlign:'center'}} colSpan={item.services.length}>{item.name.toUpperCase()}</th>
                        )
                    })}
                </tr>
                <tr>
                    <th className="t-header bg-gray">KAM NAME</th>
                    <th className="t-header bg-gray">CLIENT NAME</th>
                    <th className="t-header bg-gray">INDUSTRY</th>
                    <th className="t-header bg-gray"></th>
                    {data.serviceTypes.map(item=>item.services.map(key =>{
                        return(
                            <th className='t-header bg-gray'>{key.full_name.toUpperCase()}</th>
                        )
                    }))}
                    <th className='t-header bg-gray'>TOTAL</th>
                </tr>
            </thead>
            <tbody>
                {data.target_data.map(items=>{
                    return(
                        <>
                        <tr>
                            <td className="t-body" rowSpan="2">{items.kam_name}</td>
                            <td className="t-body" rowSpan="2">{items.client_name}</td>
                            <td className="t-body" rowSpan="2">{items.industry_type}</td>
                            <td className="t-body">OTC</td>
                            {items?.OTC?.length ? items?.OTC.map(item=>item.servises.map(key =>{
                                return <td className="t-body">{key.t ? key.t : ''}</td>
                            })) : ''} 
                            <td className="t-body">{caculateTotal(items.OTC, "T")}</td>
                        </tr>
                        <tr>
                            <td className="t-body">MRC/AMC</td>
                            {items['MRC/AMC']?.length ? items['MRC/AMC'].map(item=>item.servises.map(key =>{
                                return <td className="t-body bg-gray-mrc">{key.t ? key.t : ''}</td>
                            })) : ''}
                            <td className="t-body">{caculateTotal(items['MRC/AMC'], "T")}</td>
                        </tr>
                        </>
                    )
                })} 
                <tr>
                    <td className="t-body grand-total" style={{textAlign:'center'}} colSpan="3" rowSpan="2"><strong>Total Value</strong></td>
                    <td className="t-body">OTC</td>
                    {data?.serviceTypes?.map(items=> items.services.map(key =>{
                        return <td className="t-body grand-total">{caculateTotalServiceWiseForOTC(data.target_data, key, "T") === 0 ? '' : caculateTotalServiceWiseForOTC(data.target_data, key, "T")}</td>
                    }))}
                    <td className="t-body grand-total">{totalServiceWiseOTCValue(data.target_data, "T")}</td>
                </tr>
                <tr>
                    <td className="t-body">MRC/AMC</td>
                    {data?.serviceTypes?.map(items=> items.services.map(key =>{
                        return <td className="t-body bg-gray-mrc grand-total">{caculateTotalServiceWiseForMRC(data.target_data, key, "T") === 0 ? '' : caculateTotalServiceWiseForMRC(data.target_data, key, "T")}</td>
                    }))}
                    <td className="t-body grand-total">{totalServiceWiseMRCValue(data.target_data, "T")}</td>
                </tr>
            </tbody>
        </table>
    )
};
