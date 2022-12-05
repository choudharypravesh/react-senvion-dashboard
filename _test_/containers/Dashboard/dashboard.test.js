import Dashboard from '../../../client/containers/dashboard/Dashboard'
import renderer from 'react-test-renderer';
import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';


describe('Dashboard', () => {
    it('renders correctly', () => {
        const tree = renderer.create(
            <Dashboard/>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })

   it('loader stops when data fetched', () => {
       const CounrtyTab = mount(<Dashboard/>);
      console.log(CounrtyTab.state().data.get('alertsByTimeX'));

       const tree = renderer.create(
           <Dashboard/>
       ).toJSON()
      console.log(tree);

      if(CounrtyTab.state().data.get('alertsByTimeX').length > 0) {
          expect(CounrtyTab.state().data.get('alertsByTimeLoader')).toBe(false);
      } else {
          expect(CounrtyTab.state().data.get('alertsByTimeLoader')).toBe(true);
      }
   })


})
