import React from 'react';
import {Table, Button} from 'antd';
import { dateFormat } from "../../../../scripts/helper";

const BulkUploadList = (bulkUploadList) => {

    const columns = [
        {
          title: 'Response',
          key: 'response',
          render: (row)=> row
        }
    ];
    

    return (
        <div style={{margin: "7rem 2rem"}}>
            {console.log("bulkUploadList>>>>>>>>", bulkUploadList)}
            <h2>Uploaded Files</h2>
            <Table 
                rowKey={record => record}
                dataSource={bulkUploadList?.bulkUploadList?.msg} 
                columns={columns} 
                pagination={false}
            />
        </div>
    )
}

export default BulkUploadList