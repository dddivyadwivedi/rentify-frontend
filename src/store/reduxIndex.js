import { configureStore , } from "@reduxjs/toolkit";
import { combineReducers , } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import saga from "./sagaIndex";
import storage from "redux-persist/lib/storage";
import UserAuth from "./userRedux";
import PropertySlice from './propertyRedux';
import errorMiddleware from "../utilities/error.middleware";
import { globalErrorReducer } from "./globalErrorReducer";


const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["UserAuth" , "PropertySlice"],
};

const rootReducer = combineReducers({ UserAuth , PropertySlice , globalError: globalErrorReducer, });
export const persistedReducer = persistReducer(persistConfig, rootReducer);

let sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware]

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false}).concat(sagaMiddleware , errorMiddleware),
});


sagaMiddleware.run(saga);

export const persistor = persistStore(store);
