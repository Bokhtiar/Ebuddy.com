/** @format */

import { Checkbox, Form, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";

const format = "HH:mm";

const TaskScheduleUpdate = ({
  scheduleStartTime,
  scheduleEndTime,
  setScheduleStartTime,
  setScheduleEndTime,
  isChecked,
  setIsChecked,
  form,
  activityDetails,
}) => {
  return (
    <>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {form.getFieldDecorator("schedule_work", {
          initialValue:
           activityDetails?.hasOwnProperty("schedule_work") &&
            activityDetails?.schedule_work === 1
              ? true
              : false 
        })(
          <Checkbox
            //style={{ marginTop: "20px" }}
            onChange={(e) => {
              if (e.target.checked) {
                setIsChecked(e.target.checked);
                form.setFieldsValue({
                  due_date: form.getFieldValue("start_date"),
                });
                // repeats = undefined
                form.setFieldsValue({ repeats: undefined });
                form.setFieldsValue({ repeats_till_date: undefined });
              } else {
                setIsChecked(e.target.checked);
              }
            }}
           
           checked={isChecked}
          >
            Schedule Work
          </Checkbox>
        )}
        <Form.Item label={"START TIME"}>
          {form.getFieldDecorator("start_time", {
            initialValue: activityDetails?.start_time
              ? moment(activityDetails?.start_time, format)
              : null,
          })(
            <TimePicker
              onChange={(time, timeString) => setScheduleStartTime(timeString)}
              disabled={false}
              format={format}
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label={"END TIME"}>
          {form.getFieldDecorator("end_time", {
            initialValue: activityDetails?.end_time
              ? moment(activityDetails?.end_time, format)
              : null,
          })(
            <TimePicker
              onChange={(time, timeString) => setScheduleEndTime(timeString)}
              disabled={false}
              format={format}
              size="large"
            />
          )}
        </Form.Item>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskScheduleUpdate);
