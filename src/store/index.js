import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from 'redux-persist'
import thunk from "redux-thunk";
import reducers from './reducers/root'


const initialState = {};

const middleware = [thunk];


let windows = window

const composeEnhancers =
  typeof windows === "object" && windows.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? windows.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

export const  store = createStore(reducers, initialState, enhancer);


