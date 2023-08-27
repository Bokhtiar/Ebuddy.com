import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, PageHeader, Icon, Descriptions, Row, Col} from "antd";
import { alertPop } from "../../../../scripts/message";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { getData } from "../../../../scripts/api-service";
import { FIND_EMPLOYEE_PA, PA_SCORE_LIST } from "../../../../scripts/api"
import TableView from './TableView';
import ChartView from './ChartView';
import TableChart from './TableChart';
import jsPDF from 'jspdf';
import '../../../../styles/pa.scss';

const PAFillUpDetails = () => {
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [employeePA, setEmployeePA] = useState();
    const [paScoreList, setPAScoreList] = useState();

    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsEmployee = params.get('emp_id');
    let paramsYear = params.get('year');
    let paramsEmployeeName = params.get('empName');
    let paramsDepartment = params.get('departmentName');
    let emp_id = paramsEmployee ? paramsEmployee * 1 : undefined;
    let year = paramsYear ? paramsYear * 1 : undefined;

    const generatePDF = () =>{
        setLoading(true);
        setShowButton(true);
        // for Reference, visit https://github.com/parallax/jsPDF/blob/ddbfc0f0250ca908f8061a72fa057116b7613e78/jspdf.js#L59

        // let doc = new jsPDF('p','pt',[1250, 1300]);
        let doc = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: [1250, 1300],
            drawColor: "FFFFFF"
        });
        doc.html(document.querySelector('#pa-details'), {
            callback: function(pdf){
                pdf.save('pa_details_chart.pdf');
                setShowButton(false);
            }
        })

        setLoading(false);
    }

    const getEmployeePA = async () => {
        let url = FIND_EMPLOYEE_PA + '?year=' + year + '&empid=' + emp_id;
        let res = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data || [];
            setEmployeePA(masterData);
        }
    }

    const getPAScore = async () => {
        let res = await getData(PA_SCORE_LIST);
  
        if (res) {
          let masterData = res?.data?.data?.data;
          setPAScoreList(masterData)
        }
    };

    const totalScoreCalculation = () => {

        let totatEmployeeCoreScore = 0;
        let totatEmployeePersonalScore = 0;
        let paCoreWeight = 0;
        let paPersonalWeight = 0;

        
        if(employeePA){
            console.log("employeePA", employeePA.length);
            employeePA.forEach(items => {
                items.pa_emp_categories.forEach(item=>{
                    if (item.pa_category_name === "CORE") {
                        totatEmployeeCoreScore += item.emp_score;
                        paCoreWeight = item.pa_weight;
                    }
                    if (item.pa_category_name === "BEHAVIOR & PERSONAL SKILLS") {
                        totatEmployeePersonalScore += item.emp_score;
                        paPersonalWeight = item.pa_weight;
                    }
                })
            });
        }

        // (total score / how many pa ) and converting the score to its corresponsding pa weight

        let empScore = (((totatEmployeeCoreScore / employeePA?.length) * paCoreWeight) / 100) + (((totatEmployeePersonalScore / employeePA?.length) * paPersonalWeight) / 100);
        
        let score = paScoreList?.find(s => s.mark_start <= empScore && s.mark_end >= empScore);

        if (score) {
            document.getElementById(`pa-score-details`).innerHTML = `<p style="color: ${score?.color}; float: right">${score?.name}</p>`;
        }
        
        return empScore.toFixed(2);
    }

    useEffect(()=>{
        getEmployeePA();
        getPAScore();
    },[emp_id, year])

    return (
        <Wrapper>
            <div>
                <PageHeader
                style={{border: '1px solid rgb(235, 237, 240)'}}
                backIcon={<Icon type="left" />}
                title={`Employee Name: ${paramsEmployeeName}`}
                // subTitle={`Department: Engineering`}
                extra={[
                    <div key={`employee-${emp_id}`} style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
                            <span>Total Score(Out of 100) : {totalScoreCalculation()} / 100</span>
                            <p id="pa-score-details"></p>
                        </div>
                        <div style={{marginLeft: '4rem'}}>
                            <Button 
                                type="primary"
                                onClick={()=> generatePDF()}
                                loading={loading}
                                hidden={showButton}
                            >Export PDF</Button>
                        </div>
                    </div>
                ]}
                >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Department">{paramsDepartment}</Descriptions.Item>
                </Descriptions>
                </PageHeader>
                <Row gutter={32}>
                    <Col span={11} className="m-2">
                        <TableView data={employeePA}/>
                    </Col>
                    <Col span={12} className="m-2">
                        <ChartView employeePAData={employeePA}/>
                    </Col>
                </Row>
                <Row gutter={32} className="mx-2 my-2">
                    <Col span={8}>
                        <p><strong>Status Legend</strong></p>
                        <div style={{display: 'flex'}}>
                            <p><span className=" box high"></span>High</p>
                            <p><span className=" box medium"></span>Medium</p>
                            <p><span className=" box low"></span>Low</p>
                        </div>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={24} className="my-4 mx-2">
                        <TableChart employeePAData={employeePA}/>
                    </Col>
                </Row>
            </div>
        </Wrapper>
    )
}

export default PAFillUpDetails