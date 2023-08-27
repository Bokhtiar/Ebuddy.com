import moment from "moment";

export const my_meeting_status = [
  {
    id: '1',
    ext: "",
    name: "All"
  },
  {
    id: '2',
    ext: `date_from=${
      moment()
        .format()
        .split("T")[0]
    }&date_to=${
      moment()
        .format()
        .split("T")[0]
    }`,
    name: "Today"
  },
  {
    id:'3',
    ext: `date_from=${
      moment()
        .add(1, "days")
        .format()
        .split("T")[0]
    }`,
    name: "Upcoming"
  }
];
