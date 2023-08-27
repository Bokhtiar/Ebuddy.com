import React from 'react'; 
import '../../../styles/report.scss';

const calculateTotal = (row, value) =>{
    let sum = 0;
    Object.values(row.dates).forEach(element => {
        if(value === 'Satisfied') sum+= element.S
        if(value === 'Helped') sum+= element.H
        if(value === 'Unsatisfied') sum+= element.U
        if(value === 'Not Reviewed') sum+= element.N
    });
    if(sum > 0) return sum; 
    else return 0;
}

const calculateTotalPercenetage = (row, value) =>{
    let singleElementSum = 0;
    let totalSum = 0;
    let percent = 0;
    Object.values(row.dates).forEach(element => {
        if(value === 'Satisfied') singleElementSum+= element.S
        if(value === 'Helped') singleElementSum+= element.H
        if(value === 'Unsatisfied') singleElementSum+= element.U
        if(value === 'Not Reviewed') singleElementSum+= element.N
    });

    Object.values(row.dates).forEach(element => totalSum += element.S + element.H + element.U + element.N)
    
    if(totalSum > 0) return percent = parseInt((singleElementSum/totalSum) * 100) + '%';
    else return 0;
}

const dynamicHeaderColor = (key) =>{
    if(key === 'S') return 't-header bg-gray s-head';
    if(key === 'H') return 't-header bg-gray h-head';
    if(key === 'U') return 't-header bg-gray u-head';
    if(key === 'N') return 't-header bg-gray n-head';
}

const dynamicDataBackgroundColor = (key) => {
    if(key === 'S') return 't-body single-satisfied';
    if(key === 'H') return 't-body single-helped';
    if(key === 'U') return 't-body single-unsatisfied';
    if(key === 'N') return 't-body single-not-reviewed';
}

const showDateView = (item) => {
    if (item && Object.keys(item.dates).length !== 0) {
        let entries = Object.entries(item.dates);
        if (Object.keys(entries).length !== 0) {
            return entries.map((ite, i) => {
               if (ite[1]) {
                return Object.keys(ite[1]).map(key =>{
                    return(
                        <>
                        {console.log("ite[1][key]>>>>>>", ite[1][key])}
                            <td className={ite[1][key] ? dynamicDataBackgroundColor(key) : 't-body'}>{ite[1][key] ? ite[1][key] : ''}</td>
                        </>
                    )
                })
               }
           })
        }
    }
};

export default function DataTable({data}){
    return(
        <table id="data-table px-5">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className='bg-gray t-header'>Date</th>
                    {data[0].dates && Object.keys(data[0].dates).map(item=>{
                        return(
                            <th colspan="4" className="t-header" style={{fontSize: "11px"}}>{item}</th>
                        )
                    })}
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
                    <th className="t-header ">SL</th>
                    <th className="t-header ">Department</th>
                    <th className="t-header ">Employee Name</th>
                    <th className="t-header ">Supervisor Name</th>
                    <th className="t-header ">Emp ID</th>
                    {Object.entries(data[0].dates).map(item=>Object.keys(item[1]).map(key =>{
                        return(
                            <th className={dynamicHeaderColor(key)}>{key}</th>
                        )
                    }))}
                    <th className='t-header bg-gray total-satisfied'>Total Satisfied</th>
                    <th className='t-header bg-gray total-helped'>Total Helped</th>
                    <th className='t-header bg-gray total-unsatisfied'>Total Unsatisfied</th>
                    <th className='t-header bg-gray total-not-reviewed'>Total Not Reviewed</th>
                    <th className='t-header h-percent-satisfied'>% of Satisfied</th>
                    <th className='t-header h-percent-helped'>% of Helped</th>
                    <th className='t-header h-percent-unsatisfied'>% of Unsatisfied</th>
                    <th className='t-header h-percent-notreviewed'>% of Not Reviewed</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item=>{
                    return(
                        <tr className="task-summary-report">
                            <td className="t-body">{data.indexOf(item) + 1}</td>
                            <td className="t-body">{item['Department']}</td>
                            <td className="t-body">{item['Employee Name']}</td>
                            <td className="t-body">{item['Supervisor Name']}</td>
                            <td className="t-body">{item['Emp ID']}</td>
                            {
                                showDateView(item)
                            }
                {/* {item && Object.keys(item.dates).length !== 0 ? Object.entries(item.dates).map((item, i)=>Object.keys(item[i + 1]).map(key =>{
                    return(
                        <td className={dynamicDataBackgroundColor(key)}>{item[1][key]}</td>
                    )
                })) : null} */}
                            <td className={calculateTotal(item, 'Satisfied') ? "t-body b-total-Satisfied" : 't-body'}>{calculateTotal(item, 'Satisfied') || ''}</td>
                            <td className={calculateTotal(item, 'Helped') ? "t-body b-total-Helped" : 't-body'}>{calculateTotal(item, 'Helped') || ''}</td>
                            <td className={calculateTotal(item, 'Unsatisfied') ? "t-body b-total-Unsatisfied" : 't-body'}>{calculateTotal(item, 'Unsatisfied') || ''}</td>
                            <td className={calculateTotal(item, 'Not Reviewed') ? "t-body b-total-Not-Reviewed" : 't-body'}>{calculateTotal(item, 'Not Reviewed') || ''}</td>
                            <td className={calculateTotalPercenetage(item, 'Satisfied') ? 't-body percent-satisfied' : 't-body'}>
                                {calculateTotalPercenetage(item, 'Satisfied') || ''}
                            </td>
                            <td className={calculateTotalPercenetage(item, 'Satisfied') ? 't-body percent-helped' : 't-body'}>
                                {calculateTotalPercenetage(item, 'Helped') || ''}
                            </td>
                            <td className={calculateTotalPercenetage(item, 'Satisfied') ? 't-body percent-unsatisfied' : 't-body'}>
                                {calculateTotalPercenetage(item, 'Unsatisfied') || ''}
                            </td>
                            <td className={calculateTotalPercenetage(item, 'Satisfied') ? 't-body percent-notreviewed' : 't-body'}>
                                {calculateTotalPercenetage(item, 'Not Reviewed') || ''}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
};
