import React from 'react';
import renderer from 'react-test-renderer';
import { render } from 'enzyme';
import ServerStatus from '../../../client/components/server-status';

describe('<ServerStatus>', () => {
    it('should render the provided status message', () => {
        const statusMessage = 'Testing in progress';
        const serverStatus = render(<ServerStatus status={statusMessage} />);

        expect(serverStatus.text()).toEqual(statusMessage);
    });

    it('should match its snapshot', () => {
        const statusMessage = 'Testing in progress';
        const tree = renderer.create(<ServerStatus status={statusMessage} />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});