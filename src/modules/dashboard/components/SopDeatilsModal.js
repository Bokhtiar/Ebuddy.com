import { Card, Col, Modal, Row } from "antd";
import React from "react";

const SopDeatilsModal = ({ isVisible = false, closeModal, sop }) => {
    console.log(sop);
    return (
        <Modal
          title=""
          visible={isVisible}
          onOk={closeModal}
          onCancel={closeModal}
          width={800}
        >
            <Row gutter={32} style={{margin: '0.5rem 0.5rem 0 0'}}>
                <Col span={24}>
                    <p>
                        <span><strong>Activity Id # {sop?.code}</strong></span> &nbsp;&nbsp;&nbsp;
                        <span>{`(SOP init Id # ${sop?.initiate_code || '----'})`}</span>
                    </p>
                    <h2>{sop?.title}</h2>
                </Col>
            </Row>
            <hr className="line-top-border"/>
            <Row gutter={32}>
                <Col span={17} style={{ borderRight: '1px solid #ccc', minHeight: '80vh' }}>
                    
                    <div>
                        <p>Details</p>
                        <Card style={{width: '100%'}}>
                            <p>{sop?.note || 'N/A'}</p>
                        </Card>
                    </div>

                    
                </Col>

                <Col span={7}>
                    <div className="mb-4">
                        <span>Function Type</span>
                        <h3 className="mt-1">{sop?.function_type?.name || ''}</h3>
                    </div>
                    <div className="mb-4">
                        <span>Function Name</span>
                        <h3 className="mt-1">{sop?.function_name?.name || ''}</h3>
                    </div>

                    <div className="mb-4">
                        <label>Assignee Name</label>
                        <h3 className="mt-1">{sop?.assignee?.name || ''}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Reporter Name</span>
                        <h3 className="mt-1">{sop?.reporter?.name || ''}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Start Date</span>
                        <h3 className="mt-1">{sop?.start_date || ''}</h3>
                    </div>
                    <div className="mb-4">
                        <span>End Date</span>
                        <h3 className="mt-1">{sop?.due_date || ''}</h3>
                    </div>
                    <div className="mb-4">
                        <span>Estimated Time (Minutes)</span>
                        <h3 className="mt-1">{sop?.estimation_time || ''}</h3>
                    </div>
                </Col>
            </Row>

        </Modal>
    )
}

export default SopDeatilsModal;