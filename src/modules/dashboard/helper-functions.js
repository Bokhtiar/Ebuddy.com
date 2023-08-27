import moment from "moment";

export function getWeekDaysByDate(date) {
    var date = date ? moment(date) : moment(),
        weeklength = 7,
        result = [];
    date = date.startOf("week");

    while (weeklength--) {
        result.push(date.format("YYYY-MM-DD"));
        date.add(1, "day");
    }

    return result;
}