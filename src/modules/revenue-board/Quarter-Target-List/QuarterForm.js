import React, { useEffect, useState } from 'react'
import {Input, Radio, Col, Row, Select, DatePicker, Checkbox, Form, Icon, Button, InputNumber } from "antd";
import { Flex } from "../../commons/Flex";
import {
    KAM_TARGET_PARAM,
    KAM_TARGET_CREATE,
    KAM_TARGET_LIST
} from "../../../scripts/api";
import {getData,postData} from "../../../scripts/api-service";
import { alertPop } from "../../../scripts/message";
import moment from 'moment';

export default function QuarterForm({years, quarterModal, setQuarterModal, rowData, flag, setToggle, toggle}) {
    const [loading, setLoading] = useState();
    const [params, setParams] = useState();
    const [industryType, setIndustryType] = useState();
    const [client, setClient] = useState();
    const [quarter, setQuarter] = useState('Quarter 1');
    const [row, setRow] = useState();
    
    const [months, setMonths] = useState([
        {value: "1", text: "January"},
        {value: "2", text: "February"},
        {value: "3", text: "March"}
    ]);

    const handleIndustry = (id) =>{
        setIndustryType(id);
    }

    const handleQuarter = (quarter) =>{
        setQuarter(quarter);
    }

    const submit = async(value, form) => {
        if(flag === 'edit'){
        let months = [
            {
                "id": value.month_1_id,
                "month": value.month_1,
                "otc_amount": value.otc_1,
                "mrc_amount": value.mrc_1
            },
            {
                "id": value.month_2_id,
                "month": value.month_2,
                "otc_amount": value.otc_2,
                "mrc_amount": value.mrc_2
            },
            {
                "id": value.month_3_id,
                "month": value.month_3,
                "otc_amount": value.otc_3,
                "mrc_amount": value.mrc_3
            }
        ];

        let payload = {
            "year": value.year,
            "target_quarter": value.target_quarter,
            "kam_id": value.kam_id,
            "industry_type_id": value.industry_type_id,
            "client_id": value.client_id,
            "service_type_id": value.service_type_id,
            "service_id": value.service_id,
            "months": JSON.stringify(months),
            "otc_amount": value.otc_amount,
            "mrc_amount": value.mrc_amount,
        }
            let url = KAM_TARGET_LIST + '/' + row.id;
            const res = await postData(url, payload);
            if(res) {
                alertPop('success', "Quarter target updated successfully!");
                setQuarterModal(false);
                setToggle(!toggle);
            }
            else alertPop('error', "Cannot update quarter target!");
        }
        else{
            let months = [
                {
                    "month": value.month_1,
                    "otc_amount": value.otc_1,
                    "mrc_amount": value.mrc_1
                },
                {
                    "month": value.month_2,
                    "otc_amount": value.otc_2,
                    "mrc_amount": value.mrc_2
                },
                {
                    "month": value.month_3,
                    "otc_amount": value.otc_3,
                    "mrc_amount": value.mrc_3
                }
            ];
    
            let payload = {
                "year": value.year,
                "target_quarter": value.target_quarter,
                "kam_id": value.kam_id,
                "industry_type_id": value.industry_type_id,
                "client_id": value.client_id,
                "service_type_id": value.service_type_id,
                "service_id": value.service_id,
                "months": JSON.stringify(months),
                "otc_amount": value.otc_amount,
                "mrc_amount": value.mrc_amount,
            }
            const res = await postData(KAM_TARGET_CREATE, payload);
            if(res) {
                alertPop('success', "Quarter target created successfully!");
                setQuarterModal(false);
                setToggle(!toggle);
            }
            else alertPop('error', "Cannot create quarter target!");
        }
    }

    const getKamTargetList = async () => {
        let url = KAM_TARGET_PARAM;
        let res = await getData(url);
        let masterData = res?.data?.data;
        setParams(masterData);
    }

    const getSingleKamTarget = async () => {
        let url = KAM_TARGET_LIST + '/' + rowData.id;
        let res = await getData(url);
        let masterData = res?.data?.data;
        setRow(masterData);
    }

    useEffect(()=>{
        getKamTargetList();
        rowData && getSingleKamTarget();
    },[rowData]);

    useEffect(()=>{
        if(industryType){
            let clients = params.client.filter(item=> item.industry_type_id === industryType);
            setClient(clients);
        }
    },[industryType]);

    useEffect(()=>{
        if(flag === 'edit' && params){
            let clients = params?.client;
            setClient(clients);
        }
    },[rowData, params]);

    useEffect(()=>{
         if(quarter === 'Quarter 1'){
            let months = [
                {value: "1", text: "January"},
                {value: "2", text: "February"},
                {value: "3", text: "March"}
            ];
            setMonths(months);
        }
        if(quarter === 'Quarter 2'){
            let months = [
                {value: "4", text: "April"},
                {value: "5", text: "May"},
                {value: "6", text: "June"},
            ];
            setMonths(months);
        }
        if(quarter === 'Quarter 3'){
            let months = [
                {value: "7", text: "July"},
                {value: "8", text: "August"},
                {value: "9", text: "September"},
            ];
            setMonths(months);
        }
        if(quarter === 'Quarter 4'){
            let months = [
                {value: "10", text: "October"},
                {value: "11", text: "November"},
                {value: "12", text: "December"}
            ];
            setMonths(months);
        }
    },[quarter]);

    return <CreateForm submit={submit} loading={loading} years={years} months={months} params={params} row={row} flag={flag} handleIndustry={handleIndustry} client={client} handleQuarter={handleQuarter} quarter={quarter} quarterModal={quarterModal}></CreateForm>
}

