import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import LogRow from './log-row';
import LogControls from './log-controls';
import EmptyFeedback from '../../components/empty-feedback';
import ServerStatus from '../../components/server-status';
import {
    Avatar,
    Pane,
    SideSheet,
    Table,
    Text
} from 'evergreen-ui';

class DebugLogs extends Component {
    static propTypes = {
        logs: PropTypes.array.isRequired,
        query: PropTypes.string,
        status: PropTypes.string,
        isLive: PropTypes.bool,
        pauseLogs: PropTypes.func.isRequired,
        resumeLogs: PropTypes.func.isRequired,
        queryLogs: PropTypes.func.isRequired
    };

    static defaultProps = {
        logs: [],
        isLive: true,
        query: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            showSettings: false
        };

        this.setShowSettings = this.setShowSettings.bind(this);
        this.openSettings = this.setShowSettings.bind(this, true);
        this.closeSettings = this.setShowSettings.bind(this, false);
        this.renderEmptyState = this.renderEmptyState.bind(this);
        this.renderServerStatus = this.renderServerStatus.bind(this);
        this.render = this.render.bind(this);
    }

    setShowSettings(shouldShow) {
        this.setState({
            showSettings: shouldShow
        });
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

        // If the user is searching or has the logs paused, render an empty log feedback
        if( this.props.query ) {
            iconProps = {
                icon: 'empty',
                message: 'No logs matching search criteria',
                subMessage: 'Try a different query'
            };
        }
        else if( !this.props.isLive ) {
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
                        query={this.props.query}
                        onPauseSelected={this.props.pauseLogs}
                        onLiveSelected={this.props.resumeLogs}
                        onQueryChanged={this.props.queryLogs}
                        onSettingsClicked={this.openSettings}
                        showSettingsControl={true} />
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

                <SideSheet
                    width={400}
                    isShown={this.state.showSettings}
                    onCloseComplete={this.closeSettings}>

                    <Pane
                        padding="2rem"
                        marginTop="1rem"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center">

                        <Avatar
                            src="//www.gravatar.com/avatar/d10080dd2e025bc26edd602636016409"
                            name="Nick Ferraro"
                            size={96} />

                        <Text fontWeight={500} fontSize="1rem" lineHeight="1.2rem" marginTop={12} marginBottom={4}>Built by</Text>
                        <Text fontWeight={300} fontSize="1.5rem" lineHeight="1.75rem">Nick Ferraro</Text>
                    </Pane>
                </SideSheet>
            </React.Fragment>
        );
    }
}

export default DebugLogs;
