import React, {useState} from 'react'
import {ConversationTable} from './ConversationTable';
import './ConversationTrack.css'
import {Flex} from "../../commons/Flex";
import {DatePicker} from "antd";
import Search from "antd/es/input/Search";
import moment from "moment";

export const ConversationTracks = ({mdDashboard}) => {
    const { RangePicker } = DatePicker;
    const [conversionTaskDateRange, setConversionTaskDateRange] = useState([moment().subtract(7, 'days').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")])

    const [searchText, setSearchText] = useState('');

    const handleSearchText = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <div className='meeting__conversation_tracks'>
            <h3 className='meeting__conversation_tracks_header'>Meeting/Conversation Tracks</h3>
            <Flex space=".2rem 0 .8rem 0" justify="normal">
                <Search placeholder="Search meeting" style={{marginRight: ".8rem"}} value={searchText}
                        onChange={handleSearchText}/>
                <RangePicker defaultValue={[moment().subtract(7, 'days'), moment()]} style={{width: 300}}
                            onChange={(date, dateString) => setConversionTaskDateRange(dateString)}/>
            </Flex>
            <ConversationTable selectedDate={conversionTaskDateRange} searchQuery={searchText} mdDashboard={mdDashboard}/>
        </div>
    )
}
