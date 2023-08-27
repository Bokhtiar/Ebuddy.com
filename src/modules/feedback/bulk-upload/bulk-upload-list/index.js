import React from 'react';
import {Table, Button} from 'antd';

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
            <h2>Uploaded Files</h2>
            <Table 
                rowKey={record => record}
                dataSource={bulkUploadList?.bulkUploadList} 
                columns={columns} 
                pagination={false}
            />
        </div>
    )
}

export default BulkUploadList