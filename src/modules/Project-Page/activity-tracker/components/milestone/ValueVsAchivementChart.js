import React, { useEffect, useState } from "react";
import { Card } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getData } from "../../../../../scripts/api-service";
import { LEAD_AMOUNT_VS_ONBOARD_AMOUNT_CHART } from "../../../../../scripts/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ValueVsAchivementChart = () => {
  const [apiData, setApiData] = useState();

  const getApiData = async () => {
    let res = await getData(LEAD_AMOUNT_VS_ONBOARD_AMOUNT_CHART);

    if (res) {
      let masterData = res?.data?.data;
      setApiData(masterData);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const leadAmount = {
    label: "Lead Amount",
    data: [
      apiData?.january?.lead,
      apiData?.february?.lead,
      apiData?.march?.lead,
      apiData?.april?.lead,
      apiData?.may?.lead,
      apiData?.june?.lead,
      apiData?.july?.lead,
      apiData?.august?.lead,
      apiData?.september?.lead,
      apiData?.october?.lead,
      apiData?.november?.lead,
      apiData?.december?.lead,
    ],
    borderColor: "#41BC75",
    bgColor: "#41BC75",
  };

  const onBoardedAmount = {
    label: "Onboarded Amount",
    data: [
      apiData?.january?.onboard,
      apiData?.february?.onboard,
      apiData?.march?.onboard,
      apiData?.april?.onboard,
      apiData?.may?.onboard,
      apiData?.june?.onboard,
      apiData?.july?.onboard,
      apiData?.august?.onboard,
      apiData?.september?.onboard,
      apiData?.october?.onboard,
      apiData?.november?.onboard,
      apiData?.december?.onboard,
    ],
    borderColor: "#1884E6",
    bgColor: "#1884E6",
  };

  const datasets = [
    {
      label: leadAmount.label,
      data: leadAmount.data,
      borderColor: leadAmount.borderColor,
      backgroundColor: leadAmount.bgColor,
    },
    {
      label: onBoardedAmount.label,
      data: onBoardedAmount.data,
      borderColor: onBoardedAmount.borderColor,
      backgroundColor: onBoardedAmount.bgColor,
    },
  ];

  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ paddingLeft: "5px" }}>
            Lead Amount vs Onboarded Amount
          </span>
        </div>
      }
      size="small"
    >
      <div>
        <Line
          data={{
            labels: labels,
            datasets: datasets,
          }}
        />
      </div>
    </Card>
  );
};

export default ValueVsAchivementChart;
