import { Button, Divider, Modal, Skeleton, Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getData } from "../../../scripts/api-service";
import { Flex } from "../../commons/Flex";
import { PageTitle } from "../../commons/PageTitle";
import SearchFilter from "../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../commons/Wrapper";
import AddNew from "./AddNew";

/*
    These are newer modules and ant design Tables are used instead
    of custom designed Tables in the project commons directory
*/

const ConfigView = ({
  columns,
  title, 
  title_extension,
  list_api,
  create_submit_api,
  edit_submit_api,
  form_fields,
  edit,
  setEdit,
  isView,
  flag,
  setColor,
  departmentList,
  selectedDepartment,
  setSelectedDepartment,
  functionTypeList,
  categoryDropdownList,
  setSelectedCategory,
  selectedCategory,
  companyList,
  setSelectedCompany,
  selectedCompany,
  manageListData
}) => {
  const [modal, setModal] = useState();
  const [list, setList] = useState();
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState();
  const [dateFilter, setDateFilter] = useState();
  const [functionType, setFunctionType] = useState();

  const view = async (que) => {
    setList(null);
    let url = que + '?page='+ currentPage;

    if (searchString) url = url + "&search=" + searchString;
    if (dateFilter && dateFilter.date_from && dateFilter.date_to) url = url + `&from_date=${dateFilter.date_from}&to_date=${dateFilter.date_to}`;
    if (selectedDepartment) url = url + "&department_id=" + selectedDepartment;
    if (functionType) url = url + "&function_type_id=" + functionType;
    if (selectedCategory) url = url + "&eom_category_id=" + selectedCategory;
    if (selectedCompany) url = url + "&company_id=" + selectedCompany;
    

    let res = await getData(url);

    if (res?.data?.data?.data) {
      let masterData = res?.data?.data?.data;
      setList(masterData);
      setPageCount(res?.data?.data?.last_page);

      if (title === 'Service/Product Setup') {
        let newData = [];
        masterData.forEach(data => {
          data['department_details'] = data?.departments;
          data['departments'] = data?.departments?.map(item=> item.id);
          newData.push(data);
        });
        setList(newData);
      }

      if(!isView){
        if (title === 'Team') {
          let newData = [];
          masterData.forEach(team => {
            if (team?.members?.length) {
              team.employees = team.members.map(man => man.emp_id);
            };
            newData.push(team);
          });
          setList(newData);
        }

        if (title === 'Project Management') {
          let newData = [];
          masterData.forEach(project => {
            if (project?.managements?.length) {
              project.emp_ids = project.managements.map(man => man.emp_id);
            };
            project.project_id = project.id;
            newData.push(project);
          });
          setList(newData);
          manageListData(newData);
        }
      }
    }
  };

  const search = (value) => setSearchString(value);
  const filter = (filter) => setDateFilter(filter);

  const functionActivityFilter = () =>{
    return (
      <>
        <Select allowClear={true} style={{width: '20%', 'marginRight': '1rem'}} 
          placeholder='Department'
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0}
          onChange={(value)=>setSelectedDepartment(value)}
        >
          {departmentList && departmentList.length 
              ? departmentList.map((dep) => {
                  return (
                      <Select.Option key={dep.id} 
                          value={dep.id}
                      >
                          {dep.name}
                      </Select.Option>
                  )})
              : ""
          }
        </Select> 
        <Select allowClear={true} style={{width: '20%', 'marginRight': '1rem'}} 
          placeholder='Function Type'
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0}
          onChange={(value)=>setFunctionType(value)}
        >
          {functionTypeList && functionTypeList.length 
              ? functionTypeList.map((func) => {
                  return (
                      <Select.Option key={func.id} 
                          value={func.id}
                      >
                          {func.name}
                      </Select.Option>
                  )})
              : ""
          }
        </Select>
      </>
    )
  }
  

  const functionTypeFilter = () =>{
    return (
      <>
        <Select allowClear={true} style={{width: '25%', 'marginRight': '1rem'}} 
          placeholder='Select Department'
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0}
          onChange={(value)=>setSelectedDepartment(value)}
        >
          {departmentList && departmentList.length 
              ? departmentList.map((dep) => {
                  return (
                      <Select.Option key={dep.id} 
                          value={dep.id}
                      >
                          {dep.name}
                      </Select.Option>
                  )})
              : ""
          }
        </Select>
      </>
    )
  }

  useEffect(() => {
    view(list_api);
  }, [currentPage, selectedDepartment, functionType, selectedCategory, selectedCompany]);

  useEffect(() => {
    if (currentPage === 1) view(list_api);
    else setCurrentPage(1);
  }, [dateFilter, searchString]);

  return (
    // <TableWrapper>
    <Wrapper>
      <SearchFilter
        search={search}
        filter={title === 'Project Management' ? null : filter }
        filterOptions={[{ type: "date_range" }]}
        failsafe
      />
      <Flex space="1rem" justify="space-between">
        <PageTitle>{title}</PageTitle>
        { flag  === 'function-activity' ? functionActivityFilter()
          : flag  === 'function-type' ? functionTypeFilter()
        :null}
        {flag === "category" || flag === "subCategory" || flag === "color" ? null :
        <Button onClick={() => setModal(true)} width="40%" type="primary">
          Create New {title_extension}
        </Button>}
      </Flex>
      <Divider />
      {list ? (
        <Table
          rowKey={record => record.id}
          dataSource={list}
          columns={columns}
          // scroll={{ y: "calc(100vh - 22rem)" }}
          pagination={{
            current: currentPage,
            total: pageCount * 10,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      ) : (
        <Skeleton active className="pad" />
      )}
      {modal && (
        <Modal
          title={`Create New ${title_extension}`}
          centered
          visible={true}
          onCancel={() => setModal(false)}
          footer={false}
          maskClosable={false}
        >
          <AddNew
            setModal={setModal}
            fields={form_fields}
            refresh={view}
            list_api={list_api}
            create_api={create_submit_api}
            flag={flag}
            setColor={setColor}
          />
        </Modal>
      )}
      <Modal
        title={isView ? `${title_extension} Details` : `Edit ${title_extension}`}
        centered
        visible={edit}
        onCancel={() => setEdit(null)}
        footer={false}
        maskClosable={false}
      >
        <AddNew
          setModal={setEdit}
          fields={form_fields}
          refresh={view}
          edit={edit}
          list_api={list_api}
          edit_api={edit_submit_api}
          isView={isView}
          flag={flag}
          setColor={setColor}
          title={title}
        />
      </Modal>
    </Wrapper>
  );
};

export default ConfigView;
