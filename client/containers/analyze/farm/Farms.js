// App.js
import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import { Link } from 'react-router'
import 'react-dates/lib/css/_datepicker.css';
import '../../../../public/styles/containers/analyze/farm/FarmMap.css'
import classnames from 'classnames';
import FarmMap from './FarmMap'
import LpfAvailabilityMap from './LpfAvailabilityMap'
import WindResourcesCharts from './WindResourcesCharts'
import Compare from './Compare'
import FarmHeatMap from './HeatMapView'
import { connect } from 'react-redux'
import { setDate, selectTab, getCountriesList, changeCountryAndGetFarms, selectFarmAndCallNextAction, setDateAndCallNextActions} from '../../../actions/AppActions'
import {setFarmTurbineCompareNoData, getPowerAndWind,
    getAvailability,
    getAlertsCount,
    getFarmPbaData,
    getFarmAvailabilityData,
    getWindDataOfFarm,
    getTurbineLevelHeatMapData, getFarmsAndTurbinesList, setTurbines, getCompareChartData,getVariablesForFarmsHeatMap} from './FarmActions'
import moment from 'moment';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import createFilterOptions from 'react-select-fast-filter-options'
import SearchIcon from '../../../components/dropdownSearchIcon/DropdownSearchIcon'
import {getCountryFarmsList,toggleFullLife} from '../../../actions/AppActions'
import AppConstants from '../../../constants/AppConstants'
import ToggleButton from 'react-toggle-button'
import _ from 'underscore'

