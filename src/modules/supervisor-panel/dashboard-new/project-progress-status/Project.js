import React from 'react';
import { Avatar } from 'antd';

const Project = ({title, avatar, empName}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems:'center',  backgroundColor: '#4888C3', color: 'white', height: '102px'}}>
        <p>{title}</p>
        <p><Avatar src={avatar} icon="user"/>&nbsp;{empName}</p>
    </div>
  )
}

export default Project