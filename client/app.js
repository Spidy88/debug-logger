import io from 'socket.io-client';
import LogRocket from 'logrocket';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import DebugLogs from './views/debug-logs';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import rootStore from './stores';
import { appendLog } from './stores/logs';
import {
    setServerConnected,
    setServerDisconnected,
    setSourceConnected,
    setSourceDisconnected
} from './stores/status';

const middleware = [];
if( CONFIG.logRocket.isEnabled ) {
    middleware.push(
        LogRocket.reduxMiddleware()
    );
}
else {
    middleware.push(
        createLogger({ collapsed: true, level: 'info' })
    );
}


const store = createStore(
    rootStore,
    applyMiddleware(...middleware)
);

try {
    const socket = io(CONFIG.sockets.host);
    socket.on('status', handleStatusMessage);
    socket.on('log', handleLogMessage);
    socket.on('connect', handleConnect);
    socket.on('connect_error', handleDisconnect);
    socket.on('disconnect', handleDisconnect);
}
catch(err) {
    LogRocket.captureException(err);
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={DebugLogs} />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;

function handleStatusMessage(status) {
    let action = status.connected ? setSourceConnected : setSourceDisconnected;
    store.dispatch(action());
}

function handleLogMessage(log) {
    store.dispatch(appendLog(log));
}

function handleConnect() {
    store.dispatch(setServerConnected());
}

function handleDisconnect() {
    store.dispatch(setServerDisconnected());
}