import TaskActivityPermission from "../@acl/TaskActivityPermission";
import { AclStatus } from "../@statics/Status";

const checkTaskActivityPermission = (data) => {
    const taskActivityPermission = new TaskActivityPermission();
    const permissionNameMap = data.map(item => item.name);
    const isAccess = permissionNameMap.includes(
        taskActivityPermission.ACTIVITY_LIST &&
        taskActivityPermission.MILESTONE_CALENDER &&
        taskActivityPermission.USER_ACTIVITY_LIST &&
        taskActivityPermission.NOTIFICATIONS
    );
    // console.log("checkTaskActivityPermission",test,);
    return isAccess ? AclStatus.ALLOW : AclStatus.DENY;
};

export { checkTaskActivityPermission };