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

const store = createStore(
    rootStore,
    applyMiddleware(createLogger({ collapsed: true, level: 'info' }))
);

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