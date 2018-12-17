import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogRow from './log-row';
import LogControls from './log-controls';
import {
    Pane,
    Table
} from 'evergreen-ui';

class DebugLogs extends Component {
    static propTypes = {
        logs: PropTypes.array
    };

    static defaultProps = {
        logs: []
    };

    constructor(props) {
        super(props);

        this.render = this.render.bind(this);
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

                    <LogControls />
                </Pane>

                <Table>
                    <Table.Body>
                        {
                            this.props.logs.map((log) => (
                                <LogRow key={log.messageId} log={log} />
                            ))
                        }
                    </Table.Body>
                </Table>
            </React.Fragment>
        );
    }
}

export default DebugLogs;
