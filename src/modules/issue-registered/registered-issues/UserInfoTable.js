import React from 'react';
import { Table, Divider, Tag } from 'antd';

export default function UserInfoTable(){
    return(
        <table id="data-table px-5" className="my-2">
            <tbody>
                <tr>
                    <td className="t-header " rowspan={2} colspan={2}>HR ISSUE REGISTER</td>
                    <td className="t-header " rowspan={2}></td>
                    <td className="t-header " rowspan={2}></td>
                    <td className="t-header " >MAINTAINED BY</td>
                    <td className='t-header ' >REVIEWED BY</td>
                    <td className='t-header ' >PERIOD</td>
                </tr>
                <tr>
                    <td className="t-body">Samiul Islam, Software Associate</td>
                    <td className="t-body">Samiul Islam, Software Associate</td>
                    <td className="t-body"><p>From: 01-Jul-2021</p><p>To: 05-Jul-2021</p></td>
                </tr>
            </tbody>
        </table>
    )
}