/** @format */
import React, { useEffect, useState } from "react";
import { List, message, Avatar, Spin } from "antd";
import "../list/ActivityList.css";
import reqwest from "reqwest";
import uniqBy from "lodash/uniqBy";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { getData } from "../../../scripts/api-service";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
  selectError,
  selectIsFetching,
  selectTasks,
} from "../../../@state/selectors/task-query.selectors";
import { selectUserListMdCTOOthers } from "../../../@state/selectors/dashboard-report.selector";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

const InfiniteScrollList = ({ url }) => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    hasMore: true,
  });

  useEffect(() => {
    fetchData(({ data }) => {
      console.log({ data });
      setState({
        ...state,
        data: data?.data,
      });
    });
  }, []);

  const fetchData = async (callback) => {
    const { data } = await getData(url);
    if (data) {
      callback(data);
    }
  };

  const handleInfiniteOnLoad = () => {
    let { data } = state;
    setState({
      ...state,
      loading: true,
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      setState({
        ...state,
        hasMore: false,
        loading: false,
      });
      return;
    }
    fetchData((res) => {
      data = data.concat(res.data.data);
      setState({
        ...state,
        data,
        loading: false,
      });
    });
  };

  return (
    <div className="demo-infinite-container">
      {/* <withInfi */}
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!state.loading && state.hasMore}
        useWindow={false}
      >
        <List
          dataSource={state.data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item?.title}</a>}
                // description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        >
          {state.loading && state.hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching,
  error: selectError,
  tasks: selectTasks,
  users: selectUserListMdCTOOthers,
});

const mapDispatchToProps = {};

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhanced(InfiniteScrollList);
