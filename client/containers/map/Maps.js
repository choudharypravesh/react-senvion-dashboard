import fetch from "isomorphic-fetch";
import ReactDOM from 'react-dom';
import {
  default as React,
  Component,
} from "react";
//import './sideBar.css';
import SideBarCss from  "../../../public/styles/containers/maps/sideBar.css";
import axios from 'axios';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps/lib";
//import {SearchBoxExample} from './map_components/zoom.js';
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import SearchBox from "react-google-maps/lib/places/SearchBox";
import SideBar from './map_components/Sidebar';
import _ from 'underscore';
import moment from 'moment'
const MY_API_KEY = "AIzaSyBDeU6UJk93nZKTUh6Izk66BCTbI2tQEgM";

const INPUT_STYLE = {
  position:'absolute',
    boxSizing: `border-box`,
    MozBoxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `28px`,
    marginTop: `31px`,
    marginLeft:'20px',
    padding: `0 12px`,
    borderRadius: `1px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `15px`,
    outline: `none`,
    textOverflow: `ellipses`,
};


function onclick(id){
  var a= +id;
  console.log(id);
  document.getElementById('wind_farm').innerHTML=id.wind_farm;
  document.getElementById('wind_turbine').innerHTML=id.turbine_id;
  document.getElementById('commissioning_date').innerHTML=moment(new Date(id.commissioning_date)).format('LL');
  /*document.getElementById('elevation').innerHTML=id.elevation;*/
  document.getElementById('elevation_old').innerHTML=id.elevation_old;
  document.getElementById('hub_height').innerHTML=id.hub_height;
  /*document.getElementById('series').innerHTML=id.series;*/
  document.getElementById('type').innerHTML=id.type;
  document.getElementById('rotor_diameter').innerHTML=id.rotor_diameter;
  document.getElementById('popupLeft').style.display='block';
  document.getElementById('country').innerHTML = id.country_name;

    let data= {
        turbine_id: id.turbine_id
    }
    axios.get('/api/map/turbine_data_details?data='+JSON.stringify(data))
        .then(function(response) {
          console.log(response.data.data);
          if(response.data.data.length == 0) {
            console.log("NA");
                /*document.getElementById('power').innerHTML= "NA"
                document.getElementById('wind_speed').innerHTML= "NA"*/
            }else if(response.data.status == true) {
              let var1 = "NA";
              let var2 = "NA";
              let var3 = "NA";
              for (let i in response.data.data) {
                if (response.data.data[i].variable_id_fk == 1372) {
                  var1 = response.data.data[i].value
                } else if(response.data.data[i].variable_id_fk == 569) {
                  var2 = response.data.data[i].value
                } else {
                    var3 = response.data.data[i].value
                }
              }

              let measuring_date = moment(new Date(response.data.data[0].measuring_date)).format('DD MMM YYYY')


              //Selectors
              let powerSelector = document.querySelector('.progress-bar-success');
              let windSelector = document.querySelector('.progress-bar-info');
              let tempSelector = document.querySelector('.progress-bar-warning');
              let energySelector = document.querySelector('.progress-bar-danger');


              let powerPercentWidth = 100*[parseFloat(var1).toFixed(1)/2000]
              let powerValue = parseFloat(var1).toFixed(1);
              powerSelector.setAttribute('aria-valuenow', powerValue)
              powerSelector.setAttribute('aria-valuemax', 2000)
              powerSelector.style.width = powerPercentWidth+"%"
              powerSelector.innerHTML = Math.abs(powerValue)+"&nbsp;"

              //If progressbar percent is small, make color black for visibility.
              /*if(powerPercentWidth < 30) {
                  powerSelector.style.color = "#333";
                  windSelector.style.color = "#333";
                  tempSelector.style.color = "#333";
              }*/
              /*document.querySelector('#power').innerHTML = parseFloat(var1).toFixed(2)+"kW"*/

              let windPercentWidth = 100*[parseFloat(var2).toFixed(1)/24]
              let windValue = parseFloat(var2).toFixed(1);
              windSelector.setAttribute('aria-valuenow', parseFloat(var2).toFixed(1));
              windSelector.setAttribute('aria-valuemax', 24);
              windSelector.style.width = windPercentWidth+"%";
              windSelector.innerHTML = Math.abs(windValue)+"&nbsp;";
              /*document.querySelector('#wind_speed').innerHTML = parseFloat(var1).toFixed(2)+"kW"*/

              let tempPercentWidth = 100*[parseFloat(var3).toFixed(1)/50]
              let tempValue = parseFloat(var3).toFixed(1)
              tempSelector.setAttribute('aria-valuenow', parseFloat(var3).toFixed(1));
              tempSelector.setAttribute('aria-valuemax', 50);
              tempSelector.style.width = tempPercentWidth+"%";
              tempSelector.innerHTML = Math.abs(tempValue)+"&nbsp;";


              let energyValue = powerValue/24
              let energyProduction = 100*[energyValue/48]
              energySelector.setAttribute('aria-valuenow', energyValue);
              energySelector.setAttribute('aria-valuemax', 48);
              energySelector.style.width = energyProduction+"%";
              energySelector.innerHTML = Math.abs(energyValue.toFixed(1))+"&nbsp;";
              document.querySelector('.big-date').innerHTML = measuring_date

            }
        }).catch(function(err) {
        console.log(err);
        window.alert("Faliure "+err);
    });

}

const MarkerClustererExampleGoogleMap = withGoogleMap(props => (


  <GoogleMap
    defaultZoom={14}
    ref={props.onMapMounted}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
    key={MY_API_KEY}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
       styles={[{
                url: "https://googlemaps.github.io/js-marker-clusterer/images/m1.png",
                width: 53,
                height:53,
                fontFamily:"comic sans ms",
                textSize:15,
                textColor:"black",

            }]}
      title={"Please double click to zoom"}
    >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Enter the name of city"
      inputStyle={INPUT_STYLE}
    />

      {props.markers.map(marker => (
        <Marker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          key={marker.photo_id}
          onClick={() => {onclick(marker);}}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));


export default class  Maps extends Component {
  constructor(props){
    super(props),
    this.state = {
      bounds: null,
      center: {
        lat: 53.5511,
        lng: 9.9937,
      },
    markers: []
  },
  this.handleMapMounted = this.handleMapMounted.bind(this);
  this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
  this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  this.handlePlacesChanged = this.handlePlacesChanged.bind(this)

}

  componentDidMount() {
    // fetch(`/api/map/turbine_data`)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ markers: data.photos });
    //   });
    fetch(`/api/map/turbine_data`)
              .then(res => res.json())
              .then(data => {
                  console.log(data);

                  let updatedData = _.map(data.data, function(item) {
                      item.latitude = Number(item.latitude);
                      item.longitude = Number(item.longitude);
                      item.commissioning_date    = item.commissioning_date;
                      item.elevation   = item.elevation;
                      item.elevation_old   = item.elevation_old;
                      item.hub_height    = item.hub_height;
                      item.rotor_diameter    = item.rotor_diameter;
                      item.series    = item.series;
                      item.turbine_id    = item.turbine_id;
                      item.type    = item.type;
                      item.wind_farm   = item.wind_farm;
                      item.wind_turbine    = item.wind_turbine;
                      item.country_name = item.country_name

                      return item;
                  })

                  this.setState({ markers: updatedData });
              });
  }



  handleMapMounted(map) {
    this._map = map;

  }

  handleBoundsChanged() {
    this.setState({

      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });

  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;

  }

  handlePlacesChanged() {

    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    console.log(markers);

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    this.setState({
      center: mapCenter,
    });

  }


  render() {
    return (
        <div style={{position: 'absolute', top: '3vh', left: '0%'}}>
            <MarkerClustererExampleGoogleMap
                containerElement={
                    <div style={{ height: `97vh`, width: '100vw' }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }

                center={this.state.center}
                onMapMounted={this.handleMapMounted}
                onBoundsChanged={this.handleBoundsChanged}
                onSearchBoxMounted={this.handleSearchBoxMounted}
                bounds={this.state.bounds}
                onPlacesChanged={this.handlePlacesChanged}
                markers={this.state.markers}
            />
            <SideBar owner={this.state.owner}/>
        </div>
    );
  }
}
