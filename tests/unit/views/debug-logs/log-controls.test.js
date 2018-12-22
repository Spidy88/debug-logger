import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { LogControls } from '../../../../client/views/debug-logs';

describe('<LogControls>', () => {
    let testQuery;
    let testIsLive;
    let handleLive;
    let handlePause;
    let handleQueryChange;

    beforeEach(() => {
        testQuery = '';
        testIsLive = true;
        handleLive = jest.fn();
        handlePause = jest.fn();
        handleQueryChange = jest.fn();
    });

    it('should invoke pause callback when live is active', () => {
        const logControls = mount(
            <LogControls
                query={testQuery}
                isLive={testIsLive}
                onLiveSelected={handleLive}
                onPauseSelected={handlePause}
                onQueryChanged={handleQueryChange} />
        );

        const pauseButton = logControls.find('input[value="pause"]');
        pauseButton.simulate('change');

        expect(handleLive.mock.calls.length).toEqual(0);
        expect(handlePause.mock.calls.length).toEqual(1);
    });

    it('should invoke live callback when pause is active', () => {
        testIsLive = false;

        const logControls = mount(
            <LogControls
                query={testQuery}
                isLive={testIsLive}
                onLiveSelected={handleLive}
                onPauseSelected={handlePause}
                onQueryChanged={handleQueryChange} />
        );

        const liveButton = logControls.find('input[value="live"]');
        liveButton.simulate('change');

        expect(handleLive.mock.calls.length).toEqual(1);
        expect(handlePause.mock.calls.length).toEqual(0);
    });

    it('should not invoke live callback when live is active', () => {
        const logControls = mount(
            <LogControls
                query={testQuery}
                isLive={testIsLive}
                onLiveSelected={handleLive}
                onPauseSelected={handlePause}
                onQueryChanged={handleQueryChange} />
        );

        const liveButton = logControls.find('input[value="live"]');
        liveButton.simulate('change');

        expect(handleLive.mock.calls.length).toEqual(0);
        expect(handlePause.mock.calls.length).toEqual(0);

    });

    it('should not invoke pause callback when pause is active', () => {
        testIsLive = false;

        const logControls = mount(
            <LogControls
                query={testQuery}
                isLive={testIsLive}
                onLiveSelected={handleLive}
                onPauseSelected={handlePause}
                onQueryChanged={handleQueryChange} />
        );

        const pauseButton = logControls.find('input[value="pause"]');
        pauseButton.simulate('change');

        expect(handleLive.mock.calls.length).toEqual(0);
        expect(handlePause.mock.calls.length).toEqual(0);
    });

    it('should invoke query change callback when the search text changes', () => {
        const logControls = mount(
            <LogControls
                query={testQuery}
                isLive={testIsLive}
                onLiveSelected={handleLive}
                onPauseSelected={handlePause}
                onQueryChanged={handleQueryChange} />
        );

        const searchInput = logControls.find('input[test-id="logSearch"]').first();
        searchInput.simulate('change');

        expect(handleQueryChange.mock.calls.length).toEqual(1);
    });

    it('should match its snapshot', () => {
        const tree = renderer.create(
            <LogControls
                query={testQuery}
                isLive={testIsLive}
                onLiveSelected={handleLive}
                onPauseSelected={handlePause}
                onQueryChanged={handleQueryChange} />
        );

        expect(tree.toJSON()).toMatchSnapshot();
    });
});