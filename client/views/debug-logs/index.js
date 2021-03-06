import { connect } from 'react-redux';
import DebugLogs from './debug-logs';
import LogRow from './log-row';
import LogControls from './log-controls';

import {
    actions as logsActions,
    selectors as logsSelectors
} from '../../stores/logs';

import {
    selectors as statusSelectors
} from '../../stores/status';

const mapDispatchToProps = {
    pauseLogs: logsActions.pauseLogs,
    resumeLogs: logsActions.resumeLogs,
    queryLogs: logsActions.queryLogs
};

const DebugLogsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DebugLogs);

export default DebugLogsContainer;
export { DebugLogs, LogControls, LogRow };

function mapStateToProps(state) {
    let isServerStatusInitialized = statusSelectors.isServerStatusInitialized(state);

    let status = null;
    if( isServerStatusInitialized ) {
        let isServerDisconnected = statusSelectors.isServerDisconnected(state);
        let isSourceDisconnected = statusSelectors.isSourceDisconnected(state);

        if( isServerDisconnected || isSourceDisconnected ) {
            status = 'Debug log\'s data source is currently disconnected. Attempting to reconnect';
        }
    }

    return {
        logs: logsSelectors.getLogs(state),
        isLive: logsSelectors.isLive(state),
        query: logsSelectors.getQuery(state),
        status
    };
}