import React, {useState, useEffect} from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card, Tag, Row, Col } from 'antd';
import attachmentIcon from "../../../../assets/attached.svg";
import {openAttchment} from "../../../../scripts/helper";

const columnsFromBackend = {
    'To-Do': {
      name: "To-Do",
      items: []
    },
    'WIP': {
        name: "WIP",
        items: []
    },
    'Hold': {
        name: "Hold",
        items: []
    },
    'Done': {
      name: "Done",
      items: []
    },
    'Reviewed': {
        name: "Reviewed",
        items: []
    },
};

export default function TaskBoard(props) {
    const {detailsModalShow, useActivity, updateActionStatus, setRowData} = props;
    const [columns, setColumns] = useState(columnsFromBackend);

    useEffect(() => {
        if (useActivity) {
            let todoItems=[],
                wipItems = [],
                holdItems = [],
                doneItems= [],
                reviewedItems = [];

            useActivity.forEach(val => {
                val.id = val.id.toString();

                if (val.status === "To-Do") todoItems.push(val);
                if (val.status === "WIP") wipItems.push(val);
                if (val.status === "Hold") holdItems.push(val);
                if (val.status === "Done") doneItems.push(val);
                if (val.status === "Reviewed") reviewedItems.push(val);
            })

            setColumns((prevState) => ({
                ...prevState,
                'To-Do': {
                    ...prevState,
                    name: 'To-Do',
                    items: todoItems,
                }
            }));

            setColumns((prevState) => ({
                ...prevState,
                'WIP': {
                    ...prevState,
                    name: 'WIP',
                    items: wipItems,
                }
            }));

            setColumns((prevState) => ({
                ...prevState,
                'Hold': {
                    ...prevState,
                    name: 'Hold',
                    items: holdItems,
                }
            }));

            setColumns((prevState) => ({
                ...prevState,
                'Done': {
                    ...prevState,
                    name: 'Done',
                    items: doneItems,
                }
            }));


            setColumns((prevState) => ({
                ...prevState,
                'Reviewed': {
                    ...prevState,
                    name: 'Reviewed',
                    items: reviewedItems,
                }
            }));
        }
    }, [useActivity])

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        
        if(source.droppableId === "To-Do" && destination.droppableId === "Reviewed") return;
        if(source.droppableId === "WIP" && destination.droppableId === "Reviewed") return;
        if(source.droppableId === "Hold" && destination.droppableId === "Reviewed") return;

        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columns[source.droppableId];
          const destColumn = columns[destination.droppableId];
          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
          });

          updateActionStatus({activityId: draggableId, status: destination.droppableId});
        
        // Show activity details modal 
        let activity = useActivity.find(activity => activity.id == draggableId);
        if (activity) {
            activity.status = destination.droppableId;
            detailsModalShow(activity);
            setRowData(activity);
        }
        // ----------- ///

        //   statusContainer()
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
        }
    };

    const selectColumn = (data) => {
        detailsModalShow(data);
        setRowData(data);
    }

    const milestoneCount = (items) => {
        return `${items.length || 0} ${items.length < 2 ? 'Issue' : 'Issues'}`;
    }

    return (
        <div className="sc-dKEPtC">
            <div className="sc-dBAPYN">
                <div className="sc-sdgfhjsdg">
                    <div className="sc-wrwerwe">
                        <section className="sc-section">
                            <div className="sc-contentrr">  {/* style={{ display: "flex", height: "100%", marginLeft: '1rem', marginTop: '1rem' }} */}
                                <DragDropContext
                                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
                                >
                                    {Object.entries(columns).map(([columnId, column], index) => {
                                    return (
                                        <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            background: "#f6f6f6",
                                            borderRadius: "5px",
                                            marginRight: '2rem',
                                            border: '1px solid #ccc'
                                        }}
                                        key={columnId}
                                        >
                                            <div style={{padding: '1rem 0 0 1rem'}}>
                                                <h2>{column.name} - {milestoneCount(column.items)}</h2>
                                            </div>
                                            <div style={{ margin: 8, overflowY: 'auto' }}>
                                                <Droppable droppableId={columnId} key={columnId}>
                                                {(provided, snapshot) => {
                                                    return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "lightblue"
                                                            : "transparent",
                                                        padding: 4,
                                                        width: '20rem',
                                                        // minHeight: 500
                                                        // react-beautiful-dnd has a bug. User cannot drag and drop card if there is no card immediately to the next column. To avoid it we need to set maxHeight
                                                        maxHeight: 500,
                                                        overflowY: 'scroll'
                                                        }}
                                                    >
                                                        {column?.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                            >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    // onClick={() => {selectColumn(item)}} open this task deatils
                                                                    <div ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: "none",
                                                                            margin: "0 0 8px 0",
                                                                            minHeight: "50px",
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? "#c9d7f0"
                                                                                : "#fff",

                                                                            ...provided.draggableProps.style
                                                                        }} >
                                                                        
                                                                        <Card style={item.isOverDue && (column.name === 'To-Do' || column.name === 'WIP' || column.name === 'Hold') 
                                                                            ? {border: '2px solid red'} : {border: 'none'}} className="mb-0">
                                                                            <span>{item.priority?.name}</span>
                                                                            <h4 className="mt-1 mb-2">{item.title}</h4>
                                                                            <p>{item?.function_type?.name}</p>
                                                                            {item?.function_name?.name ?  
                                                                                <Tag color="purple" className="mr-4">{item?.function_name?.name}</Tag>
                                                                            : null}
                                                                            <div className="mt-3">
                                                                                <Row gutter={8}>
                                                                                    <Col span={24}>
                                                                                        <span className="">Estimated Time: {item?.estimated_time}</span>
                                                                                    </Col>
                                                                                    <Col span={12}>
                                                                                        <span className=""><span className="text-primary"># </span>{item?.id}</span>
                                                                                    </Col>
                                                                                    <Col span={12}>
                                                                                    {
                                                                                        item.attachment ? <img src={attachmentIcon} onClick={() => {openAttchment(item.attachment)}} alt="attachement" style={{float: 'right', marginTop: '-3px'}}
                                                                                        width="25" height="25" /> : ''
                                                                                    }
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row gutter={8}>
                                                                                    <Col span={12}>
                                                                                        <p style={{margin: "10px 0px"}}>{item?.repeats ? item?.repeats : ''}</p>
                                                                                    </Col>
                                                                                    <Col>
                                                                                    {/* {
                                                                                        item?.review?.name ? <span style={{color: item?.review?.color, margin: "10px 10px", float: 'right'}}>
                                                                                            {item?.review?.name}
                                                                                        </span> : ''
                                                                                    } */}
                                                                                    {
                                                                                        item.isOverDue && (column.name === 'To-Do' || column.name === 'WIP' || column.name === 'Hold') 
                                                                                            ? <span style={{color: 'red', margin: "10px 10px", float: 'right'}}>Overdue</span> : ''
                                                                                    }
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        </Card>
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
                                        );
                                    })}
                                </DragDropContext>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
