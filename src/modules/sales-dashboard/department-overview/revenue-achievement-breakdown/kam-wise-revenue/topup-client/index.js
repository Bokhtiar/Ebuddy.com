import React, {useState, useEffect} from 'react';
import { Card } from 'antd';
import PieChartWithAction from './pie-chart-with-action';

const TopupClient = ({pieChartData}) => {
  const [data, setData] = useState();

  useEffect(()=>{
    if(pieChartData){
      let resultData = [];
      if(pieChartData.topTenTopUpClient){
        pieChartData.topTenTopUpClient.forEach(item=>{
          resultData.push({
            "type": item.client_name,
            "value": parseInt(item.total),
          })
        })
      }
      setData(resultData);
    }
  },[pieChartData]);

  return (
    <Card 
        title="Top 10 Topup Client" 
        // extra={<a href="#">View Details</a>} 
        headStyle={{backgroundColor: '#E5F3FC', border: '1px solid #0184E6'}}
    >
      {data && data?.length ? <PieChartWithAction pieChartData={data}/> : null}
    </Card>
  )
}

export default TopupClient;
