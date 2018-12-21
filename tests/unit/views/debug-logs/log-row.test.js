import React from 'react';
import renderer from 'react-test-renderer';
import timezoneMock from 'timezone-mock';
import { render } from 'enzyme';
import { LogRow } from '../../../../client/views/debug-logs';

describe('<LogRow>', () => {
    const logDateFormat = /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/;

    beforeAll(() => {
        timezoneMock.register('UTC');
    });

    afterAll(() => {
        timezoneMock.unregister();
    });

    it('should render the log type and event', () => {
        const testLog = {
            messageId: '123abc',
            type: 'track',
            event: 'Add to Cart',
            sentAt: 1545345141076
        };
        const logRow = render(<LogRow log={testLog} />);

        expect(logRow.find('[test-id=logType]').text()).toEqual(testLog.type);
        expect(logRow.find('[test-id=logMessage]').text()).toEqual(testLog.event);
        expect(logRow.find('[test-id=logDate]').text()).toMatch(logDateFormat);
    });

    it('should render the log type and id if no event is provided', () => {
        const testLog = {
            messageId: 'abc123',
            type: 'identify',
            sentAt: 1545345141076
        };
        const logRow = render(<LogRow log={testLog} />);

        expect(logRow.find('[test-id=logType]').text()).toEqual(testLog.type);
        expect(logRow.find('[test-id=logMessage]').text()).toEqual(testLog.messageId);
        expect(logRow.find('[test-id=logDate]').text()).toMatch(logDateFormat);
    });

    it('should match its snapshot', () => {
        const testLog = {
            messageId: '123abc',
            type: 'track',
            event: 'Add to Cart',
            sentAt: 1545345141076
        };
        const tree = renderer.create(<LogRow log={testLog} />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});