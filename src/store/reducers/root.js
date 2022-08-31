import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";

import projectReducer from "./project";
import infoReducer from "./info";

const PersistConfig = {
	key: "root",
	storage,
}

const CombineReducers = combineReducers({
	project: projectReducer,
	info: infoReducer
})

export default persistReducer(PersistConfig, CombineReducers)