import { connect } from 'react-redux';
import DebugLogs from './debug-logs';
import LogRow from './log-row';
import LogControls from './log-controls';

import {
    selectors as logsSelectors
} from '../../stores/logs';

import {
    selectors as statusSelectors
} from '../../stores/status';

const mapDispatchToProps = {};

const DebugLogsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DebugLogs);

export default DebugLogsContainer;
export { DebugLogs, LogControls, LogRow };

function mapStateToProps(state) {
    let isServerStatusInitialized = statusSelectors.isServerStatusInitialized(state);
    let isSourceStatusInitialized = statusSelectors.isSourceStatusInitialized(state);

    let status = null;
    if( isServerStatusInitialized && isSourceStatusInitialized ) {
        let isServerDisconnected = statusSelectors.isServerDisconnected(state);
        let isSourceDisconnected = statusSelectors.isSourceDisconnected(state);

        if( isServerDisconnected || isSourceDisconnected ) {
            status = 'Debug log\'s data source is currently disconnected. Attempting to reconnect';
        }
    }

    return {
        logs: logsSelectors.getLogs(state),
        status
    };
}