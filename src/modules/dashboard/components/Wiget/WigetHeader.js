import React from 'react'
import { Row, Col, Card, Icon, Button, Typography } from 'antd';
import { WigetHeaderContext } from './wiget-context-api';
const { Title } = Typography;

const WigetHeader = ({

}) => {
    return (
        <WigetHeaderContext.Consumer>
            {({ data: { headerTitle, weekNumber }, eventEmitters: { setWeekNumber } }) => (
                <Row>
                    <Col span={21}>
                        <Title level={4}>
                            {headerTitle}
                        </Title>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex' }}>
                            <Button disabled={false} type="link" block onClick={() => setWeekNumber(weekNumber - 7)} className="px-1" >
                                <Icon type="left" style={{ fontSize: "1.5rem" }} />
                            </Button>

                            <Button type="link" block onClick={() => setWeekNumber(weekNumber + 7)} className="px-1"
                                disabled={weekNumber >= 0}>
                                <Icon type="right" style={{ fontSize: "1.5rem" }} />
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}

        </WigetHeaderContext.Consumer>

    )
}

export default WigetHeader;