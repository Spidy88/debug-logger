import React, { Component } from 'react';
import LogControls from './log-controls';
import {
    Pane
} from 'evergreen-ui';

class DebugLogs extends Component {
    static propTypes = {
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
            </React.Fragment>
        );
    }
}

export default DebugLogs;
