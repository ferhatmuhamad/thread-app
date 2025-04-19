import { ActionType } from '../authUser/action';

function isPreloadReducer(isPreload = true, action = {}) {
  switch (action.type) {
  case ActionType.SET_PRELOAD:
    return action.payload.isPreload;
  default:
    return isPreload;
  }
}
export default isPreloadReducer;
