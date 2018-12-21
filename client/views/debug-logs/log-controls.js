import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

import {
    SearchInput,
    SegmentedControl
} from 'evergreen-ui';

const LiveOption = {
    label: 'Live',
    value: 'live'
};

const PauseOption = {
    label: 'Pause',
    value: 'pause'
};

class LogControls extends PureComponent {
    static propTypes = {
        isLive: PropTypes.bool,
        onPauseSelected: PropTypes.func.isRequired,
        onLiveSelected: PropTypes.func.isRequired
    };

    static defaultProps = {
        isLive: true
    };

    constructor(props) {
        super(props);

        this.handlePauseResume = this.handlePauseResume.bind(this);
        this.render = this.render.bind(this);
    }

    handlePauseResume(value) {
        switch(value) {
            case PauseOption.value:
                // Notify listener if changing to paused
                this.props.isLive && this.props.onPauseSelected();
                break;

            case LiveOption.value:
            default:
                // Notify listener if changing to live
                !this.props.isLive && this.props.onLiveSelected();
        }
    }

    render() {
        let currentOption = LiveOption.value;
        if( !this.props.isLive ) {
            currentOption = PauseOption.value;
        }

        return (
            <React.Fragment>
                <Box marginX="0.75rem" marginY="1rem" background="white">
                    <SegmentedControl
                        options={[LiveOption, PauseOption]}
                        value={currentOption.value}
                        defaultValue={LiveOption.value}
                        height={40}
                        flexShrink={1}
                        flexGrow={0}
                        width="10rem"
                        onChange={this.handlePauseResume} />
                </Box>

                <Box marginX="0.75rem" marginY="1rem" width="100%">
                    <SearchInput
                        height={40}
                        flexGrow={1}
                        width="100%"
                        placeholder="Type to search..." />
                </Box>
            </React.Fragment>
        );
    }
}

export default LogControls;