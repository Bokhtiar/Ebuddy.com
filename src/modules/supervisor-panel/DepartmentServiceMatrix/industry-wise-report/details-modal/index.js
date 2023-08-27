import React from 'react';
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox } from "antd";

const DetailsModal = ({data}) => {
    const columns = [
        {
          title: "Client Name",
          dataIndex: "client_name",
          key: "client_name"
        },
        {
          title: "Industry Name",
          dataIndex: "industry_name",
          key: "industry_name"
        },
        {
          title: "Service Name",
          dataIndex: "service_name",
          key: "service_name"
        },
        {
          title: "Synergy",
          key: "synergy",
          render: row => row?.synergy === 'O' ? 'Onboarded' : 'Potential'
        },
    ];

  return (
    <div>
        {console.log("data>>>>>>>>>", data)}
        <Table 
            rowKey={(record) => record?.id}
            scroll={{ y: '100vh'}}  
            dataSource={data} 
            columns={columns} 
            // pagination={{
            // current: currentPage,
            // total: pageCount * 10,
            // onChange: (page) => paginate(page),
            // }}
        />
    </div>
  )
}

export default DetailsModal