import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
    Pane,
    Text
} from 'evergreen-ui';

class ServerStatus extends PureComponent {
    static propTypes = {
        status: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.render = this.render.bind(this);
    }

    render() {
        return (
            <Pane
                background="redTint"
                paddingY="1rem"
                display="flex"
                alignItems="center"
                justifyContent="center">

                <Text fontWeight={700}>{this.props.status}</Text>
            </Pane>
        );
    }
}

export default ServerStatus;