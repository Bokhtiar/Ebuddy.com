/** @format */

import React, { useEffect, useState } from "react";
import "./ActivityList.css";
import { ActivityModal } from "./ActivityModal";
import { getData } from "../../../scripts/api-service";
import {
  ACTIVITY_LIST,
  ACTIVITY_SUB_TASK_LIST,
  USER_LIST_MD_CTO_OTHERS,
} from "../../../scripts/api";
import { Empty, Select, Spin } from "antd";
 
const ActivityList = ({ selectedDate, mdDashboard }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activityList, setActivityList] = useState([]);
  const [activityTask, setActivityTask] = useState({});
  const [userList, setUserList] = useState();
  const [selectUser, setSelectUser] = useState();

  useEffect(() => {
    getActivityList();
    getUserList();
  }, []);

  useEffect(() => {
    getActivityList();
  }, [selectUser, mdDashboard]);

  const getActivityList = async () => {
    setLoading(true);
    let url = ACTIVITY_LIST + "?md_dashboard=" + mdDashboard;
    if (selectedDate) url = url + "&date=" + selectedDate;
    if (selectUser) url = url + "&assignee=" + selectUser;
    const { data } = await getData(url);
    setActivityList(data.data);
    setLoading(false);
  };

  const getSubTaskData = async (id) => {
    setLoading((prev) => !prev);
    const { data } = await getData(`${ACTIVITY_SUB_TASK_LIST}/${id}`);
    setActivityTask(data?.data || {});
    setLoading(false);
    setModalOpen((prev) => !prev);
  };

  const getUserList = async () => {
    let url = USER_LIST_MD_CTO_OTHERS;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res.data.code === 200) {
        setUserList(masterData);
      }
    }
  };

  const colorList = ["#0084E6", "#41BC75", "#F32E2E", "#FFAC27", "#FFAC27"];

  const getColor = (value) => {
    if (value === "To-Do") return colorList[0];
    else if (value === "Done") return colorList[1];
    else if (value === "Hold") return colorList[2];
    else if (value === "WIP") return colorList[3];
    else if (value === "Pending") return colorList[4];
    else if (value === "Reviewed") return colorList[1];
    else return colorList[0];
  };

  return (
    <section
      className="activity__section"
      style={{
        overflowY: activityList?.data?.length > 0 ? "scroll" : "hidden",
      }}
    >
      <div className="activity__section__header">
        <div className="activity__section__header__left">
          <h3>Activity List</h3>
        </div>
        <Select
          allowClear
          style={{ width: "25%", marginRight: "1rem" }}
          // size="large"
          showSearch
          placeholder="Select Assignee"
          dropdownMatchSelectWidth={false}
          onChange={(value) => {
            setSelectUser(value);
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {userList
            ? userList.map((user) => {
                return (
                  <Select.Option value={user.emp_id} label={user.name}>
                    {user.name}
                  </Select.Option>
                );
              })
            : null}
        </Select>
        {/* {
                    activityList?.length > 0 ? <div className="activity__section__header__right">
                        <Link to='/activity'>View All</Link>
                    </div> : null
                } */}
      </div>
      {loading ? (
        <div className="activity__spinner">
          <Spin />
        </div>
      ) : (
        <>
          {activityList?.data?.length ? (
            activityList?.data?.map((activity, index) => (
              <div
                className="activity-list"
                key={index}
                onClick={() => getSubTaskData(activity.id)}
              >
                <div className="activity-list__item">
                  <h4>{activity?.title}</h4>
                  <p>
                    <span className="bot-code">{activity.code}</span>
                    {/* <span className='bot-title'>Chatbot Project</span> */}
                  </p>
                  {/* User profile image and user name */}
                  <div className="activity-list__item__user">
                    <div className="activity-list__item__user__avatar">
                      <img
                        src={activity?.assigned_user?.profile_pic}
                        alt="avatar"
                      />
                    </div>
                    <div className="activity-list__item__user__name">
                      <p>{activity?.assigned_user?.name}</p>
                    </div>
                  </div>

                  {/* Badge Section */}
                  <div className="activity-list__item__badge">
                    <div>
                      <span className="badge badge-primary">
                        {activity?.delegated ? "Task Delegated" : "Assigned"}
                      </span>

                      <span
                        className="badge badge-secondary"
                        style={{
                          backgroundColor: getColor(activity?.status),
                        }}
                      >
                        {activity?.status}
                      </span>
                      <span>
                        <small>Due Date: {activity?.due_date}</small>
                      </span>
                    </div>
                    <div className="sub_task_section">
                      <span className="badge badge-warning">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                        </svg>
                        {activity?.child_activities_count} Sub Task
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="not__found">
              <Empty />
            </div>
          )}
        </>
      )}

      {modalOpen && (
        <ActivityModal
          open={modalOpen}
          setOpen={setModalOpen}
          activityTask={activityTask}
        />
      )}
    </section>
  );
};
export default ActivityList;
