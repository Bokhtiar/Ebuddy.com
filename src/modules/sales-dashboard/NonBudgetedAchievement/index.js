import React, {useState, useEffect, useReducer} from 'react';

import {Table, Row, Col, PageHeader, Empty} from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Creators} from '../../../@state/reducers/salesDashboard.reducer';
import {compose} from 'redux';
import DateRangePicker from './DateRangePicker';
import {selectCurrentPage, selectNonBudgeAchivements, selectSearchQuery, selectTo, selectTotal} from '../../../@state/selectors/salesDashboard.selector';
import {Status} from '../../../@statics/Status';
import StatusFilter from './StatusFilter';
import {Layout, Space} from 'antd';
import {Wrapper} from '../../commons/Wrapper';
import {ErrorPage} from '../../commons/ErrorPage';
import {columns} from './columns';
import {QueryKey} from '../../../@infrastructure/QueryKey';
import useQueryBuilder from '../../../@infrastructure/useQueryBuilder';
import NonBudgetedAchievementStyle from './NonBudgetedAchievementStyle';
const {Header, Footer, Sider, Content} = Layout;
// import findLastKey from 'lodash/findLastKey'

const NonBudgetedAchievement = ({
    getNonBudgeAchievementAction,
    nonBudgetedAchievements,
    searchQuery,
    setSearchQueryAction,
    to,
    total,
    currentPage
}) => {

    const cols = columns;
    
    const {pageHeaderWrapper, filterWrapper} = NonBudgetedAchievementStyle;

    useEffect(() => {
        getNonBudgeAchievementAction('');
    }, []);

    const queryString = useQueryBuilder(searchQuery);

    useEffect(()=>{        
        if(searchQuery !== Status.INITIAL) {
            getNonBudgeAchievementAction(queryString);
        }
        console.log(to, total);
    },[searchQuery])
    return (
        <>
            <Wrapper>
                <PageHeader
                    style={pageHeaderWrapper}
                    title="Non-Budgeted Achievements"
                    extra={[
                        <div style={filterWrapper}>
                            <StatusFilter setSearchQuery={setSearchQueryAction} />
                            <DateRangePicker setSearchQuery={setSearchQueryAction} />
                        </div>

                    ]}
                />
                {(nonBudgetedAchievements.length && nonBudgetedAchievements !== Status.INITIAL) ? (
                    <Table
                        columns={cols}
                        dataSource={nonBudgetedAchievements}
                        scroll={{
                            y: 500,
                        }}
                        pagination={{
                            defaultPageSize: to,
                            // position: ["bottomCenter"],
                            total: total,
                            // showSizeChanger: true,
                            current: currentPage, 
                            onChange: (page, pageSize) => setSearchQueryAction({key: 'page', value: page}),
                          }}
                    />
                ) : <Empty />}
            </Wrapper>

        </>
    );
};

const mapStateToProps = createStructuredSelector({
    nonBudgetedAchievements: selectNonBudgeAchivements,
    searchQuery: selectSearchQuery,
    to: selectTo,
    total: selectTotal,
    currentPage: selectCurrentPage,
});

const mapDispatchToProps = {
    getNonBudgeAchievementAction: Creators.getNonBudgeAchivements,
    setSearchQueryAction: Creators.setSearchQuery
};
const enhanced = compose(connect(mapStateToProps, mapDispatchToProps));
export default enhanced(NonBudgetedAchievement);