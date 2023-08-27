import React from "react";
import { Card, Typography } from "antd";

const Covid19 = props => {
  return (
    <Card className="landing-card">
      <Typography.Text strong>
        To prevent infection and to slow transmission of COVID-19, do the
        following:
      </Typography.Text>
      <div className="mini-pad" />
      <Typography.Text>
        1. Wash your hands regularly with soap and water, or clean them with
        alcohol-based hand rub.
      </Typography.Text>
      <div className="mini-pad" />
      <Typography.Text>
        2. Maintain at least 1 metre distance between you and people coughing or
        sneezing.
      </Typography.Text>
      <div className="mini-pad" />
      <Typography.Text>3. Avoid touching your face.</Typography.Text>
      <div className="mini-pad" />
      <Typography.Text>
        4. Cover your mouth and nose when coughing or sneezing.
      </Typography.Text>
      <div className="mini-pad" />
      <Typography.Text>
        5. Stay home if you feel unwell. Refrain from smoking and other
        activities that weaken the lungs.
      </Typography.Text>
      <div className="mini-pad" />
      <Typography.Text>
        6. Practice physical distancing by avoiding unnecessary travel and
        staying away from large groups of people.
      </Typography.Text>
    </Card>
  );
};

export default Covid19;
