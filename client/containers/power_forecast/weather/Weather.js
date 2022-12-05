import React from 'react'
import { Link } from 'react-router'
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import Select from 'react-virtualized-select'
import moment from 'moment'
import classnames from 'classnames'
import WeatherOverview from './WeatherOverview'
import WeatherForecast from './WeatherForecast'
import { selectTab} from '../../../actions/AppActions'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
import {getCountries, setForeCastDate,
    getFarms, setCountry, setFarm, setDate,
    dataLoading, getWeatherForecastData,
    getWeatherOverviewChartData, getFarmSummary,setFarmCallNextAction} from './WeatherActions'
import createFilterOptions from 'react-select-fast-filter-options'
import {getCountryFarmsList} from '../../../actions/AppActions'
import SearchIcon from '../../../components/dropdownSearchIcon/DropdownSearchIcon'


class Weather extends React.Component {
    constructor(props) {
        super(props)

        this.setSelectedTab = this.setSelectedTab.bind(this);
        this.getSelectedTab = this.getSelectedTab.bind(this);
        this.logChangeFarm = this.logChangeFarm.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this);
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this);
        this.reloadGraphs = this.reloadGraphs.bind(this);
        this.loadHistoricalCharts = this.loadHistoricalCharts.bind(this);
        this.handleForecastDateChange = this.handleForecastDateChange.bind(this);
    }

    componentDidMount() {
        const { dispatch }  = this.props;
        dispatch(dataLoading());
        if (this.props.farmsList && this.props.farmsList[1]){
            let initialfarm = this.props.farmsList[4].value.split(',')[1]
            dispatch(setFarm(this.props.farmsList[4].value?this.props.farmsList[4].value:'United Kingdom,Crook Hill'));
            if(this.props.selectedTab == 1) {
                this.loadHistoricalCharts(initialfarm);
            } else {
//                let params = {
//                    vendor:'aries',
//                    resolution:'hourly',
//                    wind_farm:'Ahlen',
//                    date:'2017-07-24'
//                }
//                dispatch(getWeatherForecastData(params))
            }
        }
        else{
            const {data1,data2,data3} = this.getData();
            let data={data1,data2,data3}
            dispatch(getCountryFarmsList(setFarmCallNextAction,[getWeatherOverviewChartData,getFarmSummary],data))
        }

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.selectedTab != this.props.selectedTab && nextProps.selectedTab==1){
            let {data1,data2,data3} = this.getData()
            this.props.dispatch(getFarmSummary(data2))
            this.props.dispatch(getWeatherOverviewChartData(data1))
            this.props.dispatch(getWeatherOverviewChartData(data3))
        }
    }
    getData(){
        var self = this;
        let data1 = {
            selectedFarm: self.props.selectedFarm? self.props.selectedFarm.split(',')[1]:"",
            selectedChart: self.props.selectedChart,
            duration: self.props.selectedDuration1,
            start: self.props.initialDate,
            end: self.props.finalDate,
            dropdown: 1
        }
        let data3 = {
            selectedFarm: self.props.selectedFarm? self.props.selectedFarm.split(',')[1]:"",
            selectedChart: self.props.selectedChart,
            duration: self.props.selectedDuration2,
            start: self.props.initialDate,
            end: self.props.finalDate,
            dropdown: 2
        }
        let data2 = {
            selectedFarm: self.props.selectedFarm? self.props.selectedFarm.split(',')[1]:"",
            start: self.props.initialDate,
            end: self.props.finalDate
        }
        return {data1,data2,data3}
    }
    loadHistoricalCharts(farm) {
        var self = this;
        const { dispatch } = this.props;
        console.log({selectedFarm: farm,
            selectedChart: self.props.selectedChart,
            duration: self.props.selectedDuration1,
            start: self.props.initialDate,
            end: self.props.finalDate,
            });
        dispatch(getWeatherOverviewChartData({selectedFarm: farm,
            selectedChart: self.props.selectedChart,
            duration: self.props.selectedDuration1,
            dropdown: 1,
            start: self.props.initialDate,
            end: self.props.finalDate,
            }))
        dispatch(getWeatherOverviewChartData({selectedFarm: farm,
            selectedChart: self.props.selectedChart,
            duration: self.props.selectedDuration2,
            dropdown: 2,
            start: self.props.initialDate,
            end: self.props.finalDate,
            }))
        dispatch(getFarmSummary({selectedFarm: farm, start: self.props.initialDate,
            end: self.props.finalDate,}))
    }
    handleForecastDateChange(date){
        this.props.dispatch(setForeCastDate(date))
    }

    logChangeFarm(val) {
        console.log(val)
        const { dispatch }  = this.props;
        let self = this;
        dispatch(dataLoading());
        dispatch(setFarm(val.value));
        if(this.props.selectedTab == 1) {
            self.loadHistoricalCharts(val.value.split(',')[1]);
        }
    }

    updateDate(start, end,selected) {
        const { dispatch } = this.props;
        let self = this;
        console.log(start, end);
        dispatch(dataLoading());
        dispatch(setDate({initialDate: start, finalDate: end ,selectedDate:selected}))
        setTimeout(function() {
            self.loadHistoricalCharts(self.props.selectedFarm.split(',')[1]);
        }, 1000)
    }

    handleDateChangeInitial(initialDate) {
        var self = this;
        const { dispatch } = this.props;
        dispatch(setDate({initialDate: initialDate, finalDate: self.props.finalDate}))
    }

    handleDateChangeFinal(finalDate) {
        let self = this;
        const { dispatch } = this.props;
        dispatch(setDate({finalDate: finalDate, initialDate: self.props.initialDate}))
    }

    reloadGraphs() {
        var self = this;
        const { dispatch } = this.props;
        dispatch(dataLoading());
        self.loadHistoricalCharts(self.props.selectedFarm.split(',')[1]);
    }


    getSelectedTab(){
        switch(this.props.selectedTab){
            case 1 : return(
                <WeatherOverview ref="weatherOverview"
                    dispatcher={this.props.dispatch}
                    durations={this.props.durations}
                    selectedFarm={this.props.selectedFarm.split(',')[1]}
                    summary={this.props.summary}
                    farms={this.props.farms}
                    loader={this.props.loader}
                    initialDate={this.props.initialDate}
                    finalDate={this.props.finalDate}
                    selectedChart= {this.props.selectedChart}
                    selectedDuration1={this.props.selectedDuration1}
                    selectedDuration2={this.props.selectedDuration2}
                    colorScale={this.props.colorScale}
                    title={this.props.title}
                    xaxis={this.props.xaxis}
                    yaxis={this.props.yaxis}
                    zaxis1={this.props.zaxis1}
                    colorScale2={this.props.colorScale2}
                    title2={this.props.title2}
                    xaxis2={this.props.xaxis2}
                    yaxis2={this.props.yaxis2}
                    zaxis2={this.props.zaxis2}
                     noData1={this.props.noData1}
                     noData2={this.props.noData2}
                />
            );
            case 2 : return(
                <WeatherForecast key='daily'
                    dispatch={this.props.dispatch}
                    forecastData={this.props.weatherForecastData}
                    loadingCardsForecastData = {this.props.loadingCardsForecastData}
                    hourlyWeatherForecastCardsData = {this.props.hourlyWeatherForecastCardsData}
                    selectedFarm = {this.props.selectedFarm.split(',')[1]}
                    forecastType = 'daily'
                    noForecastData = {this.props.noForecastData}
                    noForecastCardsData = {this.props.noForecastCardsData}
                    dateOfForecast = {this.props.dateOfForecast}
                    offset = {this.props.dailyForecastOffset}
                    />
            )
            case 3: return(
                <WeatherForecast key='hourly'
                    dispatch = {this.props.dispatch}
                    forecastData = {this.props.weatherForecastData}
                    forecastType = 'hourly'
                    loader = {this.props.loadingForecastData}
                    hourlyWeatherForecastCardsData = {this.props.hourlyWeatherForecastCardsData}
                    loadingCardsForecastData = {this.props.loadingCardsForecastData}
                    selectedFarm = {this.props.selectedFarm.split(',')[1]}
                    noForecastData = {this.props.noForecastData}
                    noForecastCardsData = {this.props.noForecastCardsData}
                    dateOfForecast = {this.props.dateOfForecast}
                    offset = {this.props.hourlyForecastOffset}
                    />
            )
        }
    }

    setSelectedTab(id){
        const {dispatch} = this.props;
        dispatch(selectTab(id));
    }

    render() {
        let options=this.props.farmsList
        const filterOptions  = createFilterOptions({options});
        return(
            <div className="weather-container">
                <div className="tabs-navigation margin-top level-1-tabs">
                    <div className="btn-group row" role="group">
                        <Link to="" className={classnames('btn col-xs-4', { 'active': this.props.selectedTab === 1})} onClick={() => {this.setSelectedTab(1)}}>Historical</Link>
                        <Link to="" className={classnames('btn col-xs-4', { 'active': this.props.selectedTab === 2})} onClick={() => {this.setSelectedTab(2)}}>Forecast Overview</Link>
                        <Link to="" className={classnames('btn col-xs-4', { 'active': this.props.selectedTab === 3})} onClick={() => {this.setSelectedTab(3)}}>48H Forecast</Link>
                    </div>
                </div>
                <div className="flex-container flex-sb-h">
                    <div className="heading-title">{this.props.selectedTab === 3 ? "Wind Speed" : this.props.selectedTab === 2 ? "Weather Daily Forecast" : ''}</div>
                    <div className="font-12 heatmap-filters flex-container-nowrap flex-end-h">
                        {this.props.selectedTab !== 1 &&  <div>Vendor&nbsp;&nbsp;</div>}
                        {this.props.selectedTab !== 1 && <Select
                            name='vendor-name'
                            options={[{label: 'Aries', value: 'aries'}]}
                            value={'aries'}
                        />}
                        <div>Farm&nbsp;&nbsp;</div>
                        <Select
                            name="form-field-name"
                            arrowRenderer = {SearchIcon}
                            className = "farm-select"
                            filterOptions={ filterOptions }
                            value={this.props.selectedFarm}
                            options={this.props.farmsList}
                            onChange={this.logChangeFarm}
                            clearable={false}
                        />
                        <div>&nbsp;&nbsp;&nbsp;</div>

                        {this.props.selectedTab === 1 && <CustomDatePicker ref = {(datePick) => { this.customDatePicker = datePick}}
                                          dateChange={this.updateDate}
                                          defaultValue={this.props.selectedDate}
                                          startOnChange={this.handleDateChangeInitial}
                                          endOnChange={this.handleDateChangeFinal}
                                          initialDate={this.props.initialDate}
                                          finalDate={this.props.finalDate}
                                          reloadGraphs={this.reloadGraphs}
                                          disabled={6}
                        />}
                        {this.props.selectedTab !== 1 &&
                              <DatePicker
                                  dropdownMode="select"
                                  selected={this.props.dateOfForecast}
                                  onChange={this.handleForecastDateChange}
                                  maxDate={moment()}
                                  dateFormat="DD/MM/YYYY"
                                  className='forecast-date-picker-box'
                              />
                          }

                    </div>
                </div>

                {this.getSelectedTab()}
            </div>
        )
    }
}


