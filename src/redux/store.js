import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer.js/reducer";

const thunk = require('redux-thunk').default

const store = createStore(reducer, applyMiddleware(thunk));

export default store;