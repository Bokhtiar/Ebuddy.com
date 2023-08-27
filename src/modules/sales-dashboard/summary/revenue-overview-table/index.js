/** @format */

import React, { useState, useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import { addCommasToCurrency } from "../../../../@infrastructure/addCommasToCurrency";

const RevenueOverviewTable = ({ data, months }) => {
  const [tableData, setTableData] = useState();

  const calculateTableData = (calcualteData, departmentName) => {
    let monthlyTarget = 0;
    let monthlyAchieved = 0;
    let yearlyTarget = 0;
    let tempObject = {};

    calcualteData.tableResult.forEach((item) => {
      if (item.department_name === departmentName) {
        monthlyTarget = Number(item.monthly_target);
        monthlyAchieved = Number(item.monthly_achieve);
        yearlyTarget = Number(item.total_target);
      }
    });

    let targetVariance = monthlyAchieved - monthlyTarget;
    let performance = (monthlyAchieved * 100) / monthlyTarget;
    let monthRemaining = 12 - moment().format("M");

    tempObject = {
      department_name: departmentName,
      monthly_target: monthlyTarget,
      monthly_achieved: monthlyAchieved,
      target_variance: targetVariance,
      performance: performance,
      yearly_target: yearlyTarget,
      month_remaining: monthRemaining,
    };
    return tempObject;
  };

  useEffect(() => {
    if (data.chartResult) {
      let tempArray = [];

      //creating payload
      data.chartResult.forEach((item) => {
        let result = calculateTableData(data, item.department_name);
        if (tempArray.length) {
          //removing duplicates
          let index = tempArray.findIndex(
            (temp) => temp.department_name === result.department_name,
          );
          if (index === -1) tempArray.push(result);
        } else tempArray.push(result);
      });

      setTableData(tempArray);
    }
  }, [data]);

  const columns = [
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "As On Month (BDT)",
      children: [
        {
          title: "Target",
          key: "monthly_target",
          render: (row) => addCommasToCurrency(row?.monthly_target.toFixed(2)),
        },
        {
          title: "Achieved",
          key: "monthly_achieved",
          render: (row) =>
            row?.monthly_achieved.toFixed(2) > 1000
              ? addCommasToCurrency(row?.monthly_achieved.toFixed(2))
              : row?.monthly_achieved.toFixed(0),
        },
        {
          title: "Target Variance",
          key: "target_variance",
          render: (row) => (
            <p
              style={{
                color: row?.target_variance > 0 ? "#61C635" : "#F2473F",
              }}
            >
              {addCommasToCurrency(row?.target_variance.toFixed(2))}
            </p>
          ),
        },
        {
          title: "Performance",
          key: "performance",
          render: (row) => (
            <p
              style={{ color: row?.performance > 100 ? "#61C635" : "#F2473F" }}
            >
              {row?.performance.toFixed(2)}%
            </p>
          ),
        },
      ],
    },
    {
      title: "Year (BDT)",
      children: [
        {
          title: "Target",
          key: "yearly_target",
          render: (row) => addCommasToCurrency(row?.yearly_target.toFixed(2)),
        },
        {
          title: "Remaining",
          key: "remaining",
          render: (row) =>
            addCommasToCurrency(
              (row?.yearly_target - row?.monthly_achieved).toFixed(2),
            ),
        },
        {
          title: "Required (Month)",
          key: "required",
          render: (row) =>
            row?.month_remaining > 0
              ? addCommasToCurrency(
                  (
                    (row?.yearly_target - row?.monthly_achieved) /
                    row?.month_remaining
                  ).toFixed(2),
                )
              : addCommasToCurrency(row?.yearly_target.toFixed(2)),
        },
      ],
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      bordered
      size="middle"
      style={{ marginTop: "2rem" }}
      pagination={false}
      // scroll={{ x: 'calc(700px + 50%)'}}
    />
  );
};

export default RevenueOverviewTable;
