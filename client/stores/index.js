import { combineReducers } from 'redux';
import {
    STORE_NAME as LOGS_STORE,
    reducer as logsReducer
} from './logs';
import {
    STORE_NAME as STATUS_STORE,
    reducer as statusReducer
} from './status';

export default combineReducers({
    [LOGS_STORE]: logsReducer,
    [STATUS_STORE]: statusReducer
});