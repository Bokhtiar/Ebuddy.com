import * as moment from "moment";
import { useDispatch } from 'react-redux';
import { fetchNotification } from "../redux/actions/notificationActions";
import { ACTIVITY_ATTACHMENT_LINK, MY_PERM, NOTIFICATIONS_LIST_UNREAD } from "./api";
import { getData } from "./api-service";

export const mobileNumberValidationPattern = /^(?:\+?88)?01[13-9]\d{8}$/;

export const useNotification = () => {
    const dispatch = useDispatch();

    const getUnreadNotifications = async () => {
        const res = await getData(NOTIFICATIONS_LIST_UNREAD);
        if (res) {
            let masterData = res?.data?.data;
            dispatch(fetchNotification(masterData));
        }
    };

    return { getUnreadNotifications };
};

export const dateFormat = (date) => {
    if (date) {
        return moment(date).format('YYYY-MM-DD h:mm a');
    } else return null
}

export const openAttchment = async (attachment) => {
    let res = await getData(ACTIVITY_ATTACHMENT_LINK + "path=" + attachment);

    if (res) {
        let marterData = res.data.data;
        if (marterData) window.open(marterData, '_blank').focus();
    }
}

export const average = (array) => {
    if (array.length) {
        let average = array.reduce(function (sum, value) {
            return sum + value;
        }, 0) / array.length;
        return parseInt(average);
    } else return;
}

//date format should be 'YYYY-MM-DD'
export const dateCheck = (date, statusId) => {
    let comparableDate = dateFormat(date);
    let todayPlusFive = dateFormat(moment().add(5, 'days'));
    let todayPlusSix = dateFormat(moment().add(6, 'days'));
    let todayPlusTen = dateFormat(moment().add(10, 'days'));

    if (moment(comparableDate).isBetween(moment(), todayPlusFive) || moment(comparableDate).isSame(moment(), 'day')) {
        return '#5F27CD' //purple
    }
    else if (moment(comparableDate).isBetween(todayPlusSix, todayPlusTen)) {
        return '#54A0FF'  //sky blue
    }
    else if (moment().isAfter(comparableDate, 'day') && (statusId !== 4)) {
        return '#E85152'  //red , statusId = 4 =>> Done
    }
    else return 'black';
}

export const range = (start, end) => {
    if (start && end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    } else return null;
}

export const getPermissions = async () => {
    let ebuddyPermission = sessionStorage.getItem("ebuddyPermission");

    if (ebuddyPermission) {
        let permissions = JSON.parse(ebuddyPermission);

        if (permissions && permissions.length) {
            return permissions
        } else {
            const res = await getData(MY_PERM);

            if (res?.data?.data) {
                sessionStorage.setItem("ebuddyPermission", JSON.stringify(res?.data?.data));
                return res?.data?.data
            }
        }
    } else {
        const res = await getData(MY_PERM);

        if (res?.data?.data) {
            sessionStorage.setItem("ebuddyPermission", JSON.stringify(res?.data?.data));
            return res?.data?.data
        }
    }
}

export const CurrentQueterdate = () => {
    let date = moment().format("YYYY") + "-1-29";

    var fYearStart = new Date(date) //Pass your financial year's start date
    var q1Start = new Date(fYearStart.getFullYear(), fYearStart.getMonth(), 1)
    var dummy1 = new Date(fYearStart.getFullYear(), fYearStart.getMonth(), 1)
    var dummy5 = new Date(fYearStart.getFullYear(), fYearStart.getMonth(), 1)
    var q1End = new Date(dummy1.setMonth(dummy1.getMonth() + 3))
    var q1FinalEnd = new Date(dummy5.setMonth(dummy5.getMonth() + 3))
    q1FinalEnd.setSeconds(q1End.getSeconds() - 1)

    var q2Start = new Date(q1End.getFullYear(), q1End.getMonth(), 1)
    var dummy2 = new Date(q1End.getFullYear(), q1End.getMonth(), 1)
    var dummy6 = new Date(q1End.getFullYear(), q1End.getMonth(), 1)
    var q2End = new Date(dummy2.setMonth(dummy2.getMonth() + 3))
    var q2FinalEnd = new Date(dummy6.setMonth(dummy6.getMonth() + 3))
    q2FinalEnd.setSeconds(q2End.getSeconds() - 1)

    var q3Start = new Date(q2End.getFullYear(), q2End.getMonth(), 1)
    var dummy3 = new Date(q2End.getFullYear(), q2End.getMonth(), 1)
    var dummy7 = new Date(q2End.getFullYear(), q2End.getMonth(), 1)
    var q3End = new Date(dummy3.setMonth(dummy3.getMonth() + 3))
    var q3FinalEnd = new Date(dummy7.setMonth(dummy7.getMonth() + 3))
    q3FinalEnd.setSeconds(q3End.getSeconds() - 1)

    var q4Start = new Date(q3End.getFullYear(), q3End.getMonth(), 1)
    var dummy4 = new Date(q3End.getFullYear(), q3End.getMonth(), 1)
    var dummy8 = new Date(q3End.getFullYear(), q3End.getMonth(), 1)
    var q4End = new Date(dummy4.setMonth(dummy4.getMonth() + 3))
    var q4FinalEnd = new Date(dummy8.setMonth(dummy8.getMonth() + 3))
    q4FinalEnd.setSeconds(q4End.getSeconds() - 1)

    var compareDate = moment();

    if (compareDate.isBetween(moment(q1Start), moment(q1FinalEnd))) {
        return {
            start: moment(q1Start).format("YYYY-MM-DD"),
            end: moment(q1FinalEnd).format("YYYY-MM-DD")
        }
    } else if (compareDate.isBetween(moment(q2Start), moment(q2FinalEnd))) {
        return {
            start: moment(q2Start).format("YYYY-MM-DD"),
            end: moment(q2FinalEnd).format("YYYY-MM-DD")
        }
    } else if (compareDate.isBetween(moment(q3Start), moment(q3FinalEnd))) {
        return {
            start: moment(q3Start).format("YYYY-MM-DD"),
            end: moment(q3FinalEnd).format("YYYY-MM-DD")
        }
    } else if (compareDate.isBetween(moment(q4Start), moment(q4FinalEnd))) {
        return {
            start: moment(q4Start).format("YYYY-MM-DD"),
            end: moment(q4FinalEnd).format("YYYY-MM-DD")
        }
    }
}

export const activityColorSet = (status) => {
    if (status === 'To-Do') return "rgb(249 140 21)";
    else if (status === 'Pending') return "#f5222d";
    else if (status === 'WIP') return "rgb(250, 219, 17)";
    else if (status === 'Done') return "rgb(160, 217, 20)";
    else if (status === 'Reviewed') return "#3fc000";
    else return "#CCC";
}

export const mobileAndTabletCheck = () => {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

export const calculateDuration = (time) =>{
     return time ? `${time} minutes` : '----';
  }