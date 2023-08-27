import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { salesDashboard } from "../../scripts/routes";
import { getPermissions } from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 2rem);
`;

class SalesDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSalesDashboard: {}
        };
    }

    componentDidMount() {
        getPermissions()
            .then(response => {
                if (response && response.length) {
                    const permNames = response.map((item) => item.name);

                    salesDashboard.items.forEach(item => {
                        if (item.name === 'Target Bulk Upload' && !permNames.includes('Sales Target Bulk Upload')) {
                            item.notVisible = true
                        }
                    });

                    this.setState({ newSalesDashboard: salesDashboard })
                }
            })
    }

    render() {
        return (
            <Wrapper className="flex_r">
                <Sidebar sidebar={this.state.newSalesDashboard} />
                <div style={{ width: "100%", overflow: "hidden" }}>
                    <Route path="/sales-dashboard" component={Panel} exact />
                    <Route path="/sales-dashboard/:name" component={Panel} exact />
                    <Route path="/sales-dashboard/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(SalesDashboard);
