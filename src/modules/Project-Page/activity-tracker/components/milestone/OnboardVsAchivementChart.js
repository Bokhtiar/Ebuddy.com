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
import { ONBOARD_AMOUNT_VS_TOTAL_ACHIEVEMENT_AMOUNT_CHART } from "../../../../../scripts/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OnboardVsAchivementChart = () => {
  const [apiData, setApiData] = useState();

  const getApiData = async () => {
    let res = await getData(ONBOARD_AMOUNT_VS_TOTAL_ACHIEVEMENT_AMOUNT_CHART);

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

  const onboards = {
    label: "Onboarded Amount",
    data: [
      apiData?.january?.onboard_amount,
      apiData?.february?.onboard_amount,
      apiData?.march?.onboard_amount,
      apiData?.april?.onboard_amount,
      apiData?.may?.onboard_amount,
      apiData?.june?.onboard_amount,
      apiData?.july?.onboard_amount,
      apiData?.august?.onboard_amount,
      apiData?.september?.onboard_amount,
      apiData?.october?.onboard_amount,
      apiData?.november?.onboard_amount,
      apiData?.december?.onboard_amount
    ],
    borderColor: "#41BC75",
    bgColor: "#41BC75",
  };

  const achivements = {
    label: "Total Achivement Amount",
    data: [
      apiData?.january?.achievement_amount,
      apiData?.february?.achievement_amount,
      apiData?.march?.achievement_amount,
      apiData?.april?.achievement_amount,
      apiData?.may?.achievement_amount,
      apiData?.june?.achievement_amount,
      apiData?.july?.achievement_amount,
      apiData?.august?.achievement_amount,
      apiData?.september?.achievement_amount,
      apiData?.october?.achievement_amount,
      apiData?.november?.achievement_amount,
      apiData?.december?.achievement_amount,
    ],
    borderColor: "#1884E6",
    bgColor: "#1884E6",
  };

  const datasets = [
    {
      label: onboards.label,
      data: onboards.data,
      borderColor: onboards.borderColor,
      backgroundColor: onboards.bgColor,
    },
    {
      label: achivements.label,
      data: achivements.data,
      borderColor: achivements.borderColor,
      backgroundColor: achivements.bgColor,
    },
  ];

  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ paddingLeft: "5px" }}>
            Onboared Amount vs Total Achivement Amount
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

export default OnboardVsAchivementChart;
