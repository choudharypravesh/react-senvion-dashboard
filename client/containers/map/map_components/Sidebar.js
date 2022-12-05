import React from 'react';
import reactDom from 'react-dom';
import FaCross from 'react-icons/lib/fa/times-circle';
import {ProgressBar} from 'react-bootstrap'
import '../../../../public/styles/containers/maps/sideBar.css';
import FaPlus from 'react-icons/lib/fa/plus-circle';
//import {
// withGoogleMap,
// GoogleMap,
//Marker,} from "react-google-maps/lib";
export  default  class SideBar extends React.Component
{
    constructor(props) {
        super(props)

        this.state = {
            showPopup: false
        }

        this.openCreateServiceOrderPopup = this.openCreateServiceOrderPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.closeInfoBox = this.closeInfoBox.bind(this);

    }

    closeInfoBox() {
        document.getElementById('popupLeft').style.display='none';
    }


    componentDidMount() {
        document.getElementById('popupLeft').style.display='none'
    }

    openCreateServiceOrderPopup() {
      //this.setState({showPopup: true})
      document.getElementById('openPopup').click();
  }

    closePopup(e) {
        this.setState({showPopup: false});
    }

    render(){
        return(
            <div className="side-info-map-container" id="popupLeft">
                <div className="popup-header">
                    <div>
                        <span id="wind_turbine"></span><br/>&nbsp;
                        <span id="wind_farm"></span>,&nbsp;<span id="country"></span>
                    </div>
                    <span onClick={this.closeInfoBox} className="cross"><FaCross/></span>
                </div><hr/>
                <div className="popup-content">
                    <div className="padding-top-bottom">
                        <div className="flex-container-nowrap flex-sb-h secondary-content">
                            <div>
                                <div className="flex-container-nowrap flex-sb-h">
                                    <div>Elevation Old:</div>
                                    <div className="count"><span id="elevation_old"></span></div>
                                </div>
                                <div className="flex-container-nowrap flex-sb-h">
                                    <div>Hub Height:</div>
                                    <div className="count"><span id="hub_height"></span></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex-container-nowrap flex-sb-h">
                                    <div>Type:</div>
                                    <div className="count"><span id="type"></span></div>
                                </div>
                                <div className="flex-container-nowrap flex-sb-h">
                                    <div>Rotor Diameter:</div>
                                    <div className="count"><span id="rotor_diameter"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/><br/>
                        <div className="flex-container-nowrap flex-sb-h primary-content">
                            <div>Commissioning Date:&nbsp;</div>
                            <div id="commissioning_date"></div>
                        </div><br/>
                    <hr/><br/>
                    <div className="power-wind">
                        <div className="flex-container-nowrap flex-start-h flex-sb-h">
                            <div>Energy Production (MWh)</div>
                            <div><ProgressBar bsStyle="danger" now={26} label={`--`} /></div>
                        </div>
                        <div className="flex-container-nowrap flex-start-h flex-sb-h">
                            <div>Average Power (KW): {/*<span id="power"></span>*/}</div>
                            <div><ProgressBar bsStyle="success" now={40} label={`-- `} /></div>
                        </div>
                        <div className="flex-container-nowrap flex-start-h flex-sb-h">
                            <div>Average Wind Speed (m/s)</div>
                            <div><ProgressBar bsStyle="info" now={40} label={`-- `} /></div>
                        </div>
                        <div className="flex-container-nowrap flex-start-h flex-sb-h">
                            <div>Outdoor Temperature (&#8451;)</div>
                            <div><ProgressBar bsStyle="warning" now={26} label={`-- `} /></div>
                        </div>
                    </div>
                    <div className="date padding-top-bottom text-right">
                        <div>Data for <span className="big-date">--</span></div>
                    </div>
                    <div className="text-center">
                        <div className="btn-group create-button" role="group">
                            <button onClick={this.openCreateServiceOrderPopup} className="btn btn-sm margin-right-small btn-success">
                                <FaPlus style={{fontSize: '15px'}}/>&nbsp;&nbsp;Create Service Order</button>
                        </div>
                    </div>
                </div>

            </div>

        );

    }
}
