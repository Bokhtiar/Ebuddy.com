import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import FinancialRevenueHighlight from './financial-revenue-highlight';
import RunRateOverview from './run-rate-overview';

const DepartmentWiseOverview = ({data, year}) => {
  const [totalTarget, setTotalTarget] = useState();
  useEffect(()=>{
    if(data){
      let currentYearTarget = 0;
      data.runRate.forEach(item => {
        currentYearTarget += parseFloat(item.monthly_target);
      });
      setTotalTarget(currentYearTarget);
    }
  },[data]);

  return (
    <div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '1rem'}}>
            <p style={{fontSize:'30px', margin: 0, fontWeight: 'bold', color: 'black'}}>TARGET - {year}</p>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <p style={{color: '#0184E6', fontSize:'40px', margin: 0}}>
              <strong>{totalTarget ? totalTarget.toFixed(2) : 0} BDT</strong>
            </p>
        </div>
        <Row gutter={16} style={{display: 'flex', justifyContent:'center', alignItems:'center', margin: '1rem'}}>
          <Col span={12}>
            <FinancialRevenueHighlight data={data?.runRate}/>
          </Col>
          <Col span={12}>
            <RunRateOverview data={data?.runRate}/>
          </Col>
        </Row>
    </div>
  )
}

export default DepartmentWiseOverview