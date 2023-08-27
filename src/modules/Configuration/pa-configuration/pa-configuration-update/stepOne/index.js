import React, { Fragment, useState, useEffect } from "react";
import { Input, Collapse, Row, Col, Select, Checkbox, Form } from "antd";
import { postData } from "../../../../../scripts/api-service";
import { PA_CATEGORY_CONFIGURATION_CREATE } from "../../../../../scripts/api";

const stepOne = Form.create()(
  ({ form, departments, selectedDepartment, selectDepartment, categoryList, steps, current }) => { 
    
    const categorySum = () =>{
      if(categoryList){
        let result = 0;
        for(let cat=0; cat < categoryList.length; cat++){
          result +=  categoryList[cat].weight;
        }
        return result;
      }
    }

    const localSubmit = () =>{
      form.validateFields((err, values) => {
        if (!err) {
        }
    });
      // let payload = {
      //   "data": [
      //     {
      //         "pa_category_id": 1,
      //         "weight": 80,
      //         "status": 1
      //     },
      //     {
      //         "pa_category_id": 2,
      //         "weight": 20,
      //         "status": 1
      //     }
      //   ]
      // }
      // let res = await postData(PA_CATEGORY_CONFIGURATION_CREATE, payload);

      //   if (res) {
      //       console.log('result>>>>>>>>>>', res);
      //   }
    }

    return(
        <>
        {steps[current].id === 1 ?
          <Row gutter={16}>
            {/* <Col span={12}>
                <p>Department Name</p>
                <Select 
                    allowClear={true}
                    style={{width: '100%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder='Select Department'
                    value={selectedDepartment ? selectedDepartment : undefined }
                    onChange={selectDepartment}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                >   
                    {
                        departments?.length ? 
                            departments.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
                    }
                </Select>
            </Col> */}
            <Col span={24}>
              <p>Select Category</p>
              <Collapse
                defaultActiveKey={1}
                expandIconPosition='right'
                bordered="true"
                >
                <Collapse.Panel 
                    header={
                    <div style={{display:'flex', justifyContent:"space-between"}}>
                        <p className="mt-2">Category</p>
                        <p className="mt-2 ml-5">Total Weight : {categorySum()}/100</p>
                    </div>
                    } 
                    key={1}
                >
                    <Fragment>
                      {categoryList ? 
                        categoryList.map(category=>{
                        return(
                          <Form 
                            onSubmit={localSubmit}
                            key={category.name}
                          >
                          <Row gutter={16} style={{display:'flex', alignItems:'flex-start'}}>
                              <Col span={18}>
                                {/* <Form.Item>
                                  {form.getFieldDecorator('pa_category_id', {
                                      rules: [{required: true, message: "Required!"}],
                                  })(<Checkbox checked>{category.name}</Checkbox>)}
                                </Form.Item> */}
                                {category.name}
                              </Col>
                              <Col span={6}>
                                <Col span={8} style={{marginTop: "10px", fontSize: "12px"}}>Weight:</Col>
                                <Col span={16}>
                                  <Form.Item >
                                    {form.getFieldDecorator('weight', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: category.weight
                                    })(<Input size="medium" disabled/>)}
                                  </Form.Item>
                                </Col>
                              </Col>
                          </Row>
                          <hr style={{margin:'1rem 0'}}/>
                        </Form>
                      )}):null}
                    </Fragment>
                </Collapse.Panel>
            </Collapse>
            </Col>
          </Row>
        :null}
        </>
    )
})

export default stepOne;
