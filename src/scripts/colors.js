export const lib = {
  red: "#f44336",
  blue: "#2196f3",
  green: "#4caf50",
  yellow: "#fbc02d",
  teal: "#009688",
  jelly: "#607D8B",
  orange: "#FF9800"
};

export const work_from_home_colors = {
  red: lib.red,
  blue: lib.blue,
  green: lib.green,
  orange : lib.orange
}

export const busines_task_status_color = {
  color: {
    pending: lib.teal,
    running: lib.green,
    completed: lib.blue,
    cancelled: lib.red
  }
};

export const _my_cbs = {
  color: {
    1: lib.teal,
    2: lib.yellow,
    3: lib.green,
    4: lib.jelly,
    5: lib.orange,
    6: lib.red
  },
  title: {
    1: "Pending",
    2: "Approved by Dept",
    3: "Approved by Fin",
    4: "Paid",
    5: "Declined by Dept",
    6: "Declined by Fin"
  }
};

export const _meeting_ = {
  color: {
    1: lib.teal,
    2: lib.yellow,
    3: lib.red,
    4: lib.orange,
    5: lib.green,
    6: lib.blue
  },
  title: {
    1: "Active",
    2: "Review",
    3: "Cancelled",
    4: "Rejected",
    5: "Started",
    6: "Completed"
  }
};

export const general_status_colors = {
  1: "red",
  2: "blue",
  3: "green",
  4: "yellow",
  5: "teal"
};

export const certificate_status = {
  color: {
    1: lib.red,
    2: lib.green, //green
    3: lib.blue,
    4: lib.yellow,
    5: lib.teal //teal
  },
  title: {
    1: "Pending",
    2: "Approved",
    3: "Declined"
  }
};

export const leave_application_status = {
  color: {
    1: lib.red,
    2: lib.green, //green
    3: lib.blue,
    4: lib.yellow,
    5: lib.teal //teal
  },
  title: {
    1: "Pending",
    2: "Approved",
    3: "Declined"
  }
};

export const attendance_status_colors = {
  1: {
    title: "Normal",
    color: "#4caf50" //green
  },
  2: {
    title: "Late In",
    color: "#ff9800" //orange
  },
  3: {
    title: "Half Day",
    color: "#fbc02d" //yellow
  },
  4: {
    title: "Absence",
    color: "#f44336" //red
  }
};

export const task_manager_priority = {
  High: "#da1f20",
  Medium: "#eca316",
  Low: "#bcaf6e"
};
