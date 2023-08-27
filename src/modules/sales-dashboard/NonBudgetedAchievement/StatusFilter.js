import React from 'react';
import { Radio, Select, Space } from 'antd';
import { useState } from 'react';

const StatusFilter = ({
  setSearchQuery
}) => {
  const handleSizeChange = (e) => {
    console.log(e.target.value);
    setSearchQuery({key: 'status', value: e.target.value});
  };
  return (
    <>
      <Radio.Group onChange={handleSizeChange}>
        <Radio.Button value="Success">Success</Radio.Button>
        <Radio.Button value="Failed">Failed</Radio.Button>
      </Radio.Group>
    </>
  );
}

export default StatusFilter;

