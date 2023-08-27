/** @format */

import { StatusColor } from "../../../../@infrastructure/StatusColor";


export const CalendarStyleSheet = {
  cellStyle: {
    wrapper: (status = "DEFAULT", scaleTo = 1) => ({
      display: "grid",
      background: StatusColor[status],
      // width: "90px !important",
      // padding: "0.2rem 1rem",
      borderRadius: "0.3rem",
      gridTemplateColumns: "1rem 1fr",
      // columnGap: '0.5rem',
      // boxShadow: "-2px 0px 7px 0px",
      // position: "relative",
      zIndex: 9,
      // top: "-2rem",
      width: `${90 * scaleTo}px`,
      // transform: `scaleX(${scaleTo})`,
      //transform: `translateX(${parseInt(start_time) > 0 ? 90 * (1 - (parseInt(start_time) / 60)): 0}px)`,
      // transformOrigin: "0",



      transform: `translateX(${20}px)`,
      transformOrigin: "0",


      overflow: "hidden",
      padding: "4px",
    }),
    indication: (status = "DEFAULT", scaleTo = 1) => ({
      width: "5px",
      // background: "rgb(255, 255, 255)",
      height: "100%",
      display: "grid",
      borderRadius: "1rem",
      // transform: `scaleX(${scaleTo})`,
      // transformOrigin: "0",
    }),
    content: {
      wrapper: (status = "DEFAULT", scaleTo = 1) => ({
        // transform: `scaleX(${scaleTo})`,
        // transformOrigin: "-0.3rem",
        fontSize: "11px",
        fontWeight: 600,
        width: "5rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        padding: "0.2rem",
        color: "#fff",
      }),
    },
  },
};