class Farms extends React.Component {
    constructor(props) {
        super(props)
        this.setSelectedTab = this.setSelectedTab.bind(this);
        this.getSelectedTab = this.getSelectedTab.bind(this);
        this.handleFarmChange = this.handleFarmChange.bind(this);
        this.handleTurbineChange = this.handleTurbineChange.bind(this);
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this)
        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this)
        this.handleGo = this.handleGo.bind(this)
        this.updateDate = this.updateDate.bind(this);
        this.getNextActionsCreatorsAndData = this.getNextActionsCreatorsAndData.bind(this)
        this.renderValue1 = this.renderValue1.bind(this)
        this.farmDisplayToggle = this.farmDisplayToggle.bind(this)
        this.fullLife = this.fullLife.bind(this);
    }

    componentDidMount() {

        const {dispatch} = this.props;
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        if (!(this.props.farmsList && this.props.farmsList[1])){
            this.props.dispatch(getCountryFarmsList(selectFarmAndCallNextAction,nextActionCreators,data))
        }else {
            data.wind_farm = this.props.farmsList[2].value.split(",")[1]
            dispatch(selectFarmAndCallNextAction(this.props.farmsList[2].value, nextActionCreators, data));
        }
        dispatch(getVariablesForFarmsHeatMap())
    }

    getNextActionsCreatorsAndData(){
        let data = {}, nextActionCreators = [];
        switch(this.props.selectedTab){
            case 1: data = {
                                    start_date: this.props.initialDate,
                                    end_date: this.props.finalDate,
                                    type: 2,
                                    variable: "1372,569",
                                    wind_farm: this.props.selectedFarm
                                }
                    nextActionCreators = [getPowerAndWind, getAvailability, getAlertsCount]
                    return {nextActionCreators, data}
            case 2: data = {
                start_date: this.props.initialDate,
                end_date: this.props.finalDate,
                turbines : this.props.selectedTurbine?this.props.selectedTurbine.toString():"",
                full_life : this.props.farmFullLife
            }
                nextActionCreators = [getCompareChartData]
                return {nextActionCreators, data}
            case 3: data = {
                                   wind_farm: this.props.selectedFarm,
                                   start_date: this.props.initialDate,
                                   end_date: this.props.finalDate,
                                   level: "farm",
                                   ranking: false,
                                   variable: "pba"
                               }

                    nextActionCreators = [getFarmAvailabilityData, getFarmPbaData]
                    return {nextActionCreators, data}
            case 4: data = {
                        wind_farm: this.props.selectedFarm,
                        start_date: this.props.initialDate,
                        end_date: this.props.finalDate,
                        type: '2',
                        variable: "569,606" // for wind speed and direction
                    };
                    nextActionCreators = [getWindDataOfFarm]
                    return {nextActionCreators, data}
            case 5: data = {
                        wind_farm: this.props.selectedFarm,
                        variable: this.props.variable,
                        start_date: this.props.initialDate,
                        end_date: this.props.finalDate,
                        type: 2
                    }

                    nextActionCreators = [getTurbineLevelHeatMapData]
                    return {nextActionCreators, data}
        }
        return
    }
    setSelectedTab(id) {
        const {dispatch} = this.props;
        dispatch(selectTab(id));
        let data = {
            turbines:this.props.selectedTurbine,
            start_date:'2016-06-01',
            end_date:'2017-08-02'
        }
        if(id == 2) {
            this.props.farmsAndTurbinesList.length == 0 && dispatch(getFarmsAndTurbinesList());
        }
    }

    handleFarmChange(farm){
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        let farmlist = farm.value.split(",")
        data.wind_farm = farmlist[1]

        if(this.props.selectedTab === 5){
            let varData1 = Object.assign({}, data, {variable: this.props.selectedVariable1, chart: 1})
            this.props.dispatch(selectFarmAndCallNextAction(farm.value, nextActionCreators, varData1))
            let varData2 = Object.assign({}, data, {variable: this.props.selectedVariable2, chart: 2})
            this.props.dispatch(selectFarmAndCallNextAction(farm.value, nextActionCreators, varData2));
        }else{
            this.props.dispatch(selectFarmAndCallNextAction(farm.value, nextActionCreators ,data));
        }
    }
    handleTurbineChange(farmList) {
        const {dispatch} = this.props;
        dispatch(setTurbines(farmList));
        if(farmList.length){
            let {nextActionCreators,data} = this.getNextActionsCreatorsAndData();
            let turbinelist=_.map(farmList,(item)=>{return item.value.split(",")[2]});
            data.turbines = turbinelist.toString();
            dispatch(getCompareChartData(data));
        }else{
            dispatch(setFarmTurbineCompareNoData());
        }
    }
    handleDateChangeInitial(initialDate) {
        this.props.dispatch(setDate({initialDate: initialDate, finalDate: this.props.finalDate}))
    }
    handleDateChangeFinal(finalDate) {
        this.props.dispatch(setDate({initialDate: this.props.initialDate, finalDate: finalDate}));
    }
    handleGo(){
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        if(this.props.selectedTab === 5){
             let varData1 = Object.assign({}, data, {variable: this.props.selectedVariable1, chart: 1})
             nextActionCreators.map(action => {this.props.dispatch(action(varData1))});
             let varData2 = Object.assign({}, data, {variable: this.props.selectedVariable2, chart: 2})
             nextActionCreators.map(action => {this.props.dispatch(action(varData2))});
        }else{
            nextActionCreators.map(action => {this.props.dispatch(action(data))});
        }
    }

    updateDate(start, end, selectedDate,full){
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        const {dispatch} = this.props;
            data.start_date = start;
            data.end_date = end;
            if(this.props.selectedTab === 5){
                let varData1 = Object.assign({}, data, {chart: 1, variable: this.props.selectedVariable1})
                dispatch(setDateAndCallNextActions(nextActionCreators, varData1, selectedDate))
                let varData2 = Object.assign({}, data, {chart: 2, variable: this.props.selectedVariable2})
                dispatch(setDateAndCallNextActions(nextActionCreators, varData2, selectedDate))
            }else{
                dispatch(setDateAndCallNextActions(nextActionCreators, data, selectedDate))
            }

    }
   renderValue1(option){
        return option.value.split(",")[2];
   }
    farmDisplayToggle(){
       this.props.dispatch({
           type:AppConstants.SET_FARM_TOGGLE,
           payload:!this.props.farmToggle
       })
    }

    fullLife(full){
        let {nextActionCreators,data} = this.getNextActionsCreatorsAndData();
        const {dispatch} = this.props;
        dispatch(toggleFullLife({type:AppConstants.FARM_FULL_LIFE,full:full}));
        data.full_life = full;
        _.map(nextActionCreators,(func)=>{
            dispatch(func(data))
        } )
    }

    getSelectedTab(){
        switch(this.props.selectedTab){
            case 1 : return(
                <FarmMap
                    power = {this.props.power}
                    windSpeed = {this.props.windSpeed}
                    lpf = {this.props.lpf}
                    availTime = {this.props.availTime}
                    availGen = {this.props.availGen}
                    numberOfAlerts = {this.props.numberOfAlerts}
                    selectedFarm= {this.props.selectedFarm}
                    />
            );
            case 2 : return(
                <Compare
                    dispatch = {this.props.dispatch}
                    farmForDropDown =  {this.props.farmForDropDown}
                    getNextActionsCreatorsAndData = {this.getNextActionsCreatorsAndData}
                    farmsAndTurbinesList={this.props.farmsAndTurbinesList}
                    allChartData={this.props.allChartData}
                    variablesList = {this.props.variablesList}
                    selectedTurbine = {this.props.selectedTurbine}
                    loader = {this.props.compareTurbinesLoader}
                    noData = {this.props.compareTurbineNoData}
                    addMarkerValue = {this.props.addMarkerValueInCompare}
                />
            );
            case 3 : return(
                <LpfAvailabilityMap
                    dispatch = {this.props.dispatch}
                    farmForDropDown =  {this.props.farmForDropDown}
                    getNextActionsCreatorsAndData = {this.getNextActionsCreatorsAndData}
                    availabilityX = {this.props.availabilityX}
                    availabilityY = {this.props.availabilityY}
                    farmPbaX = {this.props.farmPbaX}
                    farmPbaY = {this.props.farmPbaY}
                    availLoaderStatus = {this.props.availLoaderStatus}
                    selectedFarm = {this.props.selectedFarm}
                    noData = {this.props.availNoData}
                    pbaNoData = {this.props.pbaNoData}
                />
            );
            case 4 : return(
                <WindResourcesCharts
                    dispatch = {this.props.dispatch}
                    farmForDropDown =  {this.props.farmForDropDown}
                    getNextActionsCreatorsAndData = {this.getNextActionsCreatorsAndData}
                    selectedFarm = {this.props.selectedFarm}
                    wsX = {this.props.wsX}
                    wsY = {this.props.wsY}
                    wdX = {this.props.wdX}
                    wdY = {this.props.wdY}
                    loader = {this.props.windDataLoader}
                    noDataSpeed={this.props.noDataSpeed}
                    noDataDirection={this.props.noDataDirection}
                />
            )
            case 5 : return(
                <FarmHeatMap
                    dispatch = {this.props.dispatch}
                    getNextActionsCreatorsAndData = {this.getNextActionsCreatorsAndData}
                    initialDate = {this.props.initialDate}
                    finalDate = {this.props.finalDate}
                    selectedFarm = {this.props.selectedFarm}
                    variablesList = {this.props.variablesList}
                    selectedVariable1 = {this.props.selectedVariable1}
                    selectedVariable2 = {this.props.selectedVariable2}
                    handleVariableChange = {this.handleVariableChange}
                    heatMapLoader = {this.props.heatMapLoader}
                    heatMap2Loader = {this.props.heatMap2Loader}
                    heatMapX = {this.props.heatMapX}
                    heatMapY = {this.props.heatMapY}
                    heatMapZ = {this.props.heatMapZ}
                    heatMap2X = {this.props.heatMap2X}
                    heatMap2Y = {this.props.heatMap2Y}
                    heatMap2Z = {this.props.heatMap2Z}
                    heatMapNoData={this.props.heatMapNoData}
                    heatMap2NoData={this.props.heatMap2NoData}
                />
            )
        }
    }
    render() {
        let optionsList= this.props.selectedTab === 2 ? this.props.farmsAndTurbinesList : this.props.farmsList;
        const filterOptions = this.props.selectedTab === 2 ? this.props.farmsAndTurbinesListFilterOptions : this.props.farmsListFilterOptions;
        //let selectedFarm = this.props.farmToggle?this.props.selectedFarm1:""
        //let optionsList = filterOptions_list(options,selectedFarm,"");
        //const filterOptions  = createFilterOptions({options:optionsList});
        return (

            <div className="kpiview-container" id="kpi-view">
                <div className="">
                    <div className="fleet-tabs margin-top level-1-tabs">
                        <div className="btn-group row" role="group">
                            <Link to="" className={classnames('btn col-xs-4', { 'active': this.props.selectedTab === 1})} onClick={() => {this.setSelectedTab(1)}}>Overview</Link>
                            <Link to="" className={classnames('btn col-xs-4', { 'active': this.props.selectedTab === 2})} onClick={() => {this.setSelectedTab(2)}}>Compare</Link>
                            <Link to="" className={classnames('btn col-xs-4', { 'active': this.props.selectedTab === 3})} onClick={() => {this.setSelectedTab(3)}}>Availability</Link>
                            <Link to="" className={classnames('btn col-xs-4', { 'active': this.props.selectedTab === 4})} onClick={() => {this.setSelectedTab(4)}}>Wind Resources</Link>
                            {/*need to put it back in future <Link to="" className={classnames('btn col-xs-4', { 'active': this.selectedTab === 4})} onClick={() => {this.setSelectedTab(4)}}>Alerts Overview</Link>*/}
                            <Link to="" className={classnames('btn col-xs-4', { 'active': this.props.selectedTab === 5})} onClick={() => {this.setSelectedTab(5)}}>Heat Map</Link>
                        </div>
                    </div><br/>
                    <div>
                        <div className="font-12 flex-end-h flex-container-nowrap">
                            <div className="flex-container-nowrap">

                                        {/*this.props.selectedTab ===2?
                                            <div style={{marginRight:"5px"}}><ToggleButton
                                                value={this.props.farmToggle}
                                                inactiveLabel="All"
                                                activeLabel="Farm"
                                                onToggle={this.farmDisplayToggle}
                                            /></div>
                                            :<div >&nbsp;&nbsp;Farm&nbsp;&nbsp;</div>
                                        */}

                                {(this.props.selectedTab == 2) ? (
                                        <Select multi
                                                className = "farm-select"
                                                filterOptions={ filterOptions }
                                                name="form-field-name"
                                                value={this.props.turbinesForDropdown}
                                                options={optionsList}
                                                onChange={this.handleTurbineChange}
                                                clearable={true}
                                                valueRenderer={this.renderValue1}
                                        />
                                    ) : (
                                        <Select
                                            arrowRenderer = {SearchIcon}
                                            className = "farm-select"
                                            filterOptions={ filterOptions }
                                            name="form-field-name"
                                            value={this.props.farmForDropDown}
                                            options={this.props.farmsList}
                                            onChange={this.handleFarmChange}
                                            clearable={false}
                                        />
                                    )}
                                <div className="flex-container-nowrap">
                                    <CustomDatePicker ref = {(datePick) => { this.customDatePicker = datePick}}
                                                      dateChange={this.updateDate}
                                                      startOnChange={this.handleDateChangeInitial}
                                                      endOnChange={this.handleDateChangeFinal}
                                                      initialDate={this.props.initialDate}
                                                      finalDate={this.props.finalDate}
                                                      reloadGraphs={this.handleGo}
                                                      disabled={6}
                                                      showFullLife = {this.props.selectedTab === 2}
                                                      defaultValue={this.props.selectedDate}
                                                      fullLife = {this.fullLife}
                                                      disableCustom = {this.props.selectedTab === 2 && this.props.farmFullLife}
                                    />
                                </div>
                            </div>
                        </div><br/>
                        {this.getSelectedTab()}
                    </div>


                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    const {Farm,TurbineFarmList} = state
  let FarmData = {
      selectedTab : Farm.get('selectedTab'),
      selectedCountry : Farm.get('selectedCountry'),
      selectedFarm : Farm.get('selectedFarm'),
      selectedDate : Farm.get('selectedDate'),
      initialDate : Farm.get('initialDate'),
      finalDate : Farm.get('finalDate'),
      countriesList : Farm.get('countriesList'),
      farmsList : TurbineFarmList.get('farmsList'),
      power : Farm.get('power'),
      windSpeed : Farm.get('windSpeed'),
      availTime : Farm.get('availTime'),
      availGen : Farm.get('availGen'),
      lpf : Farm.get('lpf'),
      numberOfAlerts : Farm.get('numberOfAlerts'),
      heatMapLoader : Farm.get('heatMapLoader'),
      heatMap2Loader : Farm.get('heatMap2Loader'),
      availLoaderStatus : Farm.get('availLoaderStatus'),
      availabilityX : Farm.get('availabilityX'),
      availabilityY : Farm.get('availabilityY'),
      availNoData : Farm.get('availNoData'),
      pbaNoData : Farm.get('pbaNoData'),
      farmPbaY : Farm.get('farmPbaY'),
      farmPbaX : Farm.get('farmPbaX'),
      wsX : Farm.get('wsX'),
      wsY : Farm.get('wsY'),
      wdX : Farm.get('wdX'),
      wdY : Farm.get('wdY'),
      noDataSpeed : Farm.get('noDataSpeed'),
      noDataDirection : Farm.get('noDataDirection'),
      selectedVariable1 : Farm.get('selectedVariable1'),
      selectedVariable2 : Farm.get('selectedVariable2'),
      variablesList : Farm.get('variablesList'),
      heatMapX : Farm.get('heatMapX'),
      heatMapY : Farm.get('heatMapY'),
      heatMapZ : Farm.get('heatMapZ'),
      heatMapNoData : Farm.get('heatMapNoData'),
      heatMap2NoData : Farm.get('heatMap2NoData'),
      heatMap2Z : Farm.get('heatMap2Z'),
      heatMap2Y : Farm.get('heatMap2Y'),
      heatMap2X : Farm.get('heatMap2X'),
      farmForDropDown: Farm.get('farmForDropDown'),
      windDataLoader : Farm.get('windDataLoader'),
      turbinesForDropdown: Farm.get('turbinesForDropdown'),
      farmsAndTurbinesList: Farm.get('farmsAndTurbinesList'),
      allChartData: Farm.get('allChartData'),
      selectedTurbine: Farm.get('selectedTurbine'),
      farmToggle : Farm.get('farmToggle'),
      selectedFarm1 : Farm.get('selectedFarm1'),
      compareTurbinesLoader: Farm.get('compareChartLoader'),
      compareTurbineNoData: Farm.get('compareChartNoData'),
      farmsAndTurbinesListFilterOptions: Farm.get('farmsAndTurbinesListFilterOptions'),
      farmsListFilterOptions: Farm.get('farmsListFilterOptions'),
      farmFullLife:Farm.get('farmFullLife'),
      addMarkerValueInCompare: Farm.get('addMarkerValueInCompare')
  }
  return FarmData
}
export default connect(mapStateToProps)(Farms);
