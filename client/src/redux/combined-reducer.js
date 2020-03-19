import { combineReducers } from 'redux';
import reducer from './jwt-verification/reducer';

export default combineReducers({ jwt: reducer })