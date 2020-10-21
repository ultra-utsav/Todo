import {combineReducers} from "redux";
import todoReducer from "./todo/todoReducer";
import userReducer from "./user/userReducer";

export default combineReducers({
    todo: todoReducer,
    user: userReducer
})