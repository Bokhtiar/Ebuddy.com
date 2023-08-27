import React from "react";
import { Flex } from "../commons/Flex";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
// const DnDCalendar = withDragAndDrop(Calendar);

export default ({ milestones }) => {

  const data = milestones
    ?.filter((item) => item.plan_end_date)
    .map(({ id, plan_end_date, milestone_name }) => ({
      key: id,
      start: moment(plan_end_date).toDate(),
      end: moment(plan_end_date).toDate(),
      title: milestone_name,
    }));

  // console.log(data);
  return (
    <Flex space="1rem">
      <Calendar
        defaultDate={moment().toDate()}
        defaultView="month"
        localizer={localizer}
        events={data || []}
        style={{ height: 500, width: "100%" }}
      />
    </Flex>
  );
};
