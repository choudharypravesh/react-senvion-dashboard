import React from 'react';
import axios from 'axios'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import fetch from "isomorphic-fetch";
import _ from 'underscore'
import classnames from 'classnames'

const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={props.defaultZoom}
        defaultCenter={{ lat: 45.7077672, lng: -70.59371879 }}
        center={props.center}
        onClick={props.onMapClick}
    >
        {props.markers.map((marker, index) => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(index)}
            />
        ))}
    </GoogleMap>
));

//TODO: need to cover map into redux approach
class Map extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            markers: [],
            defaultZoom: 13,
            selectedFarm: this.props.farm,
            center: {lat: 45.7077672, lng: -70.59371879},
            isNoTurbines:false
        };
        this.loadTurbines = this.loadTurbines.bind(this)
        this.onMapLoad = this.onMapLoad.bind(this);
    }
    loadTurbines() {
        let self = this;
        console.log(self.props.farm);
        var data = {
            wind_farm: self.props.farm //"Renardière"
        }
        console.log(data);
        this.setState({isNoTurbines:false})
        //data = encodeURIComponent(JSON.stringify(data));
        fetch(`/api/get/forecast/weather/map?data=`+JSON.stringify(data))
        .then(res => res.json())
        .then(data => {
            var response = data.data;
              if (response.length > 0){
                  var updatedData = []

                  for(let i=0; i<response.length; i++) {
                      var temp = {
                          position: {
                              lat: 45.7077672,
                              lng: -70.59371879,
                          },
                          key: `Canada`+i,
                          defaultAnimation: 2,
                      }

                      temp.position.lat = response[i].coordinate_latitude;
                      temp.position.lng = response[i].coordinate_longitude;

                      updatedData.push(temp);
                  }

                  updatedData = _.map(updatedData, function(item) {
                      item.position.lat = Number(item.position.lat);
                      item.position.lng = Number(item.position.lng);
                      return item;
                  })

                  this.setState({ markers: updatedData,
                      center: { lat: updatedData[0].position.lat, lng: updatedData[0].position.lng}});
              }
              else{
                  this.setState({isNoTurbines: true});
              }

        });
    }

    componentDidMount() {
        this.loadTurbines();
    }

    componentWillReceiveProps() {
        let self = this;
        this.loadTurbines();
        /*setTimeout(function() {
            self.setState({defaultZoom: 20});
        }, 4000)*/
    }

    onMapLoad() {
    }

    render() {
        var plotMargins = {
            marginBottom: "14px",
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1px',
            width: this.props.width,
            height: this.props.height,
        }
        var error={
            width:'100%',
            textAlign :"center",

            lineHeight:'300px'
        }

        if (this.state.isNoTurbines == false){
            return (
                <GettingStartedGoogleMap
                    containerElement={
                        <div style={plotMargins} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    defaultZoom={this.state.defaultZoom}
                    onMapLoad={this.onMapLoad}
                    onMapClick={_.noop}
                    markers={this.state.markers}
                    center = {this.state.center}
                    onMarkerRightClick={_.noop}
                />
            )
        }
        else{
            return(
                <div style={error}>
                    No Turbine data available for this Farm
                </div>
                )

        }

    }
}

export default Map;