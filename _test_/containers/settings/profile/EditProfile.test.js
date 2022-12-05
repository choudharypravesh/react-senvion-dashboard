import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import EditProfile from '../../../../client/containers/settings/profile/EditProfile';

it('renders correctly', () => {
    const tree = renderer.create(
        <EditProfile/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
})