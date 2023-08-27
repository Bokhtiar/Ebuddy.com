import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Select, Row, Col } from 'antd';
import Project from './Project';
import Date from './Date';
import ProgressStatus from './Progress';
import PriorityChart from './PriorityChart';
import PlannedExecuteChart from './PlannedExecuteChart';
import management_icon from "../../../../assets/icons/management-icon.svg";

const index = ({data, departments, priorities, setSelectDepartment, selectDepartment}) => {
    const gridStyle = {
        width: '25%'
    }

    return (
        <Card 
            size="small"
            title={
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={management_icon} alt="progress-icon" height="15px"/>
                    <span style={{paddingLeft: '5px'}}>Project Wise Progress Status</span>
                </div>
            }
            extra={
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Select 
                        allowClear={true}
                        size="medium"
                        style={{'width': '130px','marginRight': '0.5rem'}} 
                        showSearch
                        placeholder='Department'
                        dropdownMatchSelectWidth={false}
                        getPopupContainer={trigger => trigger.parentNode} 
                        onChange={(value)=>setSelectDepartment(value)}
                        value={selectDepartment ? selectDepartment : undefined }
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                    >   
                        {
                            departments?.length ? 
                                departments.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
                        }
                    </Select>
                    <Link 
                        target="_blank" 
                        to={'/supervisor-panel/projects-list?kam='}
                    >
                        <Button type="primary">View All</Button>
                    </Link>
                </div>
            }
        >
            <Row>
                {data ? 
                    data?.map(item =>{
                        return (
                            <Card.Grid style={{backgroundColor: '#4888C3', color: 'white', width: '25%',textAlign: 'center'}}><Project title={item.name} avatar={item.kam?.profile_pic} empName={item.kam?.name}/></Card.Grid>
                        )
                    })     
                : null}
            </Row>
            <Row>
                {data ? 
                    data?.map(item =>{
                        return (
                            <Card.Grid style={{width: '25%'}}><Date data={item}/></Card.Grid>
                        )
                    })     
                : null}
            </Row>
            <Row>
                {data ? 
                    data?.map(item =>{
                        return (
                            <Card.Grid style={{width: '25%', textAlign: 'center'}}><ProgressStatus data={item}/></Card.Grid>
                        )
                    })     
                : null}
            </Row>
            <Row>
                {data ? 
                    data?.map(item =>{
                        return (
                            <Card.Grid style={{width: '25%'}}><PlannedExecuteChart data={item}/></Card.Grid>
                        )
                    })     
                : null}
            </Row>
            <Row>
                {data ? 
                    data?.map(item =>{
                        return (
                            <Card.Grid style={{width: '25%'}}><PriorityChart priorities={item}/></Card.Grid>
                        )
                    })     
                : null}
            </Row>
        </Card>
  )
}

export default index