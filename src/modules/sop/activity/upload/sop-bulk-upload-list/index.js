import React from 'react';
import {Table, Button} from 'antd';
import { dateFormat } from "../../../../../scripts/helper";

const SOPBulkUploadList = (props) => {
    const {sopBulkUploadList, currentPage, pageCount, setCurrentPage} = props;

    const columns = [,
        {
          title: 'Response',
          key: 'imported_path',
          render: (row)=> <span dangerouslySetInnerHTML={{__html:row?.import_response}} />
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Created By',
          key: "created_by",
          render: (row) => <div>
              <p>{row?.created_by?.name}</p>
              <p>{dateFormat(row?.created_at)}</p>
            </div>
        }
    ];
    return (
        <div style={{margin: "7rem 2rem"}}>
            <h2>Uploaded Files</h2>
            <Table 
                dataSource={sopBulkUploadList} 
                columns={columns} 
                pagination={{
                    current: currentPage,
                    total: pageCount * 10,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
        </div>
    )
}

export default SOPBulkUploadList