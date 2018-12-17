import React from 'react';
import DebugLogs from './views/debug-logs';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={DebugLogs} />
            </Switch>
        </Router>
    );
}

export default App;