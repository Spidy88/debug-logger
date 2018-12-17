import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={() => (<h1>Debug Logs</h1>)} />
            </Switch>
        </Router>
    );
}

export default App;