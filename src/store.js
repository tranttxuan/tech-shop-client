import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

//create store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;