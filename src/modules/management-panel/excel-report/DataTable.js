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
    return sum; 
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
    else return 0 + '%';
}

const dynamicHeaderColor = (key) =>{
    if(key === 'S') return 't-header bg-gray total-satisfied';
    if(key === 'H') return 't-header bg-gray total-helped';
    if(key === 'U') return 't-header bg-gray total-unsatisfied';
    if(key === 'N') return 't-header bg-gray total-not-reviewed';
}

const dynamicDataBackgroundColor = (key) =>{
    if(key === 'S') return 't-body single-satisfied';
    if(key === 'H') return 't-body single-helped';
    if(key === 'U') return 't-body single-unsatisfied';
    if(key === 'N') return 't-body single-not-reviewed';
}

export default function DataTable({data}){
    return(
        <table id="data-table">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className='bg-gray t-header'>Date</th>
                    {Object.keys(data[0].dates).map(item=>{
                        return(
                            <th colspan="4" className="bg-dark-yellow t-header">{item}</th>
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
                    <th className="t-header bg-dark-yellow">SL</th>
                    <th className="t-header bg-dark-yellow">Department</th>
                    <th className="t-header bg-dark-yellow">Employee Name</th>
                    <th className="t-header bg-dark-yellow">Supervisor Name</th>
                    <th className="t-header bg-dark-yellow">Emp ID</th>
                    {Object.entries(data[0].dates).map(item=>Object.keys(item[1]).map(key =>{
                        return(
                            <th className={dynamicHeaderColor(key)}>{key}</th>
                        )
                    }))}
                    <th className='t-header bg-gray total-satisfied'>Total Satisfied</th>
                    <th className='t-header bg-gray total-helped'>Total Helped</th>
                    <th className='t-header bg-gray total-unsatisfied'>Total Unsatisfied</th>
                    <th className='t-header bg-gray total-not-reviewed'>Total Not Reviewed</th>
                    <th className='t-header percent-satisfied'>% of Satisfied</th>
                    <th className='t-header percent-helped'>% of Helped</th>
                    <th className='t-header percent-unsatisfied'>% of Unsatisfied</th>
                    <th className='t-header percent-not-reviewed'>% of Not Reviewed</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item=>{
                    return(
                        <tr>
                            <td className="t-body">{data.indexOf(item) + 1}</td>
                            <td className="t-body">{item['Department']}</td>
                            <td className="t-body">{item['Employee Name']}</td>
                            <td className="t-body">{item['Supervisor Name']}</td>
                            <td className="t-body">{item['Emp ID']}</td>
                            {Object.entries(data[0].dates).map(item=>Object.keys(item[1]).map(key =>{
                                return(
                                    <td className={dynamicDataBackgroundColor(key)}>{item[1][key]}</td>
                                )
                            }))}
                            <td className="t-body">{calculateTotal(item, 'Satisfied')}</td>
                            <td className="t-body">{calculateTotal(item, 'Helped')}</td>
                            <td className="t-body">{calculateTotal(item, 'Unsatisfied')}</td>
                            <td className="t-body">{calculateTotal(item, 'Not Reviewed')}</td>
                            <td className="t-body total-satisfied">{calculateTotalPercenetage(item, 'Satisfied')}</td>
                            <td className="t-body total-satisfied">{calculateTotalPercenetage(item, 'Helped')}</td>
                            <td className="t-body total-unsatisfied">{calculateTotalPercenetage(item, 'Unsatisfied')}</td>
                            <td className="t-body total-unsatisfied">{calculateTotalPercenetage(item, 'Not Reviewed')}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
};
