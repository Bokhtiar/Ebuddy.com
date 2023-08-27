import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Select, Row, Col, Icon, Button, Modal, Input, Radio, Checkbox } from 'antd';

import { PROJECT_MILESTONE, MILESTONE_TYPE, MILESTONES_CREATE, PROJECT_MILESTONE_DELETE_ALL } from "../../scripts/api";
import { getData, postData } from "../../scripts/api-service";
import { CreateForm } from "../commons/CreateForm";
import { alertPop } from "../../scripts/message";
import uuid from "uuid/v4";

const { Option } = Select;

function MilestoneConfigure(props) {
    const {projectId, changeMilestone, orderMilestones, context, isDetailsView} = props;

    const columnsFromBackend = {
        "milestooneList": {
            name: "MILESTONE LIST",
            items: []
        },
        'orderMilestone': {
            name: "ORDER MILESTONE",
            items: []
        },
    };

    const [columns, setColumns] = useState(columnsFromBackend);
    const [milestones, setMilestones] = useState([]);
    const [showClearSearch, setClearSearch] = useState(false);
    const [showAddMilestone, setShowAddMileStone] = useState(false);
    const [msTypes, setMsTypes] = useState();
    const [selectedMilestoneType, setSelectedMilestoneType] = useState(1);
    const [selectedMSIds, setSelectedMSId] = useState([]);
    const [selectedOrderIds, setSelectedOrderId] = useState([]);
    const [milestoneDeleteModal, setMilestoneDeleteModal] = useState(false);
    const [isMSSelectAll, setIsMSSelectAll] = useState();
    const [isOrderSelectAll, setIsOrderSelectAll] = useState();
    
    useEffect(() => {
        getMilestoneTypes();
        if (context !== 'edit') {
            // getProjectMileStone();
        }
    }, []);

    useEffect(() => {
        if(selectedMilestoneType && selectedMilestoneType !== 'clear-search') getProjectMileStone();
    }, [selectedMilestoneType]);

    useEffect(() => {
        if (context === 'edit') {
            // getProjectMileStone();
        }
        
        if (context === 'edit' && orderMilestones && orderMilestones.length) {
            let orderMile = [];

            orderMilestones.map(val => {
                // val.id = val.milestone_id.toString();
                val.full_name = val?.milestone?.full_name;

                orderMile.push({
                    id: uuid(),
                    project_milestone_id: val.id,
                    milestone_id: val.milestone_id.toString(),
                    full_name: val?.milestone?.full_name
                });
            })

            setColumns((prevState) => ({
                ...prevState,
                orderMilestone: {
                ...prevState.major,
                name: "ORDER MILESTONE",
                items: orderMile,
                }
            }));
            
            changeMilestone(orderMile);
        }
    }, [orderMilestones]);

    const getMilestoneTypes = async () => {
        const res = await getData(MILESTONE_TYPE+ '?paginate=0');
        if (res) setMsTypes(res.data?.data);
        else alertPop("error", "Milestone types not found");
    };

    const getProjectMileStone = async () => {
        let url = PROJECT_MILESTONE + '?';
        if(selectedMilestoneType) url = url + 'milestone_type_id=' + selectedMilestoneType;
        let res = await getData(url);

        if (res) {
            let masterData = res.data.data || [];

            if (res.data.code === 200) {
                setMilestones(masterData);
                let itemData = [];

                masterData.map(val => {
                    val.id = val.id.toString();
                    val.milestone_id = val.id.toString();

                    let findIndex = -1;
                    
                    if (orderMilestones && orderMilestones.length && context === 'edit') {
                        findIndex = orderMilestones.findIndex(e => e.milestone_id == val.id );
                    }

                    if (findIndex === -1) itemData.push(val);
                })
                
                setColumns((prevState) => ({
                    ...prevState,
                    milestooneList: {
                      ...prevState.major,
                      name: "MILESTONE LIST",
                      items: itemData,
                    }
                }));
            }
        }
    }  

    const onDragEnd = (result, columns, setColumns, changeMilestone) => {
        // console.log("on-drag-end\n", result);
        if (!result.destination) return;
        if (isDetailsView) return;
        
        const { source, destination } = result;

        if (context === "edit" && source.droppableId === "orderMilestone" && destination.droppableId === "milestooneList") {
            alertPop('warning', "To remove milestone please use the Roadmap section.");
            return false;
        }
    
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.index]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.index]: {
                    ...destColumn,
                    items: destItems
                }
            });

            if (destination.droppableId === 'milestooneList') changeMilestone(sourceItems);
            if (destination.droppableId === 'orderMilestone') changeMilestone(destItems);
            
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                ...column,
                items: copiedItems
                }
            });

            if (source.droppableId === 'orderMilestone') changeMilestone(copiedItems);
        }

        resetSearch();
    };

    const clearOrderMilestone = () => {
        if (context === 'edit') {
            setMilestoneDeleteModal(true);
        } else {
            let order = columns.orderMilestone.items || [],
            mile = columns.milestooneList.items || [];

            let newMile = [...order, ...mile],
                newOrder = [];

            setColumns((prevState) => ({
                ...prevState,
                orderMilestone: {
                    ...prevState,
                    items: newOrder,
                }
            }));

            setColumns((prevState) => ({
                ...prevState,
                milestooneList: {
                    ...prevState,
                    items: newMile,
                }
            }));

            changeMilestone(newOrder);
        }
    }

    const onSearchChange = (value) => {
        setIsMSSelectAll(false);
        resetSearch();
        if (value === 'clear-search') {
            milestones.forEach(val => {
                if (val.id !== value) {
                   let ele = document.querySelector(`[data-rbd-draggable-id='${val.id}']`);
                   if (ele) ele.style.display = "none"
                }
            })

            // setClearSearch(true);
        } else {
            setClearSearch(true);
            resetSearch();
            // getProjectMileStone();
        }
    }

    const resetSearch = () => {
        milestones.forEach(val => {
            let ele = document.querySelector(`[data-rbd-draggable-id='${val.id}']`);
            if (ele) ele.style.display = "block";
        });
        // setClearSearch(false)
    }

    const fields = [
        {
          id: 1,
          label: "Full Name",
          name: "full_name",
          component: <Input size="large" placeholder="Full name" disabled={isDetailsView}/>,
        },
        {
          id: 2,
          label: "Short Name",
          name: "short_name",
          component: <Input size="large" placeholder="Short name" disabled={isDetailsView}/>,
        },
        {
          id: 3,
          label: "Type",
          name: "milestone_type_id",
          component: (
            <Select placeholder="Milestone type" size="large"disabled={isDetailsView}>
              {msTypes && msTypes.length &&
                msTypes.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>{name}</Select.Option>
                ))}
            </Select>
          ),
        },
        {
          id: 4,
          label: "Status",
          name: "status",
          component: (
            <Radio.Group disabled={isDetailsView}>
              <Radio value={1}>Active</Radio>
              <Radio value={0}>Inactive</Radio>
            </Radio.Group>
          ),
        },
        {
            id: 5,
            label: "Attachemnt",
            name: "attachment_required",
            component: (
              <Radio.Group disabled={isDetailsView}>
                <Radio value={1}>Yes</Radio>
                <Radio value={0}>No</Radio>
              </Radio.Group>
            ),
        },
    ];

    const submit = async (value, form) => {
        const res = await postData(MILESTONES_CREATE, {...value});

        if (res) {
            form.resetFields();
            getProjectMileStone();
            setShowAddMileStone(false);
        }
    }

    const AddMilestone = () => {
        setShowAddMileStone(true);
    }

    const mileStoneListSelectAll = e => {
        let msIds = [];
        setIsMSSelectAll(!isMSSelectAll);

        if (e.target.checked) {
            if (columns.milestooneList.items && columns.milestooneList.items.length) {
                columns.milestooneList.items.forEach(item => {
                    msIds.push(item.id);
                });
                
                setSelectedMSId(msIds);
            }
        } else {
            setSelectedMSId([]);
        }
    }

    const milestoneSelect = (e) => {
        let target = e.target;

        if (target.checked) {
            setSelectedMSId(prevArray => [...prevArray, target.value]);
        } else {
            let items = selectedMSIds.filter(id => id !== target.value);

            setSelectedMSId(items);
        }
    }

    const isSelectedMileStone = (msId) => {
        let index = selectedMSIds.findIndex(id => id === msId);

        if (index !== -1) return true;
        else return false;
    }

    const orderListSelectAll = e => {
        let orderIds = [];
        setIsOrderSelectAll(!isOrderSelectAll);

        if (e.target.checked) {
            if (columns.orderMilestone.items && columns.orderMilestone.items.length) {
                columns.orderMilestone.items.forEach(item => {
                    orderIds.push(item.id);
                });
                
                setSelectedOrderId(orderIds);
            }
        } else {
            setSelectedOrderId([]);
        }
    }

    const orderListSelect = e => {
        let target = e.target;

        if (target.checked) {
            setSelectedOrderId(prevArray => [...prevArray, target.value]);
        } else {
            let items = selectedOrderIds.filter(id => id !== target.value);

            setSelectedOrderId(items);
        }
    }

    const isSelectedOrder = (msId) => {
        let index = selectedOrderIds.findIndex(id => id === msId);

        if (index !== -1) return true;
        else return false;
    }

    const moveToOrderList = () => {
        let order = columns.orderMilestone.items || [],
            mile = columns.milestooneList.items || [],
            selectedMileItems = [],
            newMileItems = [];

        mile.forEach(item => {
            let index = selectedMSIds.findIndex(id => id === item.id);

            if (index !== -1) {
                selectedMileItems.push(item);
            } else {
                newMileItems.push(item);
            }
        });

        let newOrder = [...order, ...selectedMileItems];

        setColumns((prevState) => ({
            ...prevState,
            orderMilestone: {
                ...prevState,
                items: newOrder,
            }
        }));

        setColumns((prevState) => ({
            ...prevState,
            milestooneList: {
                ...prevState,
                items: newMileItems,
            }
        }));

        changeMilestone(newOrder);
        setSelectedMSId([]);
        setIsMSSelectAll(false);
    }

    const moveToMilestoneList = () => {
        let order = columns.orderMilestone.items || [],
            mile = columns.milestooneList.items || [],
            selectedOrderItems = [],
            newOrderItems = [];

        order.forEach(item => {
            let index = selectedOrderIds.findIndex(id => id === item.id);

            if (index !== -1) {
                selectedOrderItems.push(item);
            } else {
                newOrderItems.push(item);
            }
        })

        let newMileItems = [...mile, ...selectedOrderItems];

        setColumns((prevState) => ({
            ...prevState,
            orderMilestone: {
                ...prevState,
                items: newOrderItems,
            }
        }));

        setColumns((prevState) => ({
            ...prevState,
            milestooneList: {
                ...prevState,
                items: newMileItems,
            }
        }));

        changeMilestone(newOrderItems);
        setSelectedOrderId([]);
        setIsOrderSelectAll(false);
    }

    const deleteMilestones = async () => {
        let res = await getData(PROJECT_MILESTONE_DELETE_ALL + projectId);

        if (res) {
            setMilestoneDeleteModal(false);
            
            setColumns((prevState) => ({
                ...prevState,
                orderMilestone: {
                    ...prevState,
                    items: [],
                }
            }));
    
            setColumns((prevState) => ({
                ...prevState,
                milestooneList: {
                    ...prevState,
                    items: milestones,
                }
            }));
    
            changeMilestone([]);
        }
    }
  
    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns, changeMilestone)} >
            <Row style={{width: '100%'}}>
                <Col span={10}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h4>{columns.milestooneList.name}</h4>
                        <div style={{ margin: 8, border: '3px solid #f1f1f1', borderRadius: '5px' }}>
                            <Row className="pt-2 pl-1" style={{width: '100%'}}>
                                <Col span={23}>
                                    <Select
                                        // allowClear={true}
                                        showSearch
                                        placeholder="Select Milestone Type"
                                        optionFilterProp="children"
                                        value={selectedMilestoneType}
                                        onChange={(value)=>{
                                            onSearchChange(value);
                                            setSelectedMilestoneType(value);
                                        }}
                                        disabled={isDetailsView}
                                        filterOption={(input, option) =>
                                            option?.props?.children?.toString()?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            showClearSearch ? (<Option value={'clear-search'}>
                                                        <span style={{color: '#fc7a7a'}}>Clear Search</span>
                                                    </Option>) : null
                                        }
                                        
                                        {
                                            // milestones && milestones.length ? (
                                            //     milestones.map(data => {
                                            //         return <Option key={data.id} value={data.id}>{data.full_name}</Option>
                                            //     })
                                            // ) : ''
                                            msTypes && msTypes.length &&
                                                msTypes.map(({ id, name }) => (
                                                  <Select.Option key={id} value={id}>{name}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Col>
                                {/* <Col span={1}>

                                </Col>
                                <Col span={9}>
                                    <Button type="primary" onClick={AddMilestone}>Add Milestone</Button>
                                </Col> */}
                            </Row>

                            <Checkbox className="ml-2 my-3"  
                                checked={isMSSelectAll}
                                onChange={mileStoneListSelectAll}
                                disabled={isDetailsView}
                            >
                                Select All
                            </Checkbox>

                            <Droppable droppableId='milestooneList' key='milestooneList'>
                            {(provided, snapshot) => {
                                return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver ? "lightblue" :'#fff',
                                        padding: '4px',
                                        width: '350px',
                                        height: '480px',
                                        overflowY: 'auto'
                                    }}
                                >
                                    {columns.milestooneList.items.map((item, index) => {
                                    return (
                                        <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                        >
                                        {(provided, snapshot) => {
                                            return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    userSelect: "none",
                                                    padding: 16,
                                                    margin: "0 0 8px 0",
                                                    minHeight: "50px",
                                                    backgroundColor: '#fff',
                                                    color: snapshot.isDragging ? "#1890ff" : "#000",
                                                    borderRadius: '5px',
                                                    'border': '1px solid #ccc',
                                                ...provided.draggableProps.style
                                                }}
                                            >
                                                <Checkbox
                                                    value={item.id}
                                                    checked={isSelectedMileStone(item.id)}
                                                    onChange={milestoneSelect}
                                                    disabled={isDetailsView}
                                                >
                                                        {item.full_name}
                                                </Checkbox>
                                                
                                            </div>
                                            );
                                        }}
                                        </Draggable>
                                    );
                                    })}
                                    {provided.placeholder}
                                </div>
                                );
                            }}
                            </Droppable>
                        </div>
                    </div>
                </Col>


                <Col span={4} style={{ display: 'grid', justifyContent: 'center', marginTop: '18%'}}>
                    {!isDetailsView ? 
                        <Icon onClick={moveToOrderList} type="arrow-right" style={{fontSize: '30px',
                            marginBottom: '10px',
                            'background': '#0084e6',
                            'color': '#fff',
                            'padding': '10px 30px',
                            borderRadius: '5px'}} 
                        /> 
                    : null}
                    {
                        context !== 'edit' ? <Icon onClick={moveToMilestoneList}  type="arrow-left" style={{fontSize: '30px',
                        marginBottom: '10px',
                        'padding': '8px 30px',
                        borderRadius: '5px',     
                        border: '1px solid #ccc' }} /> : null
                    }                    
                </Col>

                <Col span={10}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h4><span style={{color: '#f5222d'}}>*</span>{columns.orderMilestone.name}</h4>
                        <div style={{ margin: 8, border: '3px solid #f1f1f1', borderRadius: '5px'  }}>
                        <div>
                            <span>
                                <Checkbox className="ml-2 my-2" checked={isOrderSelectAll}
                                    onChange={orderListSelectAll} disabled={isDetailsView}>
                                    Select All
                                </Checkbox>
                            </span>
                            {
                                context !== 'edit' ? <span onClick={clearOrderMilestone} style={{float: 'right', marginRight: '15px', marginTop: '10px', marginBottom: '10px', color: '#0084e6', cursor: 'pointer'}}>
                                    Clear All
                                </span> : ''
                            }
                            
                        </div>

                            <Droppable droppableId='orderMilestone' key='orderMilestone'>
                            {(provided, snapshot) => {
                                return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver ? "lightblue" :'#fff',
                                        padding: '4px',
                                        width: '350px',
                                        height: '480px',
                                        overflowY: 'auto'
                                    }}
                                >
                                    {columns.orderMilestone.items.map((item, index) => {
                                    return (
                                        <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                        >
                                        {(provided, snapshot) => {
                                            return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    userSelect: "none",
                                                    padding: 16,
                                                    margin: "0 0 8px 0",
                                                    minHeight: "50px",
                                                    backgroundColor: '#fff',
                                                    color: snapshot.isDragging ? "#1890ff" : "#000",
                                                    borderRadius: '5px',
                                                    'border': '1px solid #ccc',
                                                ...provided.draggableProps.style
                                                }}
                                            >
                                                <Checkbox className="ml-2 my-2"
                                                    value={item.id}
                                                    checked={isSelectedOrder(item.id)}
                                                    onChange={orderListSelect}
                                                    disabled={isDetailsView}
                                                >
                                                    {item.full_name}
                                                </Checkbox>
                                            </div>
                                            );
                                        }}
                                        </Draggable>
                                    );
                                    })}
                                    {provided.placeholder}
                                </div>
                                );
                            }}
                            </Droppable>
                        </div>
                    </div>
                </Col>
            </Row>
          </DragDropContext>

        <Modal
            title="Create MileStone"
            visible={showAddMilestone}
            footer={false}
            onCancel={() => setShowAddMileStone(false)}
        >
            <CreateForm submit={submit} fields={fields} />
        </Modal>

        <Modal
            visible={milestoneDeleteModal}
            title="Delete Milestones"
            onCancel={() => setMilestoneDeleteModal(false)}
            footer={null}
        >
        <div className="mb-5 mt-3" style={{textAlign: 'center'}}>Are you sure you want to delete this milestone. You will not get this miltestone back.</div>

        <Button type="danger" block onClick={deleteMilestones}>Delete</Button>
      </Modal>
        </div>
    );
}

export default MilestoneConfigure;
