import React from 'react'
import { Card, Button, Badge } from 'antd';

const WatchList = ({title, icon}) => {
  
  const tablet = (color, text) => {
    return <div style={{display: 'flex', alignItems: 'center', marginRight: '20px', textAlign: 'center'}}>
      <span style={{height: '6px', width: '10px', backgroundColor: color,borderRadius: '10px', display: 'inline-block', marginRight: '5px'}}></span>
      <span>{text}</span>
    </div>
  }

  return (
    <Card 
      title={
        <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={icon} alt="watchlist-icon" height="15px"/>
            <span style={{paddingLeft: '5px'}}>{title}</span>
        </div>
      }
        size="small"
        extra={
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <>{tablet('#1884E6', "Done")}</>
            <>{tablet('#F65A5A', "Extended")}</>
            <>{tablet('#E6BA40', "Running")}</>
            <>{tablet('#9FD674', "Pending")}</>
            <>{tablet('#E4E4E4', "Estimated Time")}</>
            {/* <div className="m-2"><Badge color="#1884E6" text="Done" /></div>
            <div className="m-2"><Badge color="#F65A5A" text="Extended" /></div>
            <div className="m-2"><Badge color="#E6BA40" text="Running" /></div>
            <div className="m-2"><Badge color="#9FD674" text="Pending" /></div>
            <div className="m-2"><Badge color="#E4E4E4" text="Estimated Time" /></div> */}
            <Button type="primary">View All</Button>
          </div>
        }
    >
      {/* className="table" */}
      <div className="watchlist">
        <div className="view">
          <div className="wrapper">
            <table >
              <tr>
                <th>Management Digitalization</th>
                <td style={{backgroundColor: '#1884E6', borderRadius: '10px', width: '50px'}}></td>
              </tr>
              <tr>
                <th rowspan="4">Phone</th>
                <td style={{backgroundColor: '#fff'}}></td><td style={{backgroundColor: '#9FD674', borderRadius: '10px', width: '50px'}}></td>
              </tr>
              <tr>
                <td style={{backgroundColor: '#1884E6', borderRadius: '10px', width: '50px'}}></td>
              </tr>
              <tr>
                <td style={{backgroundColor: '#9FD674', borderRadius: '10px', width: '50px'}}></td>
              </tr>
              <tr>
                <td style={{backgroundColor: '#9FD674', borderRadius: '10px', width: '50px'}}></td>
              </tr>
              <tr>
                <th rowspan="4">DAtaaaaaa</th>
                <td style={{backgroundColor: '#fff'}}></td><td style={{backgroundColor: '#E6BA40', borderRadius: '10px', width: '50px'}}></td>
              </tr>
              <tr>
                <td style={{backgroundColor: '#E4E4E4', borderRadius: '10px', width: '50px'}}></td>
              </tr>
              <tr>
                <td style={{backgroundColor: '#E6BA40', borderRadius: '10px', width: '50px'}}></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default WatchList