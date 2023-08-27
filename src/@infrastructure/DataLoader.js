import React from 'react'
import { Spin, Alert } from 'antd';
import { FetchStatus } from '../@statics/Status';

const DataLoader = ({
    error,
    isFetching,
    children
}) => {
    return (
        <>
            {
                (isFetching !== FetchStatus.SUCCESS && isFetching !== FetchStatus.FAILED) ?
                    <Spin tip="Loading..."></Spin> :
                    (
                        isFetching === FetchStatus.FAILED ?
                            <Alert
                                message="Error"
                                description="This is an error message about copywriting."
                                type="error"
                                showIcon
                            /> :
                            children
                    )
            }
        </>

    )
}

export default DataLoader