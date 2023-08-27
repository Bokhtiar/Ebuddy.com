/** @format */

import React from "react";
import "../../modules/timeline/list/TodaySchedule";
import OverviewReport from "./OveriviewReport/OverviewReport";
import TaskListModalOfDay from "./OveriviewReport/TaskListModalOfDay";
import DataLoader from "../../@infrastructure/DataLoader";
import { FetchStatus } from "../../@statics/Status";
import { StatusColor } from "../../@infrastructure/StatusColor";
import { StatusName } from "../../@infrastructure/Status";
import StatusBar from "./components/StatusBar/StatusBar";
import StatusBarWithCategoryIndicator from "./components/StatusBar/StatusBarWithCategoryIndicator";

import Scheduler, { Resource } from "devextreme-react/scheduler";
import { data, resourcesData, priorityData } from "./OveriviewReport/Bdata";

 
const currentDate = new Date(2021, 1, 2);
const views = [
  "timelineDay",
  // "timelineWeek",
  // "timelineWorkWeek",
  // "timelineMonth",
];
const groups = ["priority"];

const DashboardOverviewReportLayout = () => {
  return (
    <>
      <section className="timeline__section">
        <h2 className="engagement__overview">
          {/* Engagement Overview (Reporting To Me) */}
          Today's Schedule
        </h2>
        {/* <div className="schedule__header">
          <h5>Today's Schedule</h5>
          <h5>Weekly Task Overview</h5>
        </div> */}
        {/* <div className="color__div" style={{ paddingBottom: "1rem" }}>
          <span className="to__do">To-Do</span>
          <span className="schedule__pending">Pending</span>
          <span className="schedule__done">Done</span>
          <span className="schedule__wip">WIP</span>
          <span className="schedule__cancel">Cancel</span>
        </div> */}
        <StatusBarWithCategoryIndicator />

        <div className="schedule__table">
          <div className="today__schedule">
            <OverviewReport /> 

              
              {/* <Scheduler
                timeZone="America/Los_Angeles"
                dataSource={data}
                views={views}
                defaultCurrentView="timelineDay"
                defaultCurrentDate={currentDate}
                height={250}
                width={900}
                groups={groups}
                cellDuration={60}
                firstDayOfWeek={0}
                startDayHour={9}
                endDayHour={19}
              >
                <Resource
                  fieldExpr="ownerId"
                  allowMultiple={true}
                  dataSource={resourcesData}
                  label="Owner"
                  useColorAsDefault={true}
                />

              </Scheduler> */}
           
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardOverviewReportLayout;
