import { userAction } from "./userAction";

const initialState = {
  authorized: false,
  name: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userAction.SET_USER:
      return {
        authorized: true,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
