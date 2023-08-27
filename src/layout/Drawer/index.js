import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../scripts/api-service";
import { Tooltip } from "antd";
import cookies from "js-cookie";
import { MY_PERM } from "../../scripts/api";
import "./drawer.scss";
import { drawerItems } from "./drawerItems";
import { checkRes } from "../../scripts/checkRes";

const Drawer = () => {
  const profile = JSON.parse(cookies.get("profile") || "");
  const [permState, setPermState] = useState([...drawerItems]);

  const getPermissions = async () => {
    const res = await getData(MY_PERM);
    if (res?.data?.data) {
      sessionStorage.setItem("ebuddyPermission", JSON.stringify(res?.data?.data));

      const permNames = res.data.data.map((item) => item.name);
      setPermState((state) =>
        state.map((item) =>
          item.name === "roles" && permNames.includes("Can Manage Roles")
            ? { ...item, visible: true } //update perm for roles
            : item.name === "send-notifications" && permNames.includes("Can Sent Notification")
            ? { ...item, visible: true } //update perm for notifications
            : item
        ),
      )
      setPermState((state) =>
        state.map((item) =>
          item.name === "configuration" && permNames.includes("can view configuration page")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "cbs" && permNames.includes("CBS Module")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "cbs" && permNames.includes("CBS Module")
          ? { ...item, visible: true } : item
          )
      )
      setPermState((state) =>
        state.map((item) =>
          item.name === "locate-team" && permNames.includes("Locate Team")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "utility" && permNames.includes("Utility Module")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "hris" && permNames.includes("HRIS Module")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "work-from-home" && permNames.includes("Work From Home Module")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "project-page" && permNames.includes("can view project page")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "performance-appraisal" && permNames.includes("Personal Performance Appraisal")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "task-activity" && permNames.includes("can view Activity Page")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "supervisor-panel" && permNames.includes("can view Supervisor panel")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "issue-register" && permNames.includes("Issue Registger")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "employee-register" && permNames.includes("Can Manage Employee Manager")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "leave-and-attendance" && permNames.includes("Can Manage Leave & Attendance")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "project-management" && permNames.includes("Project Management")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "sop" && permNames.includes("Can view SOP")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "notification" && permNames.includes("Can view notifications")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "management-roadmap" && permNames.includes("Management Roadmap")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "meeting" && permNames.includes("Can config meeting")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "sales-dashboard" && permNames.includes("Sales Dashboard")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "pitch" && permNames.includes("Pitch Manager")
          ? { ...item, visible: true } : item
          )
      )

      setPermState((state) =>
        state.map((item) =>
          item.name === "feedback" && permNames.includes("Feedback Module")
          ? { ...item, visible: true } : item
          )
      )
    }
  };

  
  const roleWisePermission = async() =>{
    //role wise panel show
    let roles = await getData("accounts/v1/get-my-roles");
    if(checkRes(roles.status)) {
      for(let role = 0; role < roles?.data?.data.length; role++){
        if(roles?.data?.data[role] === "supervisor"){
          setPermState((state) =>
            state.map((item) => {
              if (item.name === "supervisor-panel") {
                return { ...item, visible: true };
              } else return item;
            })
          );
        }
        if(roles?.data?.data[role] === "Management"){
          setPermState((state) =>
            state.map((item) => {
              if (item.name === "management-panel") {
                return { ...item, visible: true };
              } 
              // if (item.name === "issue-register") {
              //   return { ...item, visible: true };
              // } 
              // else if (item.name === 'revenue-board') {
              //   return { ...item, visible: true };
              // } 
              else return item;
            })
          );
        }
      }
    }
  }
  // useEffect(() => {
  //   if (profile?.department === "Management") {
  //     setPermState((state) =>
  //       state.map((item) => {
  //         if (item.name === "roles") {
  //           return { ...item, visible: true };
  //         } else if (item.name === "locate-team") {
  //           return { ...item, visible: true };
  //         }
  //          else if (item.name === 'management-panel') {
  //           return { ...item, visible: true };
  //         } else if (item.name === 'revenue-board') {
  //           return { ...item, visible: true };
  //         } 
  //         else return item;
  //       })
  //     );
  //   }
  // }, []);
  
  useEffect(()=>{
    getPermissions();
    roleWisePermission();
  },[])
  
  return (
    <div className="drawer-wrapper" id="drawer-id">
      {permState &&
        permState.map(
          ({ id, to, name, title, icon, visible, width }) =>
            visible && (
              <div key={`drawer-item-${id}`}>
              {/* open management roadmap in sharepoint */}
              {name === 'management-roadmap' ?
                <Tooltip placement="right" title={title} className="LINK stretch">
                  <div
                    className={
                      window.location.href.split("/")[3] === name
                        ? "actived button"
                        : "button"
                    }
                  >
                    <img className="drawer-icon" src={icon} 
                      style={ width ? { width: width } : {}} 
                      onClick={()=>window.open('https://sslw-my.sharepoint.com/:x:/g/personal/sayeeful_sslwireless_com/ETCBlk4_SRhCjCMCAt1kMY4BnLt87NE0CKen_OyTOukEpA?e=4%3a2rhFdk&at=9')}
                    />
                  </div>
                </Tooltip>
              :
                <Link key={id} to={to} className="LINK stretch">
                  <Tooltip placement="right" title={title}>
                    <div
                      className={
                        window.location.href.split("/")[3] === name
                          ? "actived button"
                          : "button"
                      }
                    >
                      <img className="drawer-icon" src={icon} 
                        style={ width ? { width: width } : {}} />
                    </div>
                  </Tooltip>
                </Link>
              }
              </div>
            )
        )}
    </div>
  );
};

export default Drawer;
