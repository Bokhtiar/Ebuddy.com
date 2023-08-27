import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { DatePicker, Radio } from 'antd';
import { Creators } from '../../../@state/reducers/salesDashboard.reducer';
import { QueryKey } from '../../../@infrastructure/QueryKey';
const { RangePicker } = DatePicker;

export const DateRangePicker = ({
    setSearchQuery
}) => {
    return (
        <>
            <RangePicker onChange={(dates,dateStrings)=> {
                // searchByDateRangeAction(dateStrings);
                setSearchQuery({key: QueryKey.FROM_DATE, value: dateStrings[0]})
                setSearchQuery({key: QueryKey.TO_DATE, value: dateStrings[1]})
            }} />
        </>
    )
};

export default DateRangePicker;