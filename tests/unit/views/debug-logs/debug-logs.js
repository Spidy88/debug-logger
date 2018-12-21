import React from 'react';
import renderer from 'react-test-renderer';
import timezoneMock from 'timezone-mock';
import { mount } from 'enzyme';
import { DebugLogs } from '../../../../client/views/debug-logs';

describe('<DebugLogs>', () => {
    const TRACK_EVENT_1 = {
        messageId: '001',
        type: 'track',
        event: 'Add to Cart',
        sentAt: 1545345141076
    };
    const IDENTIFY_EVENT_1 = {
        messageId: '002',
        type: 'identify',
        sentAt: 1545345161076
    };
    const TRACK_EVENT_2 = {
        messageId: '003',
        type: 'track',
        event: 'Subscribe to Newsletter',
        sentAt: 1545345241076
    };
    const PAGE_EVENT_1 = {
        messageId: '004',
        type: 'page',
        sentAt: 1545346141076
    };

    let testLogs;
    let testStatus;

    beforeAll(() => {
        timezoneMock.register('UTC');
    });

    afterAll(() => {
        timezoneMock.unregister();
    });

    beforeEach(() => {
        testLogs = [
            TRACK_EVENT_1,
            IDENTIFY_EVENT_1,
            TRACK_EVENT_2,
            PAGE_EVENT_1
        ];
        testStatus = null;
    });

    it('should render logs', () => {
        const debugLogs = mount(
            <DebugLogs
                logs={testLogs}
                status={testStatus} />
        );

        let rows = debugLogs.find('LogRow');
        expect(rows).toHaveLength(4);

        let status = debugLogs.find('ServerStatus');
        expect(status).toHaveLength(0);

        let empty = debugLogs.find('EmptyFeedback');
        expect(empty).toHaveLength(0);
    });

    it('should render empty state when there are zero logs', () => {
        testLogs = [];

        const debugLogs = mount(
            <DebugLogs
                logs={testLogs}
                status={testStatus} />
        );

        let rows = debugLogs.find('LogRow');
        expect(rows).toHaveLength(0);

        let status = debugLogs.find('ServerStatus');
        expect(status).toHaveLength(0);

        let empty = debugLogs.find('EmptyFeedback');
        expect(empty).toHaveLength(1);
    });

    it('should render a server status message when the status prop is provided', () => {
        testStatus = 'Experiencing issues test';

        const debugLogs = mount(
            <DebugLogs
                logs={testLogs}
                status={testStatus} />
        );

        let rows = debugLogs.find('LogRow');
        expect(rows).toHaveLength(4);

        let status = debugLogs.find('ServerStatus');
        expect(status).toHaveLength(1);

        let empty = debugLogs.find('EmptyFeedback');
        expect(empty).toHaveLength(0);
    });

    it('should match its snapshot', () => {
        const tree = renderer.create(
            <DebugLogs
                logs={testLogs}
                status={testStatus} />
        );

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should match its snapshot (empty logs)', () => {
        testLogs = [];

        const tree = renderer.create(
            <DebugLogs
                logs={testLogs}
                status={testStatus} />
        );

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should match its snapshot (server error)', () => {
        testStatus = 'Testing server error';

        const tree = renderer.create(
            <DebugLogs
                logs={testLogs}
                status={testStatus} />
        );

        expect(tree.toJSON()).toMatchSnapshot();
    });
});