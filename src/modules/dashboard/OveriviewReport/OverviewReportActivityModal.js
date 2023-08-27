import { Modal } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Creators } from '../../../@state/reducers/dashboard-report.reducer'
import { selectActivity, selectActivityId, selectError, selectIsFetching } from '../../../@state/selectors/dashboard-report.selector'
import { Status } from '../../../@statics/Status'
import TaskDetails from '../../timeline/list/commonModal'

const OverviewReportActivityModal = ({
    isFetching,
    error,
    activity,
    activityId,
    getActivityAction,
    resetActivityAction,
    resetActivityIdAction,
    closeModal,
    isVisible
}) => {
    useEffect(() => {
        //console.log({ activity });
    }, [activity]);

    useEffect(() => {
        getActivityAction(`${activityId}`)
    }, [activityId]);
    useEffect(()=> {
        if(isVisible === false && activityId === Status.RESET) {
            resetActivityAction('');
        }
    },[isVisible])
    return (
        <Modal
            title="Activity Details"
            width="60vw"
            visible={isVisible}
            onOk={closeModal}
            onCancel={closeModal}
            // onCancel={() => resetActivityIdAction('')}
            footer={false}
            maskClosable={false}
        >
            {activity && <TaskDetails activityTask={activity} />}
        </Modal>
    )
}

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsFetching,
    error: selectError,
    activity: selectActivity,
    activityId: selectActivityId,
})

const mapDispatchToProps = {
    getActivityAction: Creators.getActivity,
    resetActivityAction: Creators.resetActivity,
    resetActivityIdAction: Creators.resetActivityId,
}

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhanced(OverviewReportActivityModal);