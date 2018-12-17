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

export const appendLog = createAction(APPEND_LOG);
export const clearLogs = createAction(CLEAR_LOGS);
export const updateSettings = createAction(UPDATE_SETTINGS);
export const resetSettings = createAction(RESET_SETTINGS);

export const actions = {
    appendLog,
    clearLogs,
    updateSettings,
    resetSettings
};

/*****************
 * Reducer
 *****************/
export const INITIAL_STATE = {
    logs: [],
    lastLogReceivedAt: null,
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

        default:
            return state;
    }
}

/*****************
 * Selectors
 *****************/
export const selectors = {
    getLogLimit: createSelector(STORE_NAME, getLogLimit),
    getLogs: createSelector(STORE_NAME, getLogs)
};

function getLogLimit(state) {
    return state.settings.logLimit;
}

function getLogs(state) {
    return state.logs;
}