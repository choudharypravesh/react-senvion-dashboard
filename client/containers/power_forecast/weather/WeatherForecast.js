/* global Plotly */

import React from 'react';
import WeatherCss from '../../../../public/styles/containers/power_forecast/Weather.css'
import 'react-virtualized-select/styles.css';
import 'react-dates/lib/css/_datepicker.css';
import FaLeft from 'react-icons/lib/fa/chevron-circle-left'
import FaRight from 'react-icons/lib/fa/chevron-circle-right'
import {getWeatherForecastData, setForecastOffset} from './WeatherActions'
import moment from 'moment'
import Chart from '../../../components/PlotlyChart/skeleton';
import compass from '../../../../public/images/icons/compass.svg'
import temp from '../../../../public/images/icons/temp.svg'
import snow from '../../../../public/images/icons/snow.svg'
import precipitation from '../../../../public/images/icons/precipitation.svg'
import sunny from '../../../../public/images/icons/sunny.svg';
import day from '../../../../public/images/icons/day.svg';
import night from '../../../../public/images/icons/night.svg';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import NoData from '../../../components/NoData/NoData';
import Loader from '../../../components/Loader/Loader';
import classnames from 'classnames'
let windowWidth =  window.innerWidth;
class WeatherForecast extends React.Component {
    constructor(props){
        super(props);
        this.getNextDetails = this.getNextDetails.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.identifyTime = this.identifyTime.bind(this)
        this.offset = this.props.offset;
    }
    componentDidMount(){
        this.getDetails();
        this.limit = 8;
        this.getDetails();
    }
    getDetails(args){
        let date = (args && args.date) ||  this.props.dateOfForecast;
        let params = {
            vendor:'aries',
            resolution: this.props.forecastType,
            wind_farm: (args && args.windFarm) || this.props.selectedFarm,
            date: date.format('YYYY/MM/DD'),
            limit: (args && args.chart) ? undefined : this.limit,//send offset and limit for cards data and for chart those will be undefined
            offset: this.offset
        };
        this.props.dispatch(getWeatherForecastData(params));
    }
    componentWillReceiveProps(newProps){
        if(newProps.selectedFarm != this.props.selectedFarm ){
            this.getDetails({windFarm: newProps.selectedFarm});
            this.getDetails({chart: true});
            this.offset = 0;
        }
        if(newProps.dateOfForecast != this.props.dateOfForecast){
            this.getDetails({date: newProps.dateOfForecast});
            this.getDetails({chart: true, date: newProps.dateOfForecast});
        }
    }
    getNextDetails(offset){
        this.offset = offset;
        this.props.dispatch(setForecastOffset(offset,this.props.forecastType))
        this.getDetails();
    }
    identifyTime(time){
        var format = 'HH:mm'
        var time = moment(moment(time).format(format), format),
          beforeTime = moment('07:00:00', format),
          afterTime = moment('19:00:00', format);
        if (time.isBetween(beforeTime, afterTime)) {
          return 'day';
        } else {
          return 'night';
        }
    }
    render() {
        let dataList = !this.props.loadingCardsForecastData ? _.map(this.props.hourlyWeatherForecastCardsData, (data ,i)=> {
            let iconTime = this.identifyTime(data.dateTimeISO);
            let time = moment(data.dateTimeISO).locale('en').format('LT');
            if(this.props.forecastType === 'daily'){
                time = moment(data.dateTimeISO).locale('en').format('llll').split(',');
                time = [time[0], time[1]].join(' ');
            }

            return <OneDayForecastContainer key={i+this.props.forecastType}
                                time={time}
                                windDir={data.windDirMin80m}
                                minTemp={data.minTempC}
                                maxTemp={data.maxTempC}
                                avgTemp={data.avgTempC}
                                pop={data.pop}
                                precipitation={data.precipIN}
                                humidity={data.humidity}
                                pressure={data.pressureMB}
                                ice={data.iceaccum}
                                snow={data.snowCM}
                                weather={data.weather}
                                forecastType = {this.props.forecastType}
                                windSpeed = {data.windSpeed80mKPH}
                                iconTime = {iconTime}
                            />
        }): [];
        !this.props.loadingCardsForecastData && !this.props.noForecastCardsData && dataList.splice(0,0,<OneDayForecastContainer key = 'icons' showIcons= {true} forecastType={this.props.forecastType}/>);
        let prevMsg = "Previous "+this.limit+(this.props.forecastType === 'hourly' ? " hours" : " days");
        let nextMsg = "Next "+this.limit+(this.props.forecastType === 'hourly' ? " hours" : " days");
        let noData = this.props.noForecastData;
        if((this.props.forecastType === 'hourly' && noData) || this.props.noForecastCardsData){
            return (
                <NoData width={window.innerWidth - 120}/>
            )
        }
        return (
            <div className="top-buffer">
                {this.props.forecastType === 'hourly' && <div className='row'>
                    <Chart
                        name="plot1"
                        type="scatter"
                        width={window.innerWidth-90}
                        height={300}
                        decription = "this is decription"
                        traceCount={4}
                        name1="WS Avg"
                        name2="WS Min"
                        name3="WS Max"
                        name4="W Gust"
                        x1 = {this.props.forecastData.date}
                        x2 = {this.props.forecastData.date}
                        x3 = {this.props.forecastData.date}
                        x4 = {this.props.forecastData.date}
                        y1 = {this.props.forecastData.wsAvg}
                        y2 = {this.props.forecastData.wsMin}
                        y3 = {this.props.forecastData.wsMax}
                        y4 = {this.props.forecastData.wGust}
                        shape='spline'
                        loader={this.props.loader}
                        noData={this.props.allNoData}
                        saveChart={true}
                        />
                </div>
                }
                {this.props.forecastType === 'hourly' &&
                    <div className="row top-buffer-2">
                        <div className="heading-title">Weather Hourly Forecast</div>
                    </div>
                }
                <div className='row'>
                     <div className='top-buffer date-slider col-xs-12'>
                        {   this.props.forecastType == 'daily' ?
                                <div className='pull-right'>
                                    <span className={classnames('btn btn-xs h-text',{'selected' : this.props.offset === 0})} onClick={() =>this.getNextDetails(0)}>1-8 Days</span>
                                    <span className={classnames('btn btn-xs h-text',{'selected' : this.props.offset === 8})} onClick={() =>this.getNextDetails(8)}>9-14 Days</span>
                                </div>
                            :
                                <div className='pull-right'>
                                    <span className={classnames('btn btn-xs h-text',{'selected' : this.props.offset === 0})} onClick={() => this.getNextDetails(0)}>1-8 Hours</span>
                                    <span className={classnames('btn btn-xs h-text',{'selected' : this.props.offset === 8})} onClick={() =>this.getNextDetails(8)}>9-17 Hours</span>
                                    <span className={classnames('btn btn-xs h-text',{'selected' : this.props.offset === 16})} onClick={() =>this.getNextDetails(16)}>18-25 Hours</span>
                                    <span className={classnames('btn btn-xs h-text',{'selected' : this.props.offset === 24})} onClick={() =>this.getNextDetails(24)}>26-33 Hours</span>
                                    <span className={classnames('btn btn-xs h-text',{'selected' : this.props.offset === 32})} onClick={() =>this.getNextDetails(32)}>34-41 Hours</span>
                                    <span className={classnames('btn btn-xs h-text',{'selected' : this.props.offset === 40})} onClick={() =>this.getNextDetails(40)}>42-48 Hours</span>
                                </div>
                        }
                    </div>
                </div>
                <div className="row">
                    {this.props.loadingCardsForecastData ?
                        <Loader width = {window.innerWidth - 120} bgTransparent = {true}/>
                    :
                        <div className='card-deck' key={this.props.forecastType+'-cards'}>
                                {dataList}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function OneDayForecastContainer(props) {
        let cardStyle = {width: ((window.innerWidth - 380)/8)+'px'}
        let cardInSmallScreen ={width: ((window.innerWidth - 320)/8)+'px'}
        return(
            <div style={(windowWidth > 1400) ? cardStyle : cardInSmallScreen } className={classnames('card forecast-card', {'icons-card' : props.showIcons === true})}>
                <div className="cord-block text-center forecast-params text-center time">
                    {props.showIcons ?
                        <div className='row'>
                            <div className='text-center card-header'>
                                <h5 className="timeNearIcon"><strong>{props.forecastType === 'hourly' ? 'Time' : 'Date'}</strong></h5>
                            </div>
                        </div>
                    :
                        <div className='row'>
                            <div className='text-center'>
                                <h5><strong>{props.time}</strong>{props.forecastType === 'hourly' && <img src={props.iconTime == 'day' ? day : night} className='forecast-card-icon img-responsive center-block day-night-icon'/>}</h5>
                            </div>

                        </div>
                    }
                </div>
                <hr className="separator"/>
                {props.forecastType == 'daily' &&
                    <div className="windspeed">
                        <div className="cord-block text-center forecast-params text-center">
                            <div className='row'>
                                {props.showIcons ?
                                    <div className="text-center card-header">
                                        Wind Speed
                                    </div>
                                :
                                    <h4 className="text-center"><strong>{props.windSpeed ? props.windSpeed+" m/s" : "--"}</strong></h4>
                                }
                            </div>
                        </div>
                        <hr className="separator"/>
                    </div>
                }
                <div className="card-block forecast-params wind-dir text-center">
                    <div className='row'>
                        {props.showIcons ?
                            <div className='col-xs-12'>
                                <div className='text-center card-header paramFontSize'>Wind Direction</div>
                                <img src={compass} className='forecast-card-icon img-responsive center-block' height='50' width='50'/>
                            </div>
                        :
                            <div className='col-xs-12'>
                                <h3 className="text-center windDirection"><strong>{props.windDir}</strong></h3>
                            </div>
                        }
                    </div>
                </div>
                <hr className="separator"/>
                <div className='forecast-params card-block temp text-center'>
                    <div className='row'>
                        {props.showIcons ?
                            <div className='col-xs-12'>
                                <div className='text-center card-header paramFontSize'>Temperature</div>
                                <img src={temp} className='forecast-card-icon img-responsive center-block' height='50' width='50'/>
                            </div>
                        :
                            <div className='col-xs-12 top-buffer text-center'>
                                <div><h4 className="average">Avg   <strong>: {props.avgTemp} </strong></h4></div>
                                <div>
                                    <span className='param-values'>Min   <strong>: {props.minTemp} </strong></span>
                                    <span className='param-values'>Max   <strong>: {props.maxTemp} </strong></span>
                                </div>

                            </div>
                        }
                    </div>
                </div>
                <hr className="separator"/>
                <div className='forecast-params card-block precip text-center'>
                    <div className='row'>
                        {props.showIcons ?
                            <div>
                                <div className='text-center card-header paramFontSize'>Precipitation</div>
                                <img src={precipitation} className='forecast-card-icon img-responsive center-block' height='50' width='50'/>
                            </div>
                        :
                            <div className='col-xs-12 text-center'>
                                <div><h4 className="average">Precip  <strong>: {props.precipitation} </strong></h4></div>
                                <div className="popHumidity">
                                    <span className="param-values">Pop   <strong>: {props.pop} </strong> </span>
                                    <span className="param-values">Humidity   <strong>: {props.humidity} </strong></span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <hr className="separator"/>
                <div className='forecast-params card-block pressure text-center'>
                    {props.showIcons ?
                        <div className="text-center card-header paramFontSize">
                            Pressure
                        </div>
                    :
                        <h4 className="text-center average"><strong>{props.pressure}</strong></h4>
                    }
                </div>
                <hr className="separator"/>
                <div className='forecast-params card-block snow text-center'>
                    <div className='row'>
                        {props.showIcons ?
                            <div>
                                <div className='text-center card-header paramFontSize'>Snow</div>
                                <img src={snow} className='forecast-card-icon img-responsive center-block' height='50' width='50'/>
                            </div>
                        :

                            <div className='col-xs-12 text-center snow-value'>
                                <div className="ice"><span className="space">Ice</span>   <strong>: {props.ice ? props.ice : 'No'} </strong></div>
                                <div className="iceSnow">Snow   <strong>: {props.snow}</strong></div>
                            </div>
                        }
                    </div>
                </div>
                <hr className="separator"/>
                <div className='forecast-params card-block weather-summary text-center'>
                    <div className='row'>
                        {props.showIcons ?
                            <div>
                                <div className='text-center card-header paramFontSize'>Weather Outlook</div>
                            </div>
                        :
                            <div className='col-xs-12 cloudAndSun'>
                                <div className='text-center'>{props.weather}</div>
                                <img src={sunny} className='forecast-card-icon-weather img-responsive center-block' height='50' width='50'/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
}


export default WeatherForecast;
