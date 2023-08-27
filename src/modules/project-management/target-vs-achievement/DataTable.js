import React from 'react'; 
import '../../../styles/target_vs_achievement.scss';

const caculateTotal = (items, name) =>{
    let totalTarget = 0;
    let totalAchievement = 0;
    let totalPercentage = 0;

    if (items?.length) {
        items.map(item=>item.servises.map(key=> totalTarget += key.t));
        items.map(item=>item.servises.map(key=> totalAchievement += key.a));
        items.map(item=>item.servises.map(key=> totalPercentage += key.p));    
    }
    
    if(name === "T") return parseInt(totalTarget) + '/';
    if(name === "A") return parseInt(totalAchievement);
    else return Math.round(totalPercentage) + '%';
}

const caculateGrandTotal = (items, name) =>{
    let totalTarget = 0;
    let totalAchievement = 0;
    let totalPercentage = 0;

    //target
    if (items?.OTC?.length) items.OTC.map(item=>item.servises.map(key=> totalTarget += key.t));
    if (items['MRC/AMC']?.length) items['MRC/AMC'].map(item=>item.servises.map(key=> totalTarget += key.t));
    //achievement
    if (items?.OTC?.length)  items.OTC.map(item=>item.servises.map(key=> totalAchievement += key.a));
    if (items['MRC/AMC']?.length) items['MRC/AMC'].map(item=>item.servises.map(key=> totalAchievement += key.a));
    //percentage
    if (items?.OTC?.length)  items.OTC.map(item=>item.servises.map(key=> totalPercentage += key.p));
    if (items['MRC/AMC']?.length) items['MRC/AMC'].map(item=>item.servises.map(key=> totalPercentage += key.p));

    if(name === "target") return parseInt(totalTarget);
    if(name === "achievement") return parseInt(totalAchievement);
    if(name === "percentage") return Math.round(totalPercentage/2) + '%';
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

    if(name === "T/A") return Math.round(totalTarget) + '/' +  Math.round(totalAchievement);
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

    if(name === "T/A") return Math.round(totalTarget) + '/' +  Math.round(totalAchievement);
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
                        // p = p + ser.p;
                    })
                }
            })
        }
    })
    p = Math.round((a/t) * 100);

    if(name === "T") return parseInt(t) + '/';
    if(name === "A") return parseInt(a);
    else return p + '%';
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
                        // p = p + ser.p;
                    })
                }
            })
        }
    })

    p = Math.round((a/t) * 100);

    if(name === "T") return parseInt(t) + '/';
    if(name === "A") return parseInt(a);
    else return p + '%';
}

const grandTotalServiceWiseMRCValue = (items, name) =>{

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
                        // p = p + ser.p;
                    })
                }
            })
        }
    });

    items.forEach(item => {
        if (item['MRC/AMC']) {
            item['MRC/AMC'].forEach(mrc => {
                if (mrc.servises) {
                    mrc.servises.forEach(ser => {
                        t = t + ser.t;
                        a = a + ser.a;
                        // p = p + ser.p;
                    })
                }
            })
        }
    });

    p = Math.round((a/t) * 100);

    if(name === "target") return parseInt(t);
    if(name === "achievement") return parseInt(a);
    if(name === "percentage") return Math.round(p) + '%';
}

