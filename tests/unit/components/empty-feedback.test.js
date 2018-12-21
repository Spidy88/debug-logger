import React from 'react';
import renderer from 'react-test-renderer';
import EmptyFeedback from '../../../client/components/empty-feedback';

describe('<EmptyFeedback>', () => {
    it('should render the feedback component', () => {
        const icon = 'barber';
        const message = 'Test message';
        const subMessage = 'A message below the main message';

        const tree = renderer.create(
            <EmptyFeedback icon={icon} message={message} subMessage={subMessage} />
        );

        expect(tree.toJSON()).toMatchSnapshot();
    });
});