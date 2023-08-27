/** @format */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectEmployeeTaskList,
  selectError,
  selectIsFetching,
  selectPaginatorInfo,
} from "../../../@state/selectors/dashboard-report.selector";
import { Creators } from "../../../@state/reducers/dashboard-report.reducer";
import { compose } from "redux";
import { Modal, Button } from "antd";
import TaskListOfDay from "./TaskListOfDay";
import DataLoader from "../../../@infrastructure/DataLoader";
import { FetchStatus } from "../../../@statics/Status";
import { TaskListModalOfDayContext } from "../components/Wiget/wiget-context-api";

const TaskListModalOfDay = ({
  error,
  isFetching,
  employeeTaskList,
  getEmployeeTaskListAction,
  paginatorInfo,
}) => {
  // useEffect(() => {
  //     console.log({ paginatorInfo });
  //     getEmployeeTaskListAction('2023-06-17', 'Done')
  // }, [])

  return (
    <TaskListModalOfDayContext.Consumer>
      {({ selectedDate, isVisible, setIsVisible }) => {
        return (
          <Modal
            width={"80%"}
            title="Task List"
            visible={isVisible}
            onOk={() => setIsVisible(false)}
            onCancel={() => setIsVisible(false)}
          >
            {Array.isArray(employeeTaskList) && (
              <TaskListOfDay
                isFetching={isFetching !== FetchStatus.SUCCESS}
                onChangeFilter={getEmployeeTaskListAction}
                date={selectedDate}
                dataSource={employeeTaskList}
                paginatorInfo={paginatorInfo}
                getEmployeeTaskListAction={getEmployeeTaskListAction}
              />
            )}
          </Modal>
        );
      }}
    </TaskListModalOfDayContext.Consumer>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching,
  error: selectError,
  employeeTaskList: selectEmployeeTaskList,
  paginatorInfo: selectPaginatorInfo,
});

const mapDispatchToProps = {
  getEmployeeTaskListAction: Creators.getEmployeeTaskList,
};

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhanced(TaskListModalOfDay);
