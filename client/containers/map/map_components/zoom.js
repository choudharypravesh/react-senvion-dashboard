/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "../../../../lib";

import SearchBox from "../../../../lib/places/SearchBox";

const INPUT_STYLE = {
   boxSizing: `border-box`,
   MozBoxSizing: `border-box`,
   border: `1px solid transparent`,
   width: `240px`,
   height: `30px`,
   marginTop: `15px`,
   padding: `0 12px`,
   borderRadius: `1px`,
   boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
   fontSize: `15px`,
   outline: `none`,
   textOverflow: `ellipses`,
};

const SearchBoxExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Customized your placeholder"
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
));


export default class SearchBoxExample extends Component {
  constructor(props){
    super(props),
  state = {
    bounds: null,
    center: {
      lat: 47.6205588,
      lng: -122.3212725,
    },
    markers: [],
  },

  this.handleMapMounted = this.handleMapMounted.bind(this);
  this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
  this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
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

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,

    });
  }

  render() {
    return (
      <div
        center={this.state.center}
        onMapMounted={this.handleMapMounted}
        onBoundsChanged={this.handleBoundsChanged}
        onSearchBoxMounted={this.handleSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.handlePlacesChanged}
      />
    );
  }
}
