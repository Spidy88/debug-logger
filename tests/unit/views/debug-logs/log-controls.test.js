import React from 'react';
import renderer from 'react-test-renderer';
import { LogControls } from '../../../../client/views/debug-logs';

describe('<LogControls>', () => {
    it('should match its snapshot', () => {
        const tree = renderer.create(
            <LogControls />
        );

        expect(tree.toJSON()).toMatchSnapshot();
    });
});