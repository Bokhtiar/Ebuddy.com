import * as actionTypes from "../actions/actionTypes";
import { getData } from "../../scripts/getData";

const storeResReucer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESPONSE_DATA:
      return {
        ...state,
        [action.store]: async () => {
          return await getData(action.api);
        }
      };
    default:
      return state;
  }
};

export default storeResReucer;
