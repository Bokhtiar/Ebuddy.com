import React from 'react'
import { Divider, Tooltip } from "antd";
const ReportTableHeader = ({

}) => {
    return (
        <thead>
            <tr>
                <th style={{ borderBottom: "1px solid #f4f4f4", }}>
                    Employee
                </th>
                {Array.from({ length: 10 }, (_, i) => i + 9).map((hour) => (
                    <th scope="col"
                        key={hour}
                        className="time-cell"
                    >{`${hour}`}</th>
                ))}
            </tr>
        </thead>
    )
};

export default ReportTableHeader;