import React, { useState, useEffect } from "react";
import { TableWrapper } from "../commons/Wrapper";
import Table from "../commons/Table";
import { Typography, Skeleton } from "antd";
import { PUNCH_REPORT } from "../../scripts/api";
import { getData } from "../../scripts/api-service";
import dummy from "../../assets/dummy.jpg";

const NOT_FOUND = "Not found";

const PunchReport = props => {
  const [table_data, setTableData] = useState();
  const [allData, setAllData] = useState();

  const getReport = async () => {
    let res = await getData(PUNCH_REPORT);
    if (res && res.data?.data) {
      setAllData(res.data?.data);
    } else {
      setAllData([]);
    }
  };

  const prepareTable = () => {
    setTableData({
      width_class: "width-1000",
      header: [
        {
          type: "text",
          name: "Employee name",
          lg: 8
        },
        {
          type: "text",
          name: "Employee ID",
          lg: 3
        },
        {
          type: "text",
          name: "Date",
          lg: 4
        },
        {
          type: "text",
          name: "In time",
          lg: 5
        },
        {
          type: "text",
          name: "status",
          lg: 4
        }
      ],
      body: allData.map(elem => {
        return {
          data: [
            {
              type: "head",
              src: elem.profile_pic || dummy,
              lg: 1
            },
            {
              type: "text",
              name: elem.name || NOT_FOUND,
              lg: 7
            },
            {
              type: "text",
              name: elem.emp_id || NOT_FOUND,
              lg: 3
            },
            elem.punch_report
              ? {
                  type: "text",
                  name: elem.punch_report.created_at.split(" ")[0] || NOT_FOUND,
                  lg: 4
                }
              : {},
            elem.punch_report
              ? {
                  type: "text",
                  name: elem.punch_report.first_in_time || NOT_FOUND,
                  lg: 5
                }
              : {},
            elem.punch_report
              ? {
                  type: "tag",
                  name: elem.punch_report.status || NOT_FOUND,
                  lg: 4
                }
              : {}
          ]
        };
      })
    });
  };

  useEffect(() => {
    getReport();
  }, []);

  useEffect(() => {
    if (allData) {
      prepareTable();
    }
  }, [allData]);

  return (
    <TableWrapper>
      {table_data ? (
        <Table data={table_data} />
      ) : (
        <Skeleton className="pad" active />
      )}
    </TableWrapper>
  );
};

export default PunchReport;
