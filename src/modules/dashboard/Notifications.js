import React, { Component, Fragment } from "react";
import { Row, Col, Button, Card, Typography, Empty } from "antd";
import { getData } from "../../scripts/getData";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: []
    };
  }

  async componentWillMount() {
    let res = await getData("accounts/v1/notification/all");
    let view = res.data.data.map(elem => {
      return (
        <Fragment>
          <Card style={{ width: "100%" }}>
            <Row>
              <Col lg={2}>
                <i class="material-icons">notification_important</i>
              </Col>
              <Col lg={{ span: 21, offset: 1 }}>
                <Typography.Text strong>
                  {elem.title?.length > 300
                    ? `${elem.title.slice(0, 300)}...`
                    : elem.title}
                </Typography.Text>
                <div>
                  <Typography.Text>
                    {elem.description?.length > 500
                      ? `${elem.description.slice(0, 500)}...`
                      : elem.description}
                  </Typography.Text>
                </div>
              </Col>
            </Row>
          </Card>
          <div className="v-space" />
        </Fragment>
      );
    });
    this.setState({ view: view });
  }

  render() {
    return (
      <Fragment>
        <Typography.Text strong>
          {`Notifications (${this.state.view.length})`}
        </Typography.Text>
        <div className="v-space" />
        <div>{this.state.view.length > 0 ? this.state.view : <Empty />}</div>
      </Fragment>
    );
  }
}

export default Notifications;
