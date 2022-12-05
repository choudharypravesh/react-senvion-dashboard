/* global google */
import fetch from "isomorphic-fetch";
import axios from 'axios';
import _ from 'underscore'

import React from 'react'

import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps/lib";

import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";

/*var image = {
 url: require("../../../../public/images/icons/turbine-blades.svg"),
 // This marker is 20 pixels wide by 32 pixels high.
 null, /!* size is determined at runtime *!/
 null, /!* origin is 0,0 *!/
 null, /!* anchor is bottom center of the scaled image *!/
 size: new google.maps.Size(50,50)
 };*/

var image = {
    url: require("../../../public/images/icons/turbine-blades.svg"),
    size: new google.maps.Size(35,40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(35,40)
};

const MarkerClustering = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
    >
        <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map(marker => (
                <Marker
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    key={marker.photo_id}
                    icon={image}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
));

export default class MapView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            markers: [],
        }

    }

    componentDidMount() {

        fetch(`/api/map/turbine_data`)
            .then(res => res.json())
            .then(data => {

                let updatedData = _.map(data.data, function(item) {
                    item.latitude = Number(item.latitude);
                    item.longitude = Number(item.longitude);
                    return item;
                })

                this.setState({ markers: updatedData });
            });
    }

    render() {

        var mapHeight = {
            height: window.innerHeight,
            position: 'absolute',
            width: '100%',
            top: '0%'
        }

        return (
            <MarkerClustering
                containerElement={
                    <div style={mapHeight} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
                markers={this.state.markers}
            />
        );
    }
}