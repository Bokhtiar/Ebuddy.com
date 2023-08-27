import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Wrapper } from '../commons/Wrapper'
import { PageHeader } from 'antd'
import { Row, Col } from 'antd';
import MilestoneBulkUpload from './MilestoneBulkUpload';
import ProjectBulkUpload from './ProjectBulkUpload';
import { createStructuredSelector } from 'reselect';
import { selectError, selectIsFetching, selectMilestoneFilePath, selectMilestoneUploadMessages, selectProjectFilePath, selectProjectUploadMessages } from '../../@state/selectors/bulk-upload.selector';
import { Creators } from '../../@state/reducers/bulk-upload.reducer';
import BulkUploadList from '../task-activity/activity-bulk-upload/business/bulk-upload-list';
import UploadMessageTabs from './@components/UploadMessageTabs';

const ProjectPageBulkUpload = ({
    isFetching,
    error,
    milestoneFilePath,
    projectFilePath,
    projectBulkUploadAction,
    milestoneBulkUploadAction,
    setMilestoneFilePathAction,
    setProjectFilePathAction,
    projectUploadMessages,
    milestoneUploadMessages,
    resetAllAction,
}) => {

    useEffect(()=> {
        return ()=> resetAllAction('');
    },[])

    console.log(projectFilePath)
    return (
        <Wrapper>
            <PageHeader title={'Bulk Updoad'} />
            <Row type='flex' gutter={[16, 16]}>
                <Col span={12}>
                    <ProjectBulkUpload
                        filePathSelector={projectFilePath}
                        setPathAction={setProjectFilePathAction}
                        uploadAction={() => projectBulkUploadAction(projectFilePath)}
                    />
                </Col>
                <Col span={12}>
                    <MilestoneBulkUpload
                        filePathSelector={milestoneFilePath}
                        setPathAction={setMilestoneFilePathAction}
                        uploadAction={() => milestoneBulkUploadAction(milestoneFilePath)}

                    />
                </Col>
            </Row>
            <UploadMessageTabs 
                project={projectUploadMessages}
                milestone={milestoneUploadMessages}
            />
        </Wrapper>
    )
}

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsFetching,
    error: selectError,
    projectFilePath: selectProjectFilePath,
    milestoneFilePath: selectMilestoneFilePath,
    projectUploadMessages: selectProjectUploadMessages,
    milestoneUploadMessages: selectMilestoneUploadMessages,
})

const mapDispatchToProps = {
    projectBulkUploadAction: Creators.projectBulkUpload,
    milestoneBulkUploadAction: Creators.milestoneBulkUpload,
    setProjectFilePathAction: Creators.setProjectFilePath,
    setMilestoneFilePathAction: Creators.setMilestoneFilePath,
    resetAllAction: Creators.resetAll,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPageBulkUpload)