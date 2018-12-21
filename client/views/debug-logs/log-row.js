import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import moment from 'moment';
import {
    Table,
    defaultTheme
} from 'evergreen-ui';

const eventTextProps = {
    fontWeight: 500,
    textAlign: 'left'
};

const dateTextProps = {
    textAlign: 'right'
};

class LogRow extends PureComponent {
    static propTypes = {
        log: PropTypes.shape({
            messageId: PropTypes.string.isRequired,
            sentAt: PropTypes.number.isRequired,
            event: PropTypes.string
        }).isRequired
    };

    constructor(props) {
        super(props);

        this.formattedLogDate = this.formattedLogDate.bind(this);
        this.render = this.render.bind(this);
    }

    formattedLogDate() {
        let { log } = this.props;
        return moment(log.sentAt).format('YYYY/MM/DD HH:mm:ss');
    }

    render() {
        let {
            log,
            ...props
        } = this.props;

        return (
            <Table.Row paddingX="0.75em" {...props}>
                <Table.Cell
                    width={40}
                    flexBasis="auto"
                    flex={0}
                    marginX="0.75em">

                    <Box
                        is="svg"
                        viewBox="0 0 24 24"
                        style={ { fill: defaultTheme.fills.solid.blue.backgroundColor } }
                        width={24}
                        height={24}>

                        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"/>
                    </Box>
                </Table.Cell>

                <Table.TextCell
                    width="8em"
                    flexBasis="auto"
                    flex={0}
                    textTransform="uppercase"
                    fontWeight={300}
                    test-id="logType">

                    { log.type }
                </Table.TextCell>

                <Table.TextCell
                    textProps={eventTextProps}
                    test-id="logMessage">

                    { log.event || log.messageId }
                </Table.TextCell>

                <Table.TextCell
                    width="10em"
                    marginX="0.75em"
                    flexBasis="auto"
                    flex={0}
                    textProps={dateTextProps}
                    test-id="logDate">

                    { this.formattedLogDate() }
                </Table.TextCell>
            </Table.Row>
        );
    }
}

export default LogRow;