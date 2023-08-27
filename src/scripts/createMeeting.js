import * as Cookies from 'js-cookie'
import { postData } from './postData'
import { checkRes } from './checkRes'
import { alertPop } from './message'
import * as moment from 'moment'
import { validatePhone } from './validate'

export const createMeeting = async data => {
    let ret = 0
    let post_data = {}
    if (data.meeting_with === 'Company') {
        post_data = {
            attendees: JSON.parse(Cookies.get('profile')).emp_id,
            date: data.date,
            discussion_point: '',
            meeting_location: 'dummy',
            meeting_with: data.meeting_with,
            purpose: 5,
            time_from : '12:00',
            time_to : '13:00',
            title: data.title,
            company_id : data.company_id,
            branch_id : data.branch_id,
            contact_person_id : data.person_id,
            meeting_type : 2
        }
        if (data.person_id) {
            let res = await postData('rooms/v1/meeting/create', post_data)
            if (checkRes(res.status)) {
                alertPop('success', 'Meeting created')
                ret = res.data.data[0].id
            } else {
                res.map( elem => {
                    alertPop('error', elem)
                })
            }
        } else {
            alertPop('error', 'Fill up the form accordingly.')
        }
    } else {
        post_data = {
            attendees: JSON.parse(Cookies.get('profile')).emp_id,
            date: data.date,
            discussion_point: '',
            meeting_location: 'dummy',
            meeting_with: data.meeting_with,
            purpose: 5,
            // time_from: moment(new Date().getTime()).format("HH:mm"),
            // time_to: moment(new Date().getTime()).format("HH:mm"),
            time_from : '12:00',
            time_to : '13:00',
            title:data.title,
            meeting_with_person_name: data.person_name,
            meeting_with_person_company: data.institute_name,
            meeting_with_person_contact: data.contact_number,
            meeting_type : 2
        }
        if (validatePhone(data.contact_number)) {
            let res = await postData('rooms/v1/meeting/create', post_data)
            if (checkRes(res.status)) {
                alertPop('success', 'Meeting created')
                ret = res.data.data[0].id
            } else {
                res.map( elem => {
                    alertPop('error', elem)
                })
            }
        } else {
            alertPop('error', 'Fill up the form accordingly.')
        }
    } 
    return ret
}

