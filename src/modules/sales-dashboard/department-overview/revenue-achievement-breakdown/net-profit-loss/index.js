import React from 'react';
import { Row, Col, Card } from 'antd';
import ColumnChart from './column-chart';


const NetProfitLoss = () => {
  return (
    <div>
        <Row className="m-4">
            <Col span={24}>
                <Card 
                    title="NET PROFIT / LOSS (BDT)" 
                    headStyle={{backgroundColor:'#0184E6', textAlign: 'center', color:'white', fontWeight: 700}}
                    >
                    <ColumnChart />
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default NetProfitLoss;