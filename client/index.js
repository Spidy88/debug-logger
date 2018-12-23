import './scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

if( CONFIG.logRocket.isEnabled ) {
    LogRocket.init(CONFIG.logRocket.domain);
    setupLogRocketReact(LogRocket);
}

ReactDOM.render(<App />, document.getElementById('root'));