const mapStateToProps = state => {

    const { WeatherData,TurbineFarmList } = state
    return {
        selectedTab: WeatherData.get('selectedTab'),
        selectedCountry: WeatherData.get('selectedCountry'),
        selectedFarm:WeatherData.get('selectedFarm'),
        selectedDate: WeatherData.get('selectedDate'),
        initialDate: WeatherData.get('initialDate'),
        finalDate: WeatherData.get('finalDate'),
        chart1Data: WeatherData.get('chart1Data'),
        chart2Data: WeatherData.get('chart2Data'),
        countriesList: WeatherData.get('countriesList'),
        farmsList : TurbineFarmList.get('farmsList'),
        power: WeatherData.get('power'),
        windSpeed: WeatherData.get('windSpeed'),
        availTime: WeatherData.get('availTime'),
        availGen: WeatherData.get('availGen'),
        lpf: WeatherData.get('lpf'),
        numberOfAlerts: WeatherData.get('numberOfAlerts'),
        data: WeatherData.get('data'),
        countryDropdown: WeatherData.get('countryDropdown'),
        farms : WeatherData.get('farms'),
        variable : WeatherData.get('variable'),
        turbine1: WeatherData.get('turbine1'),
        loader:WeatherData.get('loader'),
        turbine2: WeatherData.get('turbine2'),
        selectedChart: WeatherData.get('selectedChart'),
        selectedDuration1: WeatherData.get('selectedDuration1'),
        selectedDuration2: WeatherData.get('selectedDuration2'),
        summary: WeatherData.get('summary'),
        xaxis: WeatherData.get('xaxis'),
        yaxis:WeatherData.get('yaxis'),
        zaxis1: WeatherData.get('zaxis1'),
        zaxis2: WeatherData.get('zaxis2'),
        colorScale:WeatherData.get('colorScale'),
        xaxis2: WeatherData.get('xaxis2'),
        yaxis2: WeatherData.get('yaxis2'),
        colorScale2:WeatherData.get('colorScale2'),
        durations: WeatherData.get('durations'),
        weatherForecastData: WeatherData.get('weatherForecastData'),
        noData1: WeatherData.get('noData1'),
        noData2: WeatherData.get('noData2'),
        loadingForecastData: WeatherData.get('loadingForecastData'),
        hourlyWeatherForecastCardsData: WeatherData.get('hourlyWeatherForecastCardsData'),
        loadingCardsForecastData: WeatherData.get('loadingCardsForecastData'),
        noForecastData: WeatherData.get('noForecastData'),
        noForecastCardsData: WeatherData.get('noForecastCardsData'),
        dateOfForecast: WeatherData.get('dateOfForecast'),
        dailyForecastOffset: WeatherData.get('dailyForecastOffset'),
        hourlyForecastOffset: WeatherData.get('hourlyForecastOffset'),
    };
}

export default connect(mapStateToProps)(Weather);
