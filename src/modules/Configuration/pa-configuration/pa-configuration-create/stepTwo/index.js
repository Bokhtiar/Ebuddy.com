import React, { Fragment, useState, useEffect } from "react";
import { Input, Collapse, Row, Col, Select, Checkbox, Form } from "antd";

const stepTwo = Form.create()(
  ({ form, departments, selectedDepartment, selectDepartment, categoryList, subCategoryList, steps, current }) => {

const subCategorySum = (category) =>{
  if(subCategoryList){
    let result = 0;
    for(let cat=0; cat < subCategoryList.length; cat++){
      if(category.id === subCategoryList[cat].category?.id)
      result +=  subCategoryList[cat].weight;
    }
    return result;
  }
}

    return(
        <Fragment>
          {/* <Row style={{border: '1px solid #E8E8E8', padding : '1rem', margin : '1rem 0px', borderRadius: '5px'}}>
            <Col span={12}>
              <p>Department Name</p>
              <strong>Engineering</strong>
            </Col>
            <Col span={12}>
              <p>Category Name</p>
              <strong>Core Objectives</strong>
            </Col>
          </Row> */}
          {steps[current].id === 2 ?
          <Row gutter={16}>
              <p>Select Sub Category</p>
              {categoryList ? 
              categoryList.map(category=>{
                return(
                  <Col span={12} className="mt-2 mb-2">
                    <Collapse
                      defaultActiveKey={1}
                      expandIconPosition='right'
                      bordered="true"
                      >
                      <Collapse.Panel 
                          header={
                          <div style={{display:'flex', justifyContent:"space-between"}}>
                              <p className="mt-2">Category: {category.name}</p>
                              <p className="mt-2 ml-5">Total Weight : {subCategorySum(category)}/{category.weight}</p>
                          </div>
                          } 
                          key={1}
                      >
                          <Fragment>
                            {subCategoryList ? 
                            subCategoryList?.map(subCat => {
                              return(
                                <>
                                {category.id === subCat.category?.id ? 
                                  <>
                                    <Row gutter={16} style={{display:'flex', alignItems:'center'}}>
                                      <Col span={12}>
                                        {/* <Checkbox checked>{subCat.name}</Checkbox> */}
                                        {subCat.name}
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item >
                                          {form.getFieldDecorator('weight', {
                                              rules: [{required: true, message: "Required!"}],
                                              initialValue: subCat.weight
                                          })(<Input size="medium" disabled/>)}
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                    <hr style={{margin:'1rem 0'}}/>
                                  </>
                                :null}
                                </>
                            )}): null}
                        </Fragment>
                      </Collapse.Panel>
                  </Collapse>
                </Col>
              )}):null}
          </Row>
          :null}
        </Fragment>
    )
})

export default stepTwo;