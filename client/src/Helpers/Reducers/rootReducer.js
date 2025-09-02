import { combineReducers } from "redux";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import cartReducer from "./cartReducer";


const rootReducer = combineReducers({
	productR: productReducer,
	userR: userReducer,
	categoryR: categoryReducer,
	cartR: cartReducer,
});

export default rootReducer;
