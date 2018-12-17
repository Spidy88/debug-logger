import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Barber from '../illustrations/undraw_barber_3uel.svg';
import Empty from '../illustrations/undraw_empty_xct9.svg';

import {
    Pane,
    Text
} from 'evergreen-ui';

// TODO: Add support for custom illustrations
// TODO: Allow custom sizing and text props
class EmptyFeedback extends PureComponent {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        subMessage: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.getIllustration = this.getIllustration.bind(this);
        this.render = this.render.bind(this);
    }

    getIllustration() {
        switch(this.props.icon) {
            case 'barber':
                return Barber;

            case 'empty':
            default:
                return Empty;
        }
    }

    render() {
        let Illustration = this.getIllustration();

        return (
            <Pane
                paddingY="1rem"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center">

                <Illustration width="20rem" height="20rem" />

                <Text fontWeight={500} fontSize="2rem" lineHeight="2.5rem" marginBottom={12}>{this.props.message}</Text>
                <Text fontWeight={300} fontSize="1.5rem" lineHeight="1.75rem">{this.props.subMessage}</Text>
            </Pane>
        );
    }
}

export default EmptyFeedback;