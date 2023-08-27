import React from 'react'
import { Tabs, Table } from 'antd';
import BulkUploadList from '../../task-activity/activity-bulk-upload/business/bulk-upload-list';

const { TabPane } = Tabs;

const UploadMessageTabs = ({
    project,
    milestone
}) => {
    const callback = (key) => {
        console.log(key);
    }
    const columns = [
        {
            title: 'Response',
            key: 'response',
            render: (row) => row
        }
    ];
    return (
        <div style={{ padding: '1rem' }}>
            <Tabs tabPosition='left' onChange={callback} >
                {(project && project?.messages) &&
                    <TabPane tab="Project Bulk Upload" key="1">
                        <Table
                            scroll={{
                                y: 300
                            }}
                            rowKey={record => record}
                            dataSource={project.messages}
                            columns={columns}
                            pagination={false}
                        />

                    </TabPane>
                }
                {(milestone && milestone?.messages) &&
                    <TabPane tab="Milestone Bulk Upload" key="2">
                        <Table
                            scroll={{
                                y: 300
                            }}
                            rowKey={record => record}
                            dataSource={milestone.messages}
                            columns={columns}
                            pagination={false}
                        />

                    </TabPane>
                }
            </Tabs>
        </div>
    )
}

export default UploadMessageTabs;