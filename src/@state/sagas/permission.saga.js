// import { takeLatest, call, put } from 'redux-saga/effects'
// // import TaskActivityPermission from '../../@acl/TaskActivityPermission'
// // import Logger from '../../Logger';
// import { Creators, Types } from '../reducers/permission.reducer';
// // import { checkTaskActivityPermission } from '../helpers.state';

// export function* getPermissionsRequest() {
//     // const acl = new TaskActivityPermission();
//     try {
//         // const data = yield call(acl.getAcl);
//         yield put(Creators.getPermissionsSuccess(data));
//         // // yield put(Creators.getTaskActivityPermissionSuccess(checkTaskActivityPermission(data)))
//     } catch (error) {
//         yield put(Creators.getPermissionsError(error))
//         throw new Error(error)
//     }
// }

// export function* getTaskActivityPermissionRequest(action) {
//     console.log(action);
//     try {
//         // const data = yield call(acl.getAcl);
//         // yield put(Creators.getPermissionsSuccess(data));
//     } catch (error) {
//         // yield put(Creators.getPermissionsError(error))
//         throw new Error(error)
//     }
// }

// export default function* permissionSagas () {
//     yield takeLatest(Types.GET_PERMISSIONS, getPermissionsRequest);
//     yield takeLatest(Types.GET_TASK_ACTIVITY_PERMISSION, getTaskActivityPermissionRequest);
// }