const CreateForm = Form.create()(
    ({form, submit, loading, years, months, params, row, flag, handleIndustry, client, handleQuarter, quarter, quarterModal}) => {

        const [otc_1, setOtc_1] = useState(0);
        const [otc_2, setOtc_2] = useState(0);
        const [otc_3, setOtc_3] = useState(0);
        const [mrc_1, setMrc_1] = useState(0);
        const [mrc_2, setMrc_2] = useState(0);
        const [mrc_3, setMrc_3] = useState(0);
        const [otcAmount, setOTCAmount] = useState(0);
        const [mrcAmount, setMRCAmount] = useState(0);
        
        const localSubmit = (e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    submit(values,form);
                }
            });
        }

        const otcInput = (value, name) => {
            if(name === 'otc_1') setOtc_1(value);
            if(name === 'otc_2') setOtc_2(value);
            if(name === 'otc_3') setOtc_3(value);
        }

        const mrcInput = (value, name) => {
            if(name === 'mrc_1') setMrc_1(value);
            if(name === 'mrc_2') setMrc_2(value);
            if(name === 'mrc_3') setMrc_3(value);
        }

        //if modal closes all data will be reset
        useEffect(()=>{
            if(flag === 'create' && quarterModal === false) {
                form.setFieldsValue({
                    "year": moment().format("YYYY"),
                    "target_quarter": quarter,
                    "kam_id": undefined,
                    "industry_type_id": undefined,
                    "client_id": undefined,
                    "service_type_id": undefined,
                    "service_id": undefined,
                    "month_1": months[0].text,
                    "month_2": months[1].text,
                    "month_3": months[2].text,
                    "otc_1": undefined,
                    "otc_2": undefined,
                    "otc_3": undefined,
                    "mrc_1": undefined,
                    "mrc_2": undefined,
                    "mrc_3": undefined,
                    "otc_amount": undefined,
                    "mrc_amount": undefined,
                })
            }
        },[quarterModal]);

        //populate dropdown data
        useEffect(() => {
            if(flag === 'edit' && row){
                setOtc_1(row.months[0].otc_amount);
                setOtc_2(row.months[1].otc_amount);
                setOtc_3(row.months[2].otc_amount);
                setMrc_1(row.months[0].mrc_amount);
                setMrc_2(row.months[1].mrc_amount);
                setMrc_3(row.months[2].mrc_amount);
                setOTCAmount(row.otc_amount);
                setMRCAmount(row.mrc_amount);

                form.setFieldsValue({
                    "year": row.year,
                    "target_quarter": row.target_quarter,
                    "kam_id": row.kam_id,
                    "industry_type_id": row.industry_type_id,
                    "client_id": row.client_id,
                    "service_type_id": row.service_type_id,
                    "service_id": row.service_id,
                    "month_1_id": row.months[0].id,
                    "month_2_id": row.months[1].id,
                    "month_3_id": row.months[2].id,
                    "month_1": row.months[0].month,
                    "month_2": row.months[1].month,
                    "month_3": row.months[2].month,
                })
            }
            if(flag === 'create'){
                form.setFieldsValue({
                    "year": moment().format("YYYY"),
                    "target_quarter": quarter,
                    "kam_id": undefined,
                    "industry_type_id": undefined,
                    "client_id": undefined,
                    "service_type_id": undefined,
                    "service_id": undefined,
                    "month_1": months[0].text,
                    "month_2": months[1].text,
                    "month_3": months[2].text,
                })
            }
        }, [row, months]);

        //populate calculated data
        useEffect(() => {
                form.setFieldsValue({
                    "otc_1": otc_1,
                    "otc_2": otc_2,
                    "otc_3": otc_3,
                    "mrc_1": mrc_1,
                    "mrc_2": mrc_2,
                    "mrc_3": mrc_3,
                    "otc_amount": otcAmount,
                    "mrc_amount": mrcAmount,
                })
        }, [otc_1, otc_2, otc_3, mrc_1, mrc_2, mrc_3, otcAmount, mrcAmount]);

        useEffect(() => {
        if(flag === 'create'){
            form.setFieldsValue({
                "otc_1": undefined,
                "otc_2": undefined,
                "otc_3": undefined,
                "mrc_1": undefined,
                "mrc_2": undefined,
                "mrc_3": undefined,
                "otc_amount": undefined,
                "mrc_amount": undefined,
            })
        }
        }, []);

        //calculate otc amount
        useEffect(() => {
            setOTCAmount(otc_1 + otc_2 + otc_3);
         }, [otc_1, otc_2, otc_3]);

        //calculate mrc amount
        useEffect(() => {
            setMRCAmount(mrc_1 + mrc_2 + mrc_3);
        }, [mrc_1, mrc_2, mrc_3]);
         
        return (
            <Form onSubmit={localSubmit}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Flex justify="normal">
                            <Form.Item label={'YEAR'}>
                                {form.getFieldDecorator('year', {
                                    rules: [{required: true, message: "Required!"}],
                                })(<Select 
                                    disabled={flag === 'edit' ? true : false}
                                    showSearch
                                    getPopupContainer={trigger => trigger.parentNode}
                                    style={{width : '200px', 'marginRight': '1rem'}} 
                                    placeholder='Select Year' 
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    >
                                    {
                                        years.map(year => <Select.Option key={year} value={year}>{year}</Select.Option>)
                                    }
                                </Select>)}
                            </Form.Item>

                            <Form.Item label={'QUARTER'}>
                                {form.getFieldDecorator('target_quarter', {
                                    rules: [{required: true, message: "Required!"}],
                                })(<Select 
                                    disabled={flag === 'edit' ? true : false}
                                    showSearch
                                    getPopupContainer={trigger => trigger.parentNode}
                                    style={{width : '200px'}} 
                                    placeholder='Select Quarter'
                                    onChange={handleQuarter} 
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }>
                                    <Select.Option value="Quarter 1">Quarter 1</Select.Option>
                                    <Select.Option value="Quarter 2">Quarter 2</Select.Option>
                                    <Select.Option value="Quarter 3">Quarter 3</Select.Option>
                                    <Select.Option value="Quarter 4">Quarter 4</Select.Option>
                                </Select>)}
                            </Form.Item>
                        </Flex>

                        <Form.Item label={'INDUSTRY TYPE'}>
                            {form.getFieldDecorator('industry_type_id', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Select 
                                disabled={flag === 'edit' ? true : false}
                                showSearch
                                getPopupContainer={trigger => trigger.parentNode}
                                placeholder='Select Industry' 
                                onChange={handleIndustry}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                    {params?.industry_type.map(industry=>{
                                        return(
                                            <Select.Option key={industry.id} value={industry.id}>{industry.name}</Select.Option>
                                        )
                                    })}
                            </Select>)}
                        </Form.Item>

                        <Form.Item label={'SERVICE TYPE'}>
                            {form.getFieldDecorator('service_type_id', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Select 
                                disabled={flag === 'edit' ? true : false}
                                showSearch
                                getPopupContainer={trigger => trigger.parentNode}
                                placeholder='Select Type' 
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                    {params?.service_type.map(service=>{
                                        return(
                                            <Select.Option key={service.id} value={service.id}>{service.name}</Select.Option>
                                        )
                                    })}
                            </Select>)}
                        </Form.Item>
                    </Col>


                    <Col span={11}>
                        <Form.Item label={'KAM'}>
                            {form.getFieldDecorator('kam_id', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Select 
                                disabled={flag === 'edit' ? true : false}
                                showSearch
                                getPopupContainer={trigger => trigger.parentNode}
                                    placeholder='Select KAM' 
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }>
                                        {params?.kam.map(kam=>{
                                            return(
                                                <Select.Option key={kam.emp_id} value={kam.emp_id}>{kam.name}</Select.Option>
                                            )
                                        })}
                                </Select>)}
                        </Form.Item>

                        <Form.Item label={'CLIENT NAME'}>
                            {form.getFieldDecorator('client_id', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Select 
                                disabled={flag === 'edit' ? true : false}
                                showSearch
                                getPopupContainer={trigger => trigger.parentNode}
                                placeholder='Select Client' 
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                    {client?.map(client=>{
                                        return(
                                            <Select.Option key={client.id} value={client.id}>{client?.name}</Select.Option>
                                        )
                                    })}
                            </Select>)}
                        </Form.Item>

                        <Form.Item label={'Service Name'}>
                            {form.getFieldDecorator('service_id', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Select 
                                disabled={flag === 'edit' ? true : false}
                                showSearch
                                getPopupContainer={trigger => trigger.parentNode}
                                placeholder='Select Name' 
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                    {params?.service.map(service=>{
                                        return(
                                            <Select.Option key={service.id} value={service.id}>{service.full_name}</Select.Option>
                                        )
                                    })}
                            </Select>)}
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24} style={{border: '1px solid #D9D9D9', marginBottom: '10px', paddingTop: '10px'}}>
                    <Col span={8} style={{backgroundColor:'#F1F1F1'}}>
                        MONTH
                    </Col>
                    <Col span={8} style={{backgroundColor:'#F1F1F1'}}>
                        OTC (AMOUNT IN BDT)
                    </Col>
                    <Col span={8} style={{backgroundColor:'#F1F1F1'}}>
                        MRC/AMC (AMOUNT IN BDT)
                    </Col>

                    <Col span={8} className="mt-4">
                        {flag === 'edit'? 
                            <Form.Item style={{display:"none"}}>
                                {form.getFieldDecorator('month_1_id', {
                                    rules: [{required: true, message: "Required!"}],
                                })(<Input/>)}
                            </Form.Item>
                        :null}
                        <Form.Item>
                            {form.getFieldDecorator('month_1', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Select showSearch
                                placeholder='Select Month'
                                disabled
                                style={{backgroundColor:'#F1F1F1', fontWeight: '700'}}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {months.map(month => <Select.Option key={month.value} value={month.text}>{month.text}</Select.Option>)}
                            </Select>)}
                        </Form.Item>

                        {flag === 'edit'? 
                            <Form.Item style={{display:"none"}}>
                                {form.getFieldDecorator('month_2_id', {
                                    rules: [{required: true, message: "Required!"}],
                                })(<Input />)}
                            </Form.Item>
                        :null}
                        <Form.Item>
                            {form.getFieldDecorator('month_2', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Select showSearch
                                placeholder='Select Month'
                                disabled
                                style={{backgroundColor:'#F1F1F1', fontWeight: '700'}} 
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {months.map(month => <Select.Option key={month.value} value={month.text}>{month.text}</Select.Option>)}
                            </Select>)}
                        </Form.Item>

                        {flag === 'edit'? 
                            <Form.Item style={{display:"none"}}>
                                {form.getFieldDecorator('month_3_id', {
                                    rules: [{required: true, message: "Required!"}],
                                })(<Input />)}
                            </Form.Item>
                        :null}
                        <Form.Item>
                            {form.getFieldDecorator('month_3', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Select showSearch
                                placeholder='Select Month'
                                disabled
                                style={{backgroundColor:'#F1F1F1', fontWeight: '700'}}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {months.map(month => <Select.Option key={month.value} value={month.text}>{month.text}</Select.Option>)}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={8} className="mt-4">
                        <Form.Item>
                            {form.getFieldDecorator('otc_1', {
                                rules: [{required: true, message: "Required!"}],
                            })(<InputNumber placeholder="Enter Value" style={{width: "100%"}} min={0} onChange={(value) => otcInput(value, 'otc_1')}/>)}
                        </Form.Item>
                        <Form.Item>
                            {form.getFieldDecorator('otc_2', {
                                rules: [{required: true, message: "Required!"}],
                            })(<InputNumber placeholder="Enter Value" style={{width: "100%"}}min={0} onChange={(value) => otcInput(value, 'otc_2')}/>)}
                        </Form.Item>
                        <Form.Item>
                            {form.getFieldDecorator('otc_3', {
                                rules: [{required: true, message: "Required!"}],
                            })(<InputNumber placeholder="Enter Value" style={{width: "100%"}}min={0} onChange={(value) => otcInput(value, 'otc_3')}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={8} className="mt-4">
                        <Form.Item>
                            {form.getFieldDecorator('mrc_1', {
                                rules: [{required: true, message: "Required!"}],
                            })(<InputNumber  placeholder="Enter Value" style={{width: "100%"}} min={0} onChange={(value) => mrcInput(value, 'mrc_1')}/>)}
                        </Form.Item>
                        <Form.Item>
                            {form.getFieldDecorator('mrc_2', {
                                rules: [{required: true, message: "Required!"}],
                            })(<InputNumber  placeholder="Enter Value" style={{width: "100%"}} min={0} onChange={(value) => mrcInput(value, 'mrc_2')}/>)}
                        </Form.Item>
                        <Form.Item>
                            {form.getFieldDecorator('mrc_3', {
                                rules: [{required: true, message: "Required!"}],
                            })(<InputNumber placeholder="Enter Value" style={{width: "100%"}} min={0} onChange={(value) => mrcInput(value, 'mrc_3')}/>)}
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24} style={{display: 'flex', alignItems:'center',border: '1px solid #D9D9D9', paddingTop:'20px'}}>
                    <Col span={8}>
                        <Form.Item>
                            {form.getFieldDecorator('quaterly_total')(<Input placeholder="Quarterly Total" style={{backgroundColor:'#F1F1F1', fontWeight: '700'}} disabled/>)}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            {form.getFieldDecorator('otc_amount', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Input placeholder="OTC Amount" style={{backgroundColor:'#F1F1F1', fontWeight: '700', color: '#0084E6'}}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            {form.getFieldDecorator('mrc_amount', {
                                rules: [{required: true, message: "Required!"}],
                            })(<Input placeholder="MRC Amount" style={{backgroundColor:'#F1F1F1', fontWeight: '700', color: '#0084E6'}}/>)}
                        </Form.Item>
                    </Col>
                </Row>

                <Flex space="1rem" justify="flex-end">
                    <Button
                            style={{width: 'auto'}}
                            // loading={loading}
                            // block
                            type="primary"
                            htmlType="submit"
                        >
                            {flag === 'edit' ? 'Update' : 'Create New'}
                    </Button>
                </Flex>
            </Form>
        )
    }
);
