import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import AuthReducer from '../Reducers/AuthReducer';
import thunk from 'redux-thunk';
import EmployeeReducer from './../Reducers/EmployeeReducer';


const rootReducer = combineReducers({
  AuthReducer,
  EmployeeReducer
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
export default configureStore;
