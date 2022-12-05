
import React from 'react'
import {ProgressBar} from 'react-bootstrap'
import DashboardCss from '../../../public/styles/containers/dashboard/Dashboard.css'
import ReactCookie from 'react-cookie';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Line } from 'rc-progress';
import axios from 'axios'
import _ from 'underscore'
import Chart from '../../components/PlotlyChart/skeleton'
import { connect } from 'react-redux'
import {getAlertCount,getBestFarms,getBestTurbines,getWorstTurbine,getWorstFarms,getDashboardAvailabilityData,getAlertsDataByTime,getDashboardPbaData} from './dashboardActions'
import {getCountryFarmsList,getFarmsAndTurbinesList} from '../../actions/AppActions'

function Cards(props) {
  return(
      <div className="alert_box">
          <div className="info_box" >
          <div className="value_box">
            <div ><h5>Alerts</h5></div>
            <div><h2>{props.totalAlerts}</h2></div>
            <div className="expl">No. Of Alerts</div>
          </div>
          <div className="line" />
          <div className="value_box">
          <div><h5>&nbsp;</h5></div>
          <div><h2>{props.openAlerts}</h2></div>
          <div className="expl">No. Of Open Alerts</div>
          </div>
        </div>
        <div className="info_box" >
          <div className="value_box">
          <div><h5>Service Orders</h5></div>
          <div><h2>-</h2></div>
          <div className="expl">No. Of Orders</div>
          </div>
          <div className="line" />
          <div className="value_box">
          <div><h5>&nbsp;</h5></div>
          <div><h2>-</h2></div>
          <div className="expl">No. Of Open Orders</div>
          </div>
        </div>
        <div className="info_box" >
          <div className="value_box2">
          <div><h5>&nbsp;</h5></div>
          <div><h2>-</h2></div>
          <div className="expl">Average Time To Resolve</div>
          </div>
        </div>
        <div className="info_box" >
          <div className="value_box2">
          <div><h5>&nbsp;</h5></div>
          <div><h2>-</h2></div>
          <div className="expl">Average Time To Diagnose</div>
          </div>
        </div>
        <div className="info_box" >
          <div className="value_box2">
          <div><h5>&nbsp;</h5></div>
          <div><h2>-</h2></div>
          <div className="expl">Average Down Time</div>
          </div>
        </div>
      </div>
  )
}

function ShowBestAndWorst(props){
    let topWorstStyle = {
        height: '37px',
        display: 'flex',
        textAlign: 'justify-content'
    };
    let list = props.list.map(farms => {
               return (<li>
                   <div style={topWorstStyle}>
                       <div style={{width:props.tWidth,textOverflow: 'ellipsis', overflow: 'hidden'}}>{farms.wind_farm || farms.wind_turbine_serial_id_fk}</div>
                       <div style={{width:props.pWidth, margin: '0% 5%'}}>
                           {/*<Line percent={this.props.bestFarmsArray[i].value} strokeWidth="4" strokeColor="#4682b4" />*/}
                           <ProgressBar bsStyle={props.color} now={farms.value} />
                       </div>
                       <div style={{width:props.vWidth}}>{Math.ceil(farms.value)}%</div>
                   </div>
               </li>);
           });
    return (
        <ul style={{listStyleType:'none'}}>
           { list }
        </ul>
        )
}

function TopFarms(props){
  return(
    <div>
        <div style={{display:'flex',width:'100%'}}>
            <div id="topfarm" className="listMargins">
                <h4>Availability - Top Farms </h4>

                    <ShowBestAndWorst list= {props.bestFarmsArray} color="success" tWidth='30%' pWidth='45%' vWidth='20%'/>

                </div>
            <div id="worstfarm" className="listMargins">
                <h4>Availability - Worst Farms </h4>

                    <ShowBestAndWorst list= {props.worstFarmsArray} color="danger" tWidth='30%' pWidth='45%' vWidth='20%'/>

            </div>
            <div id="topwecs" className="listMargins">
                <h4>Availability - Top WECs </h4>

                    <ShowBestAndWorst list= {props.bestTurbinesArray} color="success" tWidth='20%' pWidth='55%' vWidth='20%'/>

            </div>
            <div id="worstwecs" className="listMargins">
                <h4>Availability - Worst WECs </h4>

                    <ShowBestAndWorst list= {props.worstTurbinesArray} color="danger" tWidth='20%' pWidth='55%' vWidth='20%'/>

            </div>
        </div>
    </div>
  );
}



class HeatMap extends React.Component {
    constructor(props) {
        super(props),

        this.state = {
            country_id: [],
            count: []
        }

        this.getMapData = this.getMapData.bind(this);
    }

    getMapData() {
        var self = this;

        axios.get('/api/get/dashboard/alertByLocation')
            .then(function(response) {
                let country_ids = _.map(response.data.data, function(item) {
                    return item.country_id
                })

                let counts = _.map(response.data.data, function(item) {
                    return Number(item.count);
                })

                let countries = _.map(response.data.data, function(item) {
                    return item.country_name
                })

                self.setState({country_id: country_ids, count: counts})

                plotter(country_ids, counts, countries);

            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });

        function plotter(country_ids, counts, countries) {

            var data = [{
                type: 'choropleth',
                locations: country_ids,
                z: counts,
                text: countries,
                colorscale: [[0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],[0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],[0.7,'rgb(44, 90, 249)'],[1,'rgb(220, 220, 220)']],
                autocolorscale: false,
                reversescale: true,
                showscale:true,
                marker: {
                    line: {
                        color: 'rgb(180,180,180)',
                        width: 0.5
                    }
                },
                tick0: 0,
                zmin: 0,
                dtick: 1000,
                colorbar: {
                    autotic: false

                },
            }];


            var layout = {
                title: 'Alerts By Location',
                titlefont:{
                    family: 'Arial, Helvetica, sans-serif',
                    size: 20,
                },
                margin: {
                    t: 50, r:50, l:50, b:0
                },
                /*width: window.innerWidth/3.35,
                height: window.innerHeight/2.9,*/
                geo:{
                    showframe: false,
                    showcoastlines: false,
                    projection:{
                        type: 'mercator'
                    }

                },
            };
            Plotly.plot(one, data, layout, {displayModeBar: false,showLink: false});
        }
    }


