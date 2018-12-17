import { createAction } from 'redux-actions';
import { createSelector } from './util';

export const STORE_NAME = 'statusStore';

/*****************
 * Actions
 *****************/
export const SERVER_CONNECTED = 'status.server.connected';
export const SERVER_DISCONNECTED = 'status.server.disconnected';
export const SOURCE_CONNECTED = 'status.source.connected';
export const SOURCE_DISCONNECTED = 'status.source.disconnected';

export const setServerConnected = createAction(SERVER_CONNECTED);
export const setServerDisconnected = createAction(SERVER_DISCONNECTED);
export const setSourceConnected = createAction(SOURCE_CONNECTED);
export const setSourceDisconnected = createAction(SOURCE_DISCONNECTED);

export const actions = {
    setServerConnected,
    setServerDisconnected,
    setSourceConnected,
    setSourceDisconnected
};

/*****************
 * Reducer
 *****************/

const NOT_INITIALIZED = 'status.uninitialized';

export const INITIAL_STATE = {
    serverStatus: NOT_INITIALIZED,
    sourceStatus: NOT_INITIALIZED
};

export function reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SERVER_CONNECTED:
        case SERVER_DISCONNECTED: {
            return {
                ...state,
                serverStatus: action.type
            };
        }

        case SOURCE_CONNECTED:
        case SOURCE_DISCONNECTED: {
            return {
                ...state,
                sourceStatus: action.type
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
    getServerStatus: createSelector(STORE_NAME, getServerStatus),
    isServerStatusInitialized: createSelector(STORE_NAME, isServerStatusInitialized),
    isServerConnected: createSelector(STORE_NAME, isServerConnected),
    isServerDisconnected: createSelector(STORE_NAME, isServerDisconnected),
    getSourceStatus: createSelector(STORE_NAME, getSourceStatus),
    isSourceStatusInitialized: createSelector(STORE_NAME, isSourceStatusInitialized),
    isSourceConnected: createSelector(STORE_NAME, isSourceConnected),
    isSourceDisconnected: createSelector(STORE_NAME, isSourceDisconnected)
};

function getServerStatus(state) {
    return state.serverStatus;
}

function isServerStatusInitialized(state) {
    return state.serverStatus !== NOT_INITIALIZED;
}

function isServerConnected(state) {
    return state.serverStatus === SERVER_CONNECTED;
}

function isServerDisconnected(state) {
    return state.serverStatus === SERVER_DISCONNECTED;
}

function getSourceStatus(state) {
    return state.sourceStatus;
}

function isSourceStatusInitialized(state) {
    return state.sourceStatus !== NOT_INITIALIZED;
}

function isSourceConnected(state) {
    return state.sourceStatus === SOURCE_CONNECTED;
}

function isSourceDisconnected(state) {
    return state.sourceStatus === SOURCE_DISCONNECTED;
}