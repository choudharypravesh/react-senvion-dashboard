import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Fleet from '../../../../client/containers/analyze/Fleet/Fleet';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment'

import { GetData } from '../../../../client/Utils/utils'



describe('Fleet', () => {

    var mock;
    var instance;
    let data = {start_date:"2017-06-10",end_date:"2017-07-10",ranking:false,level:"hub",variable:"pba",id:3}
    beforeEach(function() {
        instance = axios.create();
        mock = new MockAdapter(instance);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <Fleet/>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('correctly sets the adapter on the axios instance', function() {
        expect(instance.defaults.adapter).toBeDefined();
    });

    it('Data is fetched and mapped correctly', function() {

        let data = {start_date:"2017-06-10",end_date:"2017-07-10",ranking:false,level:"hub",variable:"pba",id:3}
        mock.onGet('/api/get/fleet/availability?data='+JSON.stringify(data)).reply(200, [
            {date: "2017-06-10T00:00:00.000Z", type_broad: "MM", value: 88.3437593070246}]);

        return instance.get('/api/get/fleet/availability?data='+JSON.stringify(data)).then(function(response) {
            //console.log(response);
            expect(response.status).toBe(200);
            expect(response.data[0].type_broad).toBe('MM');
            expect(response.data[0].date).toBe('2017-06-10T00:00:00.000Z');
            expect(response.data[0].value).toBe(88.3437593070246);
        });
    });

    it('does not match when parameters are wrong', function() {
        mock
            .onGet('/api/get/fleet/availability', JSON.stringify(data))
            .reply(200);
        return instance
            .get('/api/get/fleet/availability', JSON.stringify(data))
            .catch(function(error) {
                expect(error.response.status).to.equal(404);
            });
    });

    it('Dates are in the selected range (Last 30 days)', function() {
        const FleetWrapper = mount(<Fleet/>);
        const button = FleetWrapper.find('#last30');
        button.simulate('click');

        let date1 = moment(Date.now()).format('YYYY-MM-DD');
        let date2 = moment(Date.now()).subtract(30, 'days').format('YYYY-MM-DD');
       // console.log(date1, date2)
        expect(FleetWrapper.state().data.get('initialDate')).toBe(date2);
        expect(FleetWrapper.state().data.get('finalDate')).toBe(date1);
    });

    it('Dates are in the selected range (Last 90 days)', function() {
        const FleetWrapper = mount(<Fleet/>);
        const button = FleetWrapper.find('#last90');
        button.simulate('click');

        let date1 = moment(Date.now()).format('YYYY-MM-DD');
        let date2 = moment(Date.now()).subtract(90, 'days').format('YYYY-MM-DD');
        //console.log(date1, date2)
        expect(FleetWrapper.state().data.get('initialDate')).toBe(date2);
        expect(FleetWrapper.state().data.get('finalDate')).toBe(date1);
    });

    it('Dates are in the selected range (Last 180 days)', function() {
        const FleetWrapper = mount(<Fleet/>);
        const button = FleetWrapper.find('#last180');
        button.simulate('click');

        let date1 = moment(Date.now()).format('YYYY-MM-DD');
        let date2 = moment(Date.now()).subtract(180, 'days').format('YYYY-MM-DD');
        //console.log(date1, date2)
        expect(FleetWrapper.state().data.get('initialDate')).toBe(date2);
        expect(FleetWrapper.state().data.get('finalDate')).toBe(date1);
    });

    it('Dates are in the selected range (Last 360 days)', function() {
        const FleetWrapper = mount(<Fleet/>);
        const button = FleetWrapper.find('#last360');
        button.simulate('click');
        let date1 = moment(Date.now()).format('YYYY-MM-DD');
        let date2 = moment(Date.now()).subtract(360, 'days').format('YYYY-MM-DD');
        //console.log(date1, date2)
        expect(FleetWrapper.state().data.get('initialDate')).toBe(date2);
        expect(FleetWrapper.state().data.get('finalDate')).toBe(date1);
    });

    it('Tab changes correctly on click', function() {
        const FleetWrapper = mount(<Fleet/>);
        const button = FleetWrapper.find('.btn2');
        expect(FleetWrapper.state().data.get('selectedTab')).toBe(1);
        button.simulate('click');
        expect(FleetWrapper.state().data.get('selectedTab')).toBe(2);
    });

    it('Go button click sends and recieves correct data', function() {
        const FleetWrapper = mount(<Fleet/>);
        let data = {start_date:"2017-06-10",end_date:"2017-07-10",ranking:false,level:"hub",variable:"pba",id:3}
        mock.onGet('/api/get/fleet/availability?data='+JSON.stringify(data)).reply(200, [
            {date: "2017-06-10T00:00:00.000Z", type_broad: "MM", value: 88.3437593070246}]);

        return instance.get('/api/get/fleet/availability?data='+JSON.stringify(data)).then(function(response) {
            console.log(response);
            const button = FleetWrapper.find('#submit-filter-selection');
            button.simulate('click');
            expect(response.status).toBe(200);
        });
    });

    it('Tab for differenet country should change correctly',() => {
        const CounrtyTab = mount (<Fleet/>);
        const buttons = CounrtyTab.find('#onshore');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(8);
        buttons.simulate('click');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(7);
        const buttons1 = CounrtyTab.find('#americas');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(7);
        buttons1.simulate('click');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(1);
        const buttons2 = CounrtyTab.find('#australia');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(1);
        buttons2.simulate('click');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(2);
        const buttons3 = CounrtyTab.find('#eu_south_east');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(2);
        buttons3.simulate('click');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(5);
        const buttons4 = CounrtyTab.find('#eu_central');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(5);
        buttons4.simulate('click');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(3);
        const buttons5 = CounrtyTab.find('#eu_north');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(3);
        buttons5.simulate('click');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(4);
        const buttons6 = CounrtyTab.find('#eu_south_west');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(4);
        buttons6.simulate('click');
        expect(CounrtyTab.state().data.get('selectedChart')).toBe(6);
    });
});



/*Need flux transformation for this testing*/
/*describe('The main app', () => {
    it('the app should have text', () => {
        const app  = shallow(<MainSkeleton/>);
        const userName = app.find('.user_name');
        expect(app.contains(<div>Hello jest from react</div>)).toBe(true);
    })
})*/



/*it('tab selection onshore ', function() {
    const FleetWrapper = mount(<Fleet/>);
    const button = FleetWrapper.find('.btn2');
    expect(FleetWrapper.state().data.get('selectedTab')).toBe(1);
    button.simulate('click');
    expect (FleetWrapper.state().data.get('selectedTab')).toBe(2);
});*/




// describe('<FleetContainer/>', () => {
//     it('renders 1 <FleetContainer/> component', () => {
//         const component = shallow(<FleetContainer name="fleet"/>);
//         expect(component).toHaveLength(1)
//     })
//     describe('it renders props correctly', () => {
//         const component = shallow(<FleetContainer name="fleet"/>)
//         console.log(component.instance().props);
//     })
//     describe('it changes the graphs on button click Go', () => {
//         const component = mount(<FleetContainer/>)
//         console.log(component);
//     })
// })



























