import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import LogRow from './log-row';
import LogControls from './log-controls';
import EmptyFeedback from '../../components/empty-feedback';
import ServerStatus from '../../components/server-status';
import {
    Pane,
    Table
} from 'evergreen-ui';

class DebugLogs extends Component {
    static propTypes = {
        logs: PropTypes.array,
        status: PropTypes.string,
        isLive: PropTypes.bool,
        pauseLogs: PropTypes.func.isRequired,
        resumeLogs: PropTypes.func.isRequired
    };

    static defaultProps = {
        logs: [],
        isLive: true
    };

    constructor(props) {
        super(props);

        this.renderEmptyState = this.renderEmptyState.bind(this);
        this.renderServerStatus = this.renderServerStatus.bind(this);
        this.render = this.render.bind(this);
    }

    renderEmptyState() {
        if( this.props.logs.length ) {
            return null;
        }

        let iconProps = {
            icon: 'barber',
            message: 'Waiting for logs',
            subMessage: 'Kick back and relax'
        };

        // If the user has the logs paused, render an empty log feedback
        if( !this.props.isLive ) {
            iconProps = {
                icon: 'empty',
                message: 'Logs paused with no results',
                subMessage: 'Try going live to receive new log events'
            };
        }

        // Render a waiting for logs feedback
        return (
            <EmptyFeedback {...iconProps} />
        );
    }

    renderServerStatus() {
        if( !this.props.status ) {
            return null;
        }

        return (
            <ServerStatus status={this.props.status} />
        );
    }

    render() {
        return (
            <React.Fragment>
                <Pane
                    background="tint2"
                    paddingX="0.75rem"
                    display="flex"
                    position="fixed"
                    width="100%"
                    top={0}
                    elevation={1}>

                    <LogControls
                        isLive={this.props.isLive}
                        onPauseSelected={this.props.pauseLogs}
                        onLiveSelected={this.props.resumeLogs} />
                </Pane>

                <Box marginTop="calc(40px + 2rem)">
                    { this.renderServerStatus() }

                    { this.renderEmptyState() }

                    <Table>
                        <Table.Body>
                            {
                                this.props.logs.map((log) => (
                                    <LogRow key={log.messageId} log={log} />
                                ))
                            }
                        </Table.Body>
                    </Table>
                </Box>
            </React.Fragment>
        );
    }
}

export default DebugLogs;
