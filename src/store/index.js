import {createStore} from "redux";
import {imageReducer} from "./imageReducer";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(imageReducer, composeWithDevTools())