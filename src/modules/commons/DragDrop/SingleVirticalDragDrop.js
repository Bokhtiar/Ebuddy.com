import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Input, InputNumber, Radio, Select, Tooltip, Button, DatePicker, Form, Row, Col, Divider } from "antd";

// fake data generator
const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'red',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'grey',
    padding: grid,
    width: 250,
});

export default class SingleVirticalDragDrop extends Component {
    constructor(props, context) {
        super(props, context);
        console.log(this.props.dataList);
        // eslint-disable-next-line react/state-in-constructor
        this.state = {
            items: this.props.dataList,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index,
        );

        this.setState({
            items,
        });
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(droppableProvided, droppableSnapshot) => (
                        <div
                            ref={droppableProvided.innerRef}
                            style={getListStyle(droppableSnapshot.isDraggingOver)}
                        >
                            {this.state.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(draggableProvided, draggableSnapshot) => (
                                        <div
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            {...draggableProvided.dragHandleProps}
                                            style={getItemStyle(
                                                draggableSnapshot.isDragging,
                                                draggableProvided.draggableProps.style,
                                            )}
                                        >
                                            <Row gutter={16} key={`milestones-${item.id}`}>
                                                <Col span={0}>
                                                    <Form.Item label={''}>
                                                        {this.props.form.getFieldDecorator('milestone_id', {
                                                            // rules: [{required: true, message: "Required!"}],
                                                            initialValue: item?.id ? item?.id : undefined
                                                        })(
                                                            <Input placeholder="Milestone" size="large" hidden />,
                                                        )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item label={'Milestone Name'}>
                                                        {this.props.form.getFieldDecorator('milestone_name', {
                                                            // rules: [{required: true, message: "Required!"}],
                                                            initialValue: item?.milestone?.full_name ? item?.milestone?.full_name : undefined
                                                        })(
                                                            <Input placeholder="Milestone" size="large" disabled />,
                                                        )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={5}>
                                                    <Form.Item label={'Reason'}>
                                                        {this.props.form.getFieldDecorator(`milestone_reason_id-${item.id}`, {
                                                            // rules: [{required: true, message: "Required!"}],
                                                            initialValue: item?.milestone_reason_id ? item?.milestone_reason_id : undefined
                                                        })(
                                                            <Select
                                                                size="large"
                                                                placeholder="Reason"
                                                                showSearch
                                                                filterOption={(input, option) =>
                                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                }
                                                            >
                                                                {milestoneReasonList ? milestoneReasonList?.map(reasons => {
                                                                    return (
                                                                        <Select.Option key={reasons?.id} value={reasons?.id}>{reasons?.name}</Select.Option>
                                                                    )
                                                                }) : null}
                                                            </Select>,
                                                        )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={3}>
                                                    <Form.Item label={'Status'}>
                                                        {this.props.form.getFieldDecorator('milestone_status_id', {
                                                            // rules: [{required: true, message: "Required!"}],
                                                            initialValue: item?.status === 1 ? "Active" : "Inactive"
                                                        })(
                                                            <Select
                                                                size="large"
                                                                placeholder="Reason"
                                                                showSearch
                                                                filterOption={(input, option) =>
                                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                }
                                                            >
                                                                <Select.Option key="Active" value="Active">Active</Select.Option>
                                                                <Select.Option key="Inactive" value="Inactive">Inactive</Select.Option>
                                                            </Select>,
                                                        )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={5}>
                                                    <Form.Item label={'Planned Start Date'}>
                                                        {this.props.form.getFieldDecorator(`plan_start_date-${item.id}`, {
                                                            // rules: [{required: true, message: "Required!"}],
                                                            initialValue: item?.plan_start_date ? moment(new Date(item?.plan_start_date)) : moment()
                                                        })(
                                                            <DatePicker placeholder="Select Start Date" size="large" />,
                                                        )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={5}>
                                                    <Form.Item label={'Planned End Date'}>
                                                        {this.props.form.getFieldDecorator(`plan_end_date-${item.id}`, {
                                                            // rules: [{required: true, message: "Required!"}],
                                                            initialValue: item?.plan_end_date ? moment(new Date(item?.plan_end_date)) : moment()
                                                        })(
                                                            <DatePicker placeholder="Select End Date" size="large" />,
                                                        )}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}