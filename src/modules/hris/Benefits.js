import React, { Component, Fragment } from "react";
import styled from "styled-components";
import SearchFilter from "../commons/SearchFilter";
import { Divider, Typography, Empty, Timeline, Row, Col, Avatar } from "antd";
import { getData } from "../../scripts/getData";
import { checkRes } from "../../scripts/checkRes";
import { alertPop } from "../../scripts/message";
import dummy from "../../assets/dummy.jpg";

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding-top: 4rem;
`;

class Benefits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: []
    };
  }

  componentWillMount() {
    this.view();
  }

  view = async () => {
    let res = await getData("accounts/v1/hris/emp-benefits");
    if (checkRes(res.status)) {
      this.setState({
        allData: res.data.data
      });
    } else if (res) {
      res.map(elem => {
        alertPop("error", elem);
      });
    } else {
      alert("error", "Something went wrong!");
    }
  };

  render() {
    return (
      <Wrapper>
        {/* <div className='pad'>
                    <SearchFilter />
                </div>
                <Divider /> */}
        <Typography.Title className="pad" level={4}>
          Corporate offers
        </Typography.Title>
        {this.state.allData.length > 0 ? (
          this.state.allData.map(elem => {
            return (
              <Fragment>
                <div className="pad">
                  <div className="flex_r">
                    <div className="right-pad">
                      <Avatar size="small" src={dummy} />
                    </div>
                    <div>
                      <Typography.Text strong>{elem.title}</Typography.Text>
                      <div>
                        <Typography.Text>{elem.description}</Typography.Text>
                      </div>
                    </div>
                  </div>
                  <div className="pad">
                    <ul>
                      {elem.offers.map(val => {
                        return (
                          <li>
                            <Typography.Text strong className="FIX_th">
                              {val.description}
                            </Typography.Text>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <Divider />
                <div className="space" />
              </Fragment>
            );
          })
        ) : (
          <Empty className="big-space" />
        )}
      </Wrapper>
    );
  }
}

export default Benefits;
