import React, {useEffect, useState} from 'react';
import { Row, Col } from 'antd';
import  Card from './card';
import {TableWrapper, Wrapper} from "../../commons/Wrapper";
import ProjectProgressStatus from './project-progress-status';
import Milestone from './milestone';
import RecentComments from './recent-comments';
import WatchList from './watchlist';
import overdueIcon from '../../../assets/icons/overdue-icon.svg';
import upcomingDeadlineIcon from '../../../assets/icons/upcoming deadline.svg';
import recentCommentIcon from '../../../assets/icons/recent-comment-icon.svg';
import watchlistIcon from '../../../assets/icons/watchlist-icon.svg';
import { getData } from "../../../scripts/api-service";
import { 
  DEPARTMENT_LIST,
  DASHBOARD_CARD, 
  PROJECT_WISE_PROGRESS,
  // PROJECT_WISE_PRIORITIES,
  MILESTONES_UPCOMING_DEADLINE,
  OVERDUE_MILESTONES,
  LATEST_COMMENTS,
} from '../../../scripts/api';

const Dashboard = () => {
  const [departments, setDepartments] = useState();
  const [dashboardData, setDashboardData] = useState();
  const [projectWiseProgress, setProjectWiseProgress] = useState();
  const [projectWisePriorities, setProjectWisePriorities] = useState();
  const [upcomingMilestones, setUpcomingMilestones] = useState();
  const [overdueMilestones, setOverdueMilestones] = useState();
  const [recentComments, setRecentComments] = useState();
  const [selectDepartment, setSelectDepartment] = useState();

  const getDepartments = async () => {
    let res  = await getData(DEPARTMENT_LIST);

    if (res) {
        let masterData = res.data.data;
        setDepartments(masterData);
    }
  }

  const getDashboardData = async () => {
    let res  = await getData(DASHBOARD_CARD);

    if (res) {
        let masterData = res?.data?.data;
        setDashboardData(masterData);
    }
  }
  
  const getProjectWiseProgress = async () => {
    let url = PROJECT_WISE_PROGRESS;
    if(selectDepartment) url = url + '?kam_department_id=' + selectDepartment;
    let res  = await getData(url);

    if (res) {
        let masterData = res?.data?.data;
        setProjectWiseProgress(masterData);
    }
  }

  // const getProjectWisePriorities = async () => {
  //   let url = PROJECT_WISE_PRIORITIES;
  //   if(selectDepartment) url = url + '?kam_department_id=' + selectDepartment;
  //   let res  = await getData(url);

  //   if (res) {
  //       let masterData = res?.data?.data;
  //       setProjectWisePriorities(masterData);
  //   }
  // }

  const getUpcomingMilestones = async () => {
    let res  = await getData(MILESTONES_UPCOMING_DEADLINE);
    
    if (res) {
      let masterData = res?.data?.data;
      setUpcomingMilestones(masterData);
    }
  }
  
  const getOverdueMilestones = async () => {
    let res  = await getData(OVERDUE_MILESTONES);
    
    if (res) {
      let masterData = res?.data?.data;
      setOverdueMilestones(masterData);
    }
  }
  
  const getRecentComments = async () => {
    let res  = await getData(LATEST_COMMENTS);

    if (res) {
        let masterData = res?.data?.data;
        setRecentComments(masterData);
    }
  }

  useEffect(() => {
    getDepartments();
    getDashboardData();
    getProjectWiseProgress();
    // getProjectWisePriorities();
    getUpcomingMilestones();
    getOverdueMilestones();
    getRecentComments();
  }, []);

  useEffect(() => {
    if(selectDepartment){
      getProjectWiseProgress();
      // getProjectWisePriorities();
    }
  }, [selectDepartment]);

  return (
    <Wrapper className="mx-2" style={{width: '99%', marginTop: '1rem', marginBottom: 0}}>
     {/* <Wrapper className="mx-2" style={{width: '98%'}}> */}
      {dashboardData ? <Card data={dashboardData}/> : null}
      {projectWiseProgress ? <ProjectProgressStatus data={projectWiseProgress} departments={departments} setSelectDepartment={setSelectDepartment} selectDepartment={selectDepartment}/> : null}
      {/* <WatchList  title="Watchlist" icon={watchlistIcon}/> */}
      <Row gutter={16}>
        <Col span={12}>
          {<Milestone title="Upcoming Deadlines" overdue={false} icon={upcomingDeadlineIcon} data={upcomingMilestones}/>}
        </Col>
        <Col span={12}>
          {<Milestone title="Overdue Milestone" overdue={true} icon={overdueIcon} data={overdueMilestones}/>}
        </Col>
      </Row>
      {<RecentComments title="Recent Comments" icon={recentCommentIcon} data={recentComments}/>}
    </Wrapper>
  )
}

export default Dashboard