/*
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import OrdersCalenderView from 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const OrdersCalenderView = props => (
    <div>
        <BigCalendar
            events={myEventsList}
            startAccessor='startDate'
            endAccessor='endDate'
        />
    </div>
);*/

import React from 'react';
import MapView from './MapView';
import {Link} from 'react-router'
import FaList from 'react-icons/lib/fa/list';
import FaCalender from 'react-icons/lib/fa/calendar';
import FaMarker from 'react-icons/lib/fa/map-marker'


class OrdersCalenderView extends React.Component {
    render() {
        return(
            <div className="map-container body-wrapper" id="orders-map-view">
                <div className="flex-container flex-sb-h content-heading-margins">
                    <div className="heading-title"></div>
                    <div className="btn-group" role="group">
                        <Link to="/service-assist/orders-list-view" className="btn btn-default"><FaList/></Link>
                        <Link to="/service-assist/orders-list-view" className="btn btn-default active"><FaCalender/></Link>
                        <Link to="/service-assist/map-view" className="btn btn-default"><FaMarker/></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrdersCalenderView;
