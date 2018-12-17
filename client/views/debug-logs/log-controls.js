import React, { PureComponent } from 'react';
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
    constructor(props) {
        super(props);

        this.render = this.render.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <Box marginX="0.75rem" marginY="1rem" background="white">
                    <SegmentedControl
                        options={[LiveOption, PauseOption]}
                        defaultValue={LiveOption.value}
                        height={40}
                        flexShrink={1}
                        flexGrow={0}
                        width="10rem" />
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