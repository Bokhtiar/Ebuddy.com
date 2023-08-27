import React, { Fragment } from "react";
import './styles/index.scss'
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login";
import Dashboard from "./layout/Dashboard";
import * as Cookies from "js-cookie";
import { Typography, Button } from "antd";

import ReactGA from "react-ga";
import {
    askForPermissionToReceiveNotifications,
    getNotifications,
    initializeFirebase
} from "./notifications/push-notification";
import { postData } from "./scripts/postData";
import { getAwsCredential } from "./cloud-services/aws-s3";
import { alertPop } from "./scripts/message";

getAwsCredential();
const initializeReactGA = () => {
    ReactGA.initialize('UA-161832573-1');
    ReactGA.pageview('/');
}

const Empty = () => (
    <div
        style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#fafafa",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <Typography.Text strong>
            Please download the app or enable desktop view.
        </Typography.Text>
        <div className="space" />
        <Button type="primary">
            <a href="https://play.google.com/store/apps/details?id=com.sslwireless.iot_smartoffice&hl=en">
                Get app
            </a>
        </Button>
    </div>
);

class App extends React.Component {
    //constructor to define initial state
    constructor(props) {
        super(props);
        this.state = {
            view: []
        };
    }

    //populate view when component loads
    componentDidMount() {
        initializeReactGA()
        let temp_view = [];
        if (Cookies.get("token")) {
            temp_view.push(
                <Fragment key={"dashboard"}>
                    <Route path="/" component={Dashboard} />
                </Fragment>
            );
        } else {
            temp_view.push(
                <Fragment key={"login"}>
                    <Route path="/" component={Login} />
                </Fragment>
            ); 
        }
        this.setState({
            view: temp_view
        });
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        askForPermissionToReceiveNotifications().then(firebase_token => {
            postData('accounts/v1/firebase/create', { firebase_token })
                .then((res) => {
                    if (res?.data?.code === 201) {
                        getNotifications((payload) => {
                            alertPop('success', payload?.data?.details, payload?.data?.title)
                        });
                    }
                });
        });
    }

    resize() {
        let currentHideNav = window.innerWidth <= 900;
        if (currentHideNav !== this.state.hideNav) {
            this.setState({ hideNav: currentHideNav });
        }
    }

    //main method
    render() {
        return (
            <BrowserRouter
                style={{
                    minWidth: "900px",
                    // overflow: "auto"
                }}
            >
                {/* {this.state.hideNav ? <Empty /> : this.state.view} */}
                {this.state.view}
            </BrowserRouter>
        );
    }
}

initializeFirebase();
export default App;
