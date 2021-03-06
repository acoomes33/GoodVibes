import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import songReducer from "./reducers/songReducer";
import albumReducer from "./reducers/albumReducer";
import userReducer from "./reducers/userReducer";
import currentUser from "./reducers/currentUser.js";
import loginForm from "./reducers/loginForm.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  songs: songReducer,
  albums: albumReducer,
  users: userReducer,
  currentUser,
  loginForm,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;
