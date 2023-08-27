import React, {useEffect, useState} from "react";
import {Wrapper} from "../commons/Wrapper";
import {Avatar, Button, Card, Empty, Skeleton, Typography} from "antd";
import {getData} from "../../scripts/api-service";
import {SCREENSHOTS} from "../../scripts/api";
import moment from "moment";
import AWS from "aws-sdk";
import {getSignedUrl} from "../../cloud-services/aws-s3";

const ScreenShots = props => {
    const [images, setImages] = useState([]);
    const [last_page, setLastPage] = useState(1);
    const [current_page, setCurrentPage] = useState(1);
    const getScreens = async (page) => {
        let res = await getData(
            `${SCREENSHOTS}?emp_id=${props.params.id}&page=${page}`
        );
        if (res?.data?.data?.data?.length > 0) {
            setImages((preState) => ([
                ...preState,
                ...res?.data?.data?.data?.map(el => {
                    const url = el?.name?.split('/');
                    el.name = getSignedUrl({Key: url[url.length - 2] + '/' + url[url.length - 1]})
                    return el;
                })
            ]));
            setLastPage(res?.data?.data?.last_page)
        }
    };

    useEffect(() => {
        getScreens(current_page);
    }, current_page);

    return (
        <Wrapper>
            <Typography.Title className="pad" level={3} strong>
                Screenshots
            </Typography.Title>
            <div className="flex_r pad P-BG">
                <div className="full-width flex_r">
                    <Avatar
                        src={
                            images && images.length > 0
                                ? images[0].track_profile?.profile_pic
                                : ""
                        }
                    />
                    <div className="left-pad">
                        <Typography.Text strong>
                            {images && images.length > 0 ? images[0].track_profile?.name : ""}
                        </Typography.Text>
                        <div>
                            <Typography.Text>Employee ID : {props.params.id}</Typography.Text>
                        </div>
                    </div>
                </div>
                <div className="full-width right-text">
                    <Typography.Text>
                        Screenshots : {images ? images.length : "---"}
                    </Typography.Text>
                </div>
            </div>
            <div className="half-pad"/>
            <div className="pad">
                {images ? (
                    images.length > 0 ? (
                        <div className="attendee-grid">
                            {" "}
                            {images.map(elem => {
                                return (
                                    <Card
                                        hoverable
                                        key={elem.id}
                                        onClick={() => {
                                            window.open(elem.name, "_blank");
                                        }}
                                        style={{width: "12rem", height: "18rem", margin: "1rem"}}
                                        cover={
                                            <img
                                                alt="example"
                                                style={{
                                                    width: "100%",
                                                    height: "12rem",
                                                    overflow: "hidden",
                                                    objectFit: "cover"
                                                }}
                                                src={elem.name}
                                            />
                                        }
                                    >
                                        <Card.Meta
                                            title={moment(
                                                elem.created_at, "YYYY-MM-DD hh:mm:ss"
                                            ).format("DD MMMM YYYY")}
                                            description={moment(
                                                elem.created_at,
                                                "YYYY-MM-DD hh:mm:ss"
                                            ).format("hh:mm a")}
                                        />
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <Empty className="big-pad"/>
                    )
                ) : (
                    <Skeleton className="pad" active/>
                )}
            </div>
            <div className='pad'>
                {
                    last_page > current_page ?
                        <Button onClick={() => {
                            setCurrentPage(current_page + 1)
                            getScreens(current_page + 1)
                        }} size='large' block type='primary'>
                            Load more
                        </Button> : ''
                }
            </div>
        </Wrapper>
    );
};

export default ScreenShots;
