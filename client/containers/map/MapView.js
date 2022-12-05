import React, {PropTypes} from "react"
import FaCross from 'react-icons/lib/fa/times-circle'
import axios from 'axios';
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"

import iconMarker from "../../../../public/images/icons/map-marker.svg"
import iconMarkerHover from "../../../../public/images/icons/iconmarker.png"

import MapStyles from "../../../../public/styles/containers/technician/MapView.css";

const MY_API_KEY = "AIzaSyBDeU6UJk93nZKTUh6Izk66BCTbI2tQEgM" // my key

let json = require('json!../../../../public/jsons/turbine_master.json');
let coordinates = [];




function componentDidMount() {
    console.log("here map data will come");

    axios.get('/api/map/turbine_data')
        .then(function(response) {
            //console.log(response.data.data);
            var data = response.data.data;
            InsertMapData(data);
        }).catch(function(err) {
        console.log(err);
        window.alert("Faliure "+err);
    });
}

if(window.location.pathname == "/maps") {
    console.log("loading map data");
    componentDidMount();
}

function InsertMapData(data) {
    for(let i=0; i<data.length; i++) {
        coordinates.push({
            title: "Turbine "+data[i].turbine_id,
            position: {
                lat: Number(data[i].latitude),
                lng: Number(data[i].longitude),
            },
            onLoaded: (googleMaps, map, marker) => {

                googleMaps.event.addListener(marker, "click", () => {
                    /*infoWindow.open(map, marker)*/
                    console.log(marker);
                    document.getElementById('popup-left').style.display = 'inherit';
                    document.querySelector('.turbine-heading').innerHTML = "Turbine "+data[i].turbine_id;
                    //document.getElementsByClassName('modal-header')
                })

                var pinIcon = new googleMaps.MarkerImage (
                    require("../../../../public/images/icons/turbine-blades.svg"),
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new googleMaps.Size(35,40)
                );


                var pinIconHover = new googleMaps.MarkerImage(
                    require("../../../../public/images/icons/turbine-blades.svg"),
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new googleMaps.Size(40,45)
                );

                marker.setIcon(pinIcon)

                // Change icon when Marker will be hovered
                googleMaps.event.addListener(marker, "mouseover", () => {
                    marker.setIcon(pinIconHover)
                })

                googleMaps.event.addListener(marker, "mouseout", () => {
                    marker.setIcon(pinIcon)
                })

                // Open InfoWindow directly
                //infoWindow.open(map, marker)
            },
        })
    }
}

let closePopup = function () {
    document.getElementById('popup-left').style.display = 'none';
}

var mapHeight = {
    height: window.innerHeight
}


const Map = ({googleMaps}) => (

    // GoogleMap component has a 100% height style.
    // You have to set the DOM parent height.
    // So you can perfectly handle responsive with differents heights.
    <div style={mapHeight} className="map">
        <div className="side-info-map-container" id="popup-left">
            <div className="popup-header">
                <span onClick={closePopup} className="cross"><FaCross/></span>
                <div>
                    <div className="farm-heading text-center">Maida Farm</div>
                    <div className="turbine-heading heading text-center">Turbine 90983</div>
                </div>
            </div>
            <div className="popup-content">
                <div className="table-padding">
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>
                                <div>Production</div>
                            </td>
                            <td>327Kwh</td>
                        </tr>
                        <tr>
                            <td>Avg Windspeed</td>
                            <td>5.83m/s</td>
                        </tr>
                        <tr>
                            <td>Wind Direction</td>
                            <td>94 Degree</td>
                        </tr>
                        <tr>
                            <td>Warnings</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Errors</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Repair Gearbox</td>
                            <td>20 May 2015</td>
                        </tr>
                        <tr>
                            <td>Change Oil</td>
                            <td>20 June 2019</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {/*{(coordinates.length > 0) ? (*/}
            <GoogleMap
                googleMaps={googleMaps}
                // You can add and remove coordinates on the fly.
                // The map will rerender new markers and remove the old ones.
                coordinates={coordinates}
                center={{lat: 38.8679616536, lng: 16.4487327437}}
                zoom={3}
                onLoaded={(googleMaps, map) => {
                    console.log(coordinates);
                    map.setMapTypeId(googleMaps.MapTypeId.ROADMAP)
                }}
            />
           {/* ) : null}*/}
    </div>
)

Map.propTypes = {
    googleMaps: PropTypes.object.isRequired,
}

export default GoogleMapLoader(Map, {
    libraries: ["places"],
    key: MY_API_KEY,
})
