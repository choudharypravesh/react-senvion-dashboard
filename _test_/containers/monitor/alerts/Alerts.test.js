import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Alerts from '../../../../client/containers/monitor/alerts/Alerts';

    describe('Alerts', () => {
    xit('renders without crashing', () => {
        const div = global.document.createElement('div');
        ReactDOM.render(<Alerts/>, div);
    });
  });
    describe('App', () => {
        xit('should be able to run tests', () => {
            expect(1 + 2).toEqual(3);
        });
      });
