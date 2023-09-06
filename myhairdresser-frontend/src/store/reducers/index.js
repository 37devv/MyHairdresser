// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import addHairdresserForm from './addHairdresser'

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, addHairdresserForm });

export default reducers;
