import React from 'react';
import MapView from './MapView';
import {Link} from 'react-router'
import FaList from 'react-icons/lib/fa/list';
import FaCalender from 'react-icons/lib/fa/calendar';
import FaMarker from 'react-icons/lib/fa/map-marker'


class OrdersMapView extends React.Component {
    render() {
        return(
            <div>
                <div className="map-container body-wrapper" id="orders-map-view">
                    <div className="flex-container flex-sb-h content-heading-margins">
                        <div className="heading-title"></div>
                        <div className="btn-group" role="group">
                            <Link to="/service-assist/orders-list-view" className="btn btn-default"><FaList/></Link>
                            <Link to="/service-assist/orders-list-view" className="btn btn-default"><FaCalender/></Link>
                            <Link to="/service-assist/map-view" className="btn btn-default active"><FaMarker/></Link>
                        </div>
                    </div>
                </div>
                <div className="">
                    <MapView/>
                </div>
            </div>
        )
    }
}

export default OrdersMapView;