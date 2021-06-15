import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { cartReducer } from "./cardReducer";

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
});

export default rootReducer;
