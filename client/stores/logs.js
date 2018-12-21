import _ from 'lodash';
import { createAction } from 'redux-actions';
import { createSelector } from './util';

export const STORE_NAME = 'logsStore';

/*****************
 * Actions
 *****************/
export const APPEND_LOG = 'logs.append';
export const CLEAR_LOGS = 'logs.clear';
export const UPDATE_SETTINGS = 'logs.update-settings';
export const RESET_SETTINGS = 'logs.reset-settings';
export const PAUSE_LOGS = 'logs.pause';
export const RESUME_LOGS = 'logs.resume';

export const appendLog = createAction(APPEND_LOG);
export const clearLogs = createAction(CLEAR_LOGS);
export const updateSettings = createAction(UPDATE_SETTINGS);
export const resetSettings = createAction(RESET_SETTINGS);
export const pauseLogs = createAction(PAUSE_LOGS);
export const resumeLogs = createAction(RESUME_LOGS);

export const actions = {
    appendLog,
    clearLogs,
    updateSettings,
    resetSettings,
    pauseLogs,
    resumeLogs
};

/*****************
 * Reducer
 *****************/
export const INITIAL_STATE = {
    logs: [],
    logsSnapshot: [],
    lastLogReceivedAt: null,
    isPaused: false,
    settings: {
        logLimit: 200
    }
};

export function reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case APPEND_LOG: {
            let log = action.payload;
            let logLimit = getLogLimit(state);
            let logs = [log, ...state.logs];
            let lastLogReceivedAt = new Date();

            // If a log limit is in affect, keep our live logs to said limit
            if( logLimit > 0 && logs.length > logLimit ) {
                logs.length = logLimit;
            }

            return {
                ...state,
                logs,
                lastLogReceivedAt
            };
        }

        case CLEAR_LOGS: {
            return {
                ...state,
                logs: []
            };
        }

        case UPDATE_SETTINGS: {
            let updatedSettings = action.payload;
            let settings = _.merge(state.settings, updatedSettings);

            return {
                ...state,
                settings
            };
        }

        case RESET_SETTINGS: {
            return {
                ...state,
                settings: {
                    ...INITIAL_STATE.settings
                }
            };
        }

        case PAUSE_LOGS: {
            // Ignore action if logs are already paused
            if( isPaused(state) ) {
                return state;
            }

            // Grab a snapshot of the logs to use until logs are resumed.
            // Logs will continue to populate in the background but our snapshot will remain unaffected.
            // If a query is set, this will be the filtered logs not all logs
            let logs = state.logs;

            return {
                ...state,
                isPaused: true,
                logsSnapshot: [...logs]
            };
        }

        case RESUME_LOGS: {
            // Ignore actino if logs are already live
            if( isLive(state) ) {
                return state;
            }

            return {
                ...state,
                isPaused: false,
                logsSnapshot: []
            };
        }

        default:
            return state;
    }
}

/*****************
 * Selectors
 *****************/
export const selectors = {
    getLogLimit: createSelector(STORE_NAME, getLogLimit),
    getLogs: createSelector(STORE_NAME, getLogs),
    isPaused: createSelector(STORE_NAME, isPaused),
    isLive: createSelector(STORE_NAME, isLive)
};

function getLogLimit(state) {
    return state.settings.logLimit;
}

function getLogs(state) {
    return isPaused(state) ? state.logsSnapshot : state.logs;
}

function isPaused(state) {
    return state.isPaused;
}

function isLive(state) {
    return !isPaused(state);
}