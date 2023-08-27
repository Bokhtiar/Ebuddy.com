import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import { timeLine } from "../../scripts/routes";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;



function Timeline(props) {
    const [newFeedback, setNewFeedback] = useState(timeLine);

    return (
        <Wrapper className="flex_r">
            <div style={{ width: "100%", overflow: "hidden" }}>
                <Route path="/timeline" component={Panel} exact />
                <Route path="/timeline/:name" component={Panel} exact />
                <Route path="/timeline/:name/:id" component={Panel} exact />
            </div>
        </Wrapper>
    );
}

export default connect()(Timeline);
