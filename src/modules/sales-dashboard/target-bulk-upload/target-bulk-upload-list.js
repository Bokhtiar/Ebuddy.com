import React from 'react';
import {Table, Button} from 'antd';
import { dateFormat } from "../../../scripts/helper";

const TargetBulkUploadList = (targetBulkUploadList) => {

    const columns = [
        {
          title: 'Response',
          key: 'response',
          render: (row)=> row
        }
    ];
    

    return (
        <div style={{margin: "7rem 2rem"}}>
            <h2>Uploaded Files</h2>
            <Table 
                rowKey={record => record}
                dataSource={targetBulkUploadList?.targetBulkUploadList} 
                columns={columns} 
                pagination={false}
            />
        </div>
    )
}

export default TargetBulkUploadList