export default function DataTable({data}){
    return(
        <table id="target-table">
            <thead>
                <tr>
                    <th className="t-header" colSpan="4"></th>
                    {data.serviceTypes.map(item=>{
                        return(
                            <th className="t-header bg-gray" style={{textAlign:'center'}} colSpan={item.services.length * 2}>{item.name.toUpperCase()}</th>
                        )
                    })}
                    <th className="t-header" colSpan="5"></th>
                </tr>
                <tr>
                    <th className="t-header bg-gray">KAM NAME</th>
                    <th className="t-header bg-gray">CLIENT NAME</th>
                    <th className="t-header bg-gray">INDUSTRY</th>
                    <th></th>
                    {data.serviceTypes.map(item=>item.services.map(key =>{
                        return(
                            <th className='t-header bg-gray' colSpan="2">{key.full_name.toUpperCase()}</th>
                        )
                    }))}
                    <th className='t-header bg-gray' colSpan="2">TOTAL</th>
                    <th className='t-header bg-gray' colSpan="3">GRAND TOTAL</th>
                </tr>
                <tr> 
                    <th className='t-header'></th>
                    <th className='t-header'></th>
                    <th className='t-header'></th>
                    <th className='t-header'></th>
                    {data.serviceTypes.map(item=>item.services.map(key =>{
                        return(
                            <>
                                <th className='t-header '><small>T/A</small></th>
                                <th className='t-header '><small>%</small></th>
                            </>
                        )
                    }))}
                    <th className='t-header '><small>T/A</small></th>
                    <th className='t-header '><small>%</small></th>
                    <th className='t-header '><small>Grand Target</small></th>
                    <th className='t-header '><small>Grand Achievement</small></th>
                    <th className='t-header '><small>Progress</small></th>
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
                            { items?.OTC?.length ? items.OTC.map(item=>item.servises.map(key =>{
                                return(
                                    <>
                                        <td className="t-body">{key.t}/<span className='achievement'>{key.a}</span></td>
                                        <td className="t-body percentage">{Math.round(key.p)}%</td>
                                    </>
                                )
                            })) : '' } 
                            <td className="t-body">{caculateTotal(items.OTC, "T")}<span className='achievement'>{caculateTotal(items.OTC, "A")}</span></td>
                            <td className="t-body percentage">{caculateTotal(items.OTC, "percentage")}</td>
                            <td className="t-body achievement" rowSpan="2">{caculateGrandTotal(items, "target")}</td>
                            <td className="t-body achievement" rowSpan="2">{caculateGrandTotal(items, "achievement")}</td>
                            <td className="t-body progress" rowSpan="2">{caculateGrandTotal(items, "percentage")}</td>
                        </tr>
                        <tr>
                            <td className="t-body">MRC/AMC</td>
                            {items['MRC/AMC']?.length ? items['MRC/AMC'].map(item=>item.servises.map(key =>{
                                return(
                                    <>
                                        <td className="t-body bg-gray-mrc">{key.t}/<span className='achievement'>{key.a}</span></td>
                                        <td className="t-body bg-gray-mrc percentage">{Math.round(key.p)}%</td>
                                    </>
                                )
                            })) : ''}
                            <td className="t-body">{caculateTotal(items['MRC/AMC'], "T")}<span className='achievement'>{caculateTotal(items['MRC/AMC'], "A")}</span></td>
                            <td className="t-body percentage">{caculateTotal(items['MRC/AMC'], "percentage")}</td>
                        </tr>
                        </>
                    )
                })} 
                <tr>
                    <td className="t-body grand-total" style={{textAlign:'center'}} colSpan="3" rowSpan="2"><strong>Total Value</strong></td>
                    <td className="t-body">OTC</td>
                    {data?.serviceTypes?.map(items=> items.services.map(key =>{
                        return(
                            <>
                                <td className="t-body">{caculateTotalServiceWiseForOTC(data.target_data, key, "T/A")}</td>
                                <td className="t-body percentage">{caculateTotalServiceWiseForOTC(data.target_data, key, "percentage")}</td>
                            </>
                        )
                    }))}
                    <td className="t-body">{totalServiceWiseOTCValue(data.target_data, "T")}<span className='achievement'>{totalServiceWiseOTCValue(data.target_data, "A")}</span></td>
                    <td className="t-body percentage">{totalServiceWiseOTCValue(data.target_data, "percentage")}</td>
                    <td className="t-body grand-total" rowSpan="2"><strong>{grandTotalServiceWiseMRCValue(data.target_data, "target")}</strong></td>
                    <td className="t-body grand-total" rowSpan="2"><strong>{grandTotalServiceWiseMRCValue(data.target_data, "achievement")}</strong></td>
                    <td className="t-body progress" rowSpan="2"><strong>{grandTotalServiceWiseMRCValue(data.target_data, "percentage")}</strong></td>
                </tr>
                <tr>
                    <td className="t-body">MRC/AMC</td>
                    {data?.serviceTypes?.map(items=> items.services.map(key =>{
                        return(
                            <>
                                <td className="t-body bg-gray-mrc">{caculateTotalServiceWiseForMRC(data.target_data, key, "T/A")}</td>
                                <td className="t-body bg-gray-mrc percentage">{caculateTotalServiceWiseForMRC(data.target_data, key, "percentage")}</td>
                            </>
                        )
                    }))}
                    <td className="t-body">{totalServiceWiseMRCValue(data.target_data, "T")}<span className='achievement'>{totalServiceWiseMRCValue(data.target_data, "A")}</span></td>
                    <td className="t-body percentage">{totalServiceWiseMRCValue(data.target_data, "percentage")}</td>
                </tr>
            </tbody>
        </table>
    )
};
