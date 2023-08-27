import * as moment from "moment";

export const greeting = () => {
  let text =
    moment()
      .format("LT")
      .split(" ")[1] === "AM"
      ? "Good morning"
      : ["12", "1", "2"].includes(
          moment()
            .format("LT")
            .split(" ")[0]
            .split(":")[0]
        )
      ? "Good noon"
      : "Good afternoon";
  return text;
};
