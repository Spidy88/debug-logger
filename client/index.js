import './scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

if( CONFIG.logRocket.isEnabled ) {
    LogRocket.init(CONFIG.logRocket.domain);
    setupLogRocketReact(LogRocket);
}

if( CONFIG.sentry.isEnabled ) {
    let sentryConfig = {
        dsn: CONFIG.sentry.dsn
    };

    if( CONFIG.sentry.release ) {
        sentryConfig.release = CONFIG.sentry.release;
    }

    Sentry.init(sentryConfig);

    if( CONFIG.logRocket.isEnabled ) {
        Sentry.configureScope(configureSentry);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

function configureSentry(scope) {
    scope.addEventProcessor(attachLogRocketSessionUrl);

    async function attachLogRocketSessionUrl(event) {
        event.extra.sessionURL = LogRocket.sessionURL;
        return event;
    }
}