    componentDidMount() {
        this.getMapData();
        //Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv',plotter);
    }

    render() {
      var plotMargins={
        margin:'0.5%',
        backgroundColor:' #ffffff',
        border:' 1px solid #ddd',
        borderRadius: '2px',
        padding:' 1px',
        height:window.innerHeight/2.8,
        width:window.innerWidth/3.4
      }
        var plotMargins1={
          width:window.innerWidth/3.5,
          height:window.innerHeight/3
        }
        var name="one";
        return(
          <div style={plotMargins}>
            <div style={plotMargins1} id={name}></div>
          </div>
        )
    }
}

class Dashboard extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        let self = this;
        const {dispatch} = this.props;
        dispatch(getAlertsDataByTime());
        dispatch(getDashboardAvailabilityData());
        dispatch(getBestFarms())
        dispatch(getBestTurbines())
        dispatch(getWorstFarms())
        dispatch(getWorstTurbine());
        dispatch(getAlertCount());
        dispatch(getDashboardPbaData());
        dispatch(getCountryFarmsList());
        dispatch(getFarmsAndTurbinesList());

        window.onresize = function() {
            self.refs.alertsByLocation.getMapData();
            self.refs.alerts.resizeChart(window.innerWidth/3.35, window.innerHeight/2.9)
            self.refs.availability.resizeChart(window.innerWidth/3.35, window.innerHeight/2.9)
        }
    }
    render() {
      var plotMargins={
        margin:'0.5%',
        backgroundColor:' #ffffff',
        border:' 1px solid #ddd',
        borderRadius: '2px',
        padding:' 1px',
        height:window.innerHeight/2.8,
        width:window.innerWidth/3.1
      };
      return(

          <div className="dashboard-container">
            <Cards
                totalAlerts={this.props.totalAlerts}
                openAlerts={this.props.openAlerts}
            />
            <div className="graphs">
              <div className="graph-flex">
                <HeatMap ref="alertsByLocation" />
                <div id="chartloader" style={plotMargins}>
                        <Chart ref="alerts"
                            title= "Alerts"
                            x1= {this.props.alertsByTimeX}
                            y1= {this.props.alertsByTimeY}
                            name= "Alerts"
                            type= "scatter"
                            fill="tonexty"
                            showscale="false"
                            name1= "Number Of Alerts"
                            width= {window.innerWidth/3.35}
                            height= {window.innerHeight/2.9}
                            symbol= "'42'"
                            description = "This is Alerts Graph"
                            loader = {this.props.alertsByTimeLoader}
                            noData = {this.props.alertsByTimeNoData}
                            saveChart={true}
                            />
                      </div>
                <div style={plotMargins}>

                    <Chart ref="availability"
                        title= "Availability(time & Production)"
                        x1= {this.props.availabilityX}
                        y1= {this.props.availabilityY1}
                        x2= {this.props.availabilityX}
                        y2= {this.props.availabilityY2}
                        name= "plot-availability"
                        type= "scatter"
                        name1= "Time"
                        name2= "Production"
                        isTwoAxisChart= {true}
                        yaxis= 'y2'
                        yAxis2Title="Availability( production)"
                        overlaying="y"
                        side="right"
                        showscale="false"
                        width= {window.innerWidth/3.35}
                        height= {window.innerHeight/2.9}
                        loader= {this.props.availabilityLoader}
                        noData= {this.props.availabilityNoData}
                        saveChart={true}
                    />
                </div>
              </div>
            </div>
              <TopFarms
                  bestFarmsArray={this.props.bestFarmsArray}
                  worstFarmsArray={this.props.worstFarmsArray}
                  bestTurbinesArray={this.props.bestTurbinesArray}
                  worstTurbinesArray={this.props.worstTurbinesArray}
              />
          </div>

      )
    }
}

const mapStateToProps = state => {
    let {DashboardData} = state
    let dashboard = {
        totalAlerts : DashboardData.get('totalAlerts'),
        openAlerts : DashboardData.get('openAlerts'),
        bestFarmsArray : DashboardData.get('bestFarmsArray'),
        alertsByTimeX : DashboardData.get('alertsByTimeX'),
        alertsByTimeY : DashboardData.get('alertsByTimeY'),
        alertsByTimeLoader : DashboardData.get('alertsByTimeLoader'),
        alertsByTimeNoData : DashboardData.get('alertsByTimeNoData'),
        availabilityX : DashboardData.get('availabilityX'),
        availabilityY1 : DashboardData.get('availabilityY1'),
        availabilityY2 : DashboardData.get('availabilityY2'),
        availabilityLoader : DashboardData.get('availabilityLoader'),
        availabilityNoData : DashboardData.get('availabilityNoData'),
        worstFarmsArray : DashboardData.get('worstFarmsArray'),
        bestTurbinesArray : DashboardData.get('bestTurbinesArray'),
        worstTurbinesArray : DashboardData.get('worstTurbinesArray')
    }
    return dashboard
}
export default connect(mapStateToProps)(Dashboard);
