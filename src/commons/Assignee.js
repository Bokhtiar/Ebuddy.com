import React, { useState, useEffect } from "react";
import add from "../assets/add_new.svg";
import {
  Typography,
  Modal,
  Input,
  Skeleton,
  Button,
  Empty,
  Avatar,
  Badge,
  Icon,
} from "antd";
import { getData } from "../scripts/api-service";
import dummy from "../assets/dummy.jpg";
import { ADDRESS_BOOK_PAGE } from "../scripts/api";
import { _slice_ } from "../scripts/slice";

const Assignee = (props) => {
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState();
  const [search_string, setSearchString] = useState();
  const [assignees, setAssignees] = useState(props.assigned || []);
  const [assignee_temp, setAssignee_temp] = useState([]);
  const [last_page, setLastPage] = useState();
  const [load_more_loading, setLoad_more_loading] = useState();
  const [assign_loading, setAssignLoading] = useState();
  const [delay, setDelay] = useState();

  const employeeList = async () => {
    const assignees_id = assignees.map((elem) => elem.emp_id);
    let res = await getData(
      `${ADDRESS_BOOK_PAGE}&page=${page}${
        search_string ? `&name=${search_string}` : ""
      }`
    );
    if (res) {
      if (employees) {
        setEmployees([...employees, ...res.data.data.data]);
      } else {
        setEmployees(res.data.data.data);
      }
      setLastPage(res.data.data.last_page);
      setLoad_more_loading(null);
    }
  };

  const loadMore = () => {
    setLoad_more_loading(true);
    setPage(page + 1);
  };

  const assignee = () => {
    setAssignLoading(true);
    setAssignees([...assignees, ...assignee_temp]);
    setAssignLoading(null);
    setModal(false);
  };

  const removeAssignee = (toRemove) => {
    setAssignees(
      assignees.filter((elem) => {
        return elem.emp_id !== toRemove.emp_id;
      })
    );
  };

  useEffect(() => {
    if (!employees) {
      setPage(1);
      employeeList();
    }
  }, [employees]);

  useEffect(() => {
    if (page !== 1) {
      employeeList();
    }
  }, [page]);

  useEffect(() => {
    setAssignee_temp([]);
  }, [modal]);

  useEffect(() => {
    props.method(assignees);
  }, [assignees]);

  return (
    <>
      <div className="assignee-container">
        {assignees && assignees.length > 0 ? (
          <div className="attendee-grid">
            {assignees.map((elem) => {
              return (
                <div key={elem.emp_id} className="flex_c side-pad">
                  <div className="half-pad" />
                  <Badge
                    count={
                      <Icon
                        onClick={() => removeAssignee(elem)}
                        type="close-circle"
                        theme="filled"
                        style={{
                          color: "#f5222d",
                          fontSize: "1.1rem",
                        }}
                      />
                    }
                  >
                    <Avatar size="large" src={elem.profile_pic || dummy} />
                  </Badge>
                  <Typography.Text
                    strong
                    style={{ color: "gray", marginTop: "-0.5rem" }}
                    className="sub-title"
                  >
                    {_slice_(elem.name, 6)}
                  </Typography.Text>
                </div>
              );
            })}
            <div
              className="flex-col centered side-pad"
              onClick={() => setModal(true)}
            >
              <div className="half-pad" />
              <img className="head" src={add} />
              <Typography.Text
                strong
                style={{ color: "gray", marginTop: "-0.5rem" }}
                className="sub-title"
              >
                Add employee
              </Typography.Text>
            </div>
          </div>
        ) : (
          <div className="add-new" onClick={() => setModal(true)}>
            <img src={add} />
            <Typography.Text className="table-header">
              Add employee
            </Typography.Text>
          </div>
        )}
      </div>
      <Modal
        title={
          props.title ? (
            props.title
          ) : (
            <div className="flex_r">
              {`Select members   `}
              <Badge
                style={{ backgroundColor: "#0484e7" }}
                className="left-pad"
                count={assignee_temp?.length || 0}
                showZero
              />
            </div>
          )
        }
        centered
        visible={modal}
        onCancel={() => setModal(null)}
        footer={null}
      >
        <Input.Search
          allowClear
          placeholder="Search"
          onSearch={() => {
            setEmployees(null);
          }}
          onChange={(e) => {
            clearTimeout(delay);
            setSearchString(e.target.value || "");
            setDelay(
              setTimeout(() => {
                setEmployees(null);
              }, 600)
            );
          }}
        />
        <div className="half-pad" />
        <div style={{ maxHeight: "350px", overflow: "auto" }}>
          {employees ? (
            employees.length > 0 ? (
              employees
                .filter((sub) => {
                  const assignees_id = assignees.map((a) => a.emp_id);
                  return !assignees_id.includes(sub.emp_id);
                })
                .map((elem) => {
                  return (
                    <div
                      key={elem.emp_id + elem.name}
                      onClick={() => {
                        if (
                          assignee_temp
                            .map((elem) => elem.emp_id)
                            .includes(elem.emp_id)
                        ) {
                          setAssignee_temp(
                            assignee_temp.filter((assignee) => {
                              return assignee.emp_id !== elem.emp_id;
                            })
                          );
                        } else {
                          setAssignee_temp([...assignee_temp, elem]);
                        }
                      }}
                      className={
                        assignee_temp
                          .map((elem) => elem.emp_id)
                          .includes(elem.emp_id)
                          ? "flex_r P-HOVER half-pad employee-select"
                          : "flex_r P-HOVER half-pad"
                      }
                    >
                      <Avatar src={elem.profile_pic || dummy} />
                      <Typography.Text className="left-pad">
                        {elem.name}
                      </Typography.Text>
                    </div>
                  );
                })
            ) : (
              <Empty className="big-space" />
            )
          ) : (
            <Skeleton active className="pad" />
          )}
          {page < last_page ? (
            <div className="pad">
              <Button
                type="primary"
                onClick={loadMore}
                ghost
                loading={load_more_loading}
                size="small"
                block
              >
                Load more
              </Button>
            </div>
          ) : (
            []
          )}
        </div>
        <div className="half-pad" />
        <Button
          loading={assign_loading}
          onClick={assignee}
          type="primary"
          block
          size="large"
        >
          Assign
        </Button>
      </Modal>
    </>
  );
};

export default Assignee;
