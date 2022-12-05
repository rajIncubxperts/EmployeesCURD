import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import AuthReducer from '../Reducers/AuthReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


const rootReducer = combineReducers({
  AuthReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
};
export default configureStore;
