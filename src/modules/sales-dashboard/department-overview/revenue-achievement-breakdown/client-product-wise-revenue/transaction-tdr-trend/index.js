import React from 'react';
import { Card, Divider } from 'antd';
import MultiLineMultiColumnChart from './multi-line-multi-column-chart';
import TransactionTable from './transaction-table';

const TransactionTDRTrend = () => {
  return (
    <Card>
      <p style={{fontWeight: 'bold', color: 'black'}}>Transaction and TDR Trend <span style={{fontWeight: 'normal'}}>(Current Week)</span></p>
      <MultiLineMultiColumnChart /> 
      <TransactionTable /> 
    </Card>
  )
}

export default TransactionTDRTrend;