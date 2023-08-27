import React from 'react'
import { Card, Button } from 'antd'

const UploadButton = ({
    isLoading = false,
    isDisable = false,
    onUploadEvent,
}) => {
    return (
        <div style={{ textAlign: 'right' }}>
            <Button
                size='large'
                type="primary"
                onClick={onUploadEvent}
                disabled={isDisable}
                loading={isLoading}
            >
                Upload Now
            </Button>
        </div>
    )
}

export default UploadButton