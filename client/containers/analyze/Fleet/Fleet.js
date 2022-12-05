// App.js
import React from 'react';
/*import 'react-dates/lib/css/_datepicker.css';*/
import 'react-virtualized-select/styles.css';
import classnames from 'classnames';
import {Link} from 'react-router'
import AvailabilityTime from './AvailabilityTime';
import AvailabilityGen from './AvailabilityGen';
import { connect } from 'react-redux'
import {setDates,getFleetData,changeFleetTab} from './FleetActions'
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';



class Fleet extends React.Component{
    constructor(props){
        super(props)
        this.getData = this.getData.bind(this);
        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this);
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this);
        this.reloadGraphs = this.reloadGraphs.bind(this);
        this.updateDate=this.updateDate.bind(this);
    }

    getData(){
        switch(this.props.selectedTab){
            case 1:{
               let data= {
                   start_date: this.props.initialDate,
                   end_date: this.props.finalDate,
                   id: 9
               }
               let dataHub ={
                   start_date:this.props.initialDate,
                   end_date: this.props.finalDate,
                   id: this.props.selectedChart
               }
               return {data,dataHub}
            }
            case 2:{
                let data={
                    start_date: this.props.initialDate,
                    end_date: this.props.finalDate,
                    id: 9,
                    ranking: false,
                    level: 'hub',
                    variable: "pba"
                }
                let dataHub={
                    start_date:this.props.initialDate,
                    end_date: this.props.finalDate,
                    id: this.props.selectedChart,
                    ranking: false,
                    level: 'hub',
                    variable: "pba"
                }
                return {data,dataHub}
            }
        }
    }

    handleDateChangeInitial(initialDate) {
        let {dispatch} = this.props;
        dispatch(setDates(initialDate, this.props.finalDate, 0));
    }


    handleDateChangeFinal(finalDate) {
        const {dispatch} = this.props;
        dispatch(setDates(this.props.initialDate, finalDate, 0));
    }

    updateDate(start,end, selectedDate){
        const {dispatch} = this.props;
        let {data,dataHub} = this.getData();
        data.start_date=start;
        data.end_date=end;
        dataHub.start_date=start;
        dataHub.end_date=end;
        dispatch(setDates(start,end,selectedDate,data,dataHub,this.props.selectedTab));
    }

    reloadGraphs() {
        let {data,dataHub} = this.getData();
        const {dispatch} = this.props;
        dispatch(getFleetData(data,this.props.selectedTab))
        dispatch(getFleetData(dataHub,this.props.selectedTab))
    }

    getTabContent(){
        switch(this.props.selectedTab) {
            case 1 : return(
                <AvailabilityTime
                    initialDate={this.props.initialDate}
                    finalDate={this.props.finalDate}
                    selectedTab={this.props.selectedTab}
                    allChartData={this.props.allChartData}
                    allDataLoader={this.props.allDataLoader}
                    allNoData={this.props.allNoData}
                    hubChartData={this.props.hubChartData}
                    hubDataLoader={this.props.hubDataLoader}
                    hubNoData={this.props.hubNoData}
                    dispatch={this.props.dispatch}
                    selectedChart={this.props.selectedChart}
                />
            );
            case 2 : return(
                <AvailabilityGen
                    initialDate={this.props.initialDate}
                    finalDate={this.props.finalDate}
                    selectedTab={this.props.selectedTab}
                    allChartData={this.props.allChartData}
                    allDataLoader={this.props.allDataLoader}
                    allNoData={this.props.allNoData}
                    hubChartData={this.props.hubChartData}
                    hubDataLoader={this.props.hubDataLoader}
                    hubNoData={this.props.hubNoData}
                    dispatch={this.props.dispatch}
                    selectedChart={this.props.selectedChart}
                />
            );
        }
    }
    render() {
        return (
            <div className="portfolio-container" id="fleet-graphs">
                <div className="fleet-tabs margin-top level-1-tabs">
                    <div className="btn-group row" role="group">
                        <Link className={classnames("btn btn-default btn1 col-xs-4", {"active": this.props.selectedTab === 1})} onClick={() => {this.props.dispatch(changeFleetTab(1))}}>Availability(Time)</Link>
                        <Link className={classnames("btn btn-default btn2 col-xs-4", {"active": this.props.selectedTab === 2})} onClick={() => {this.props.dispatch(changeFleetTab(2))}}>Availability(Gen.)</Link>
                        <Link className="btn btn-default col-xs-4">Performance KPIs</Link>
                    </div>
                </div>
                <div className="row top-buffer">
                    <div className="col-xs-12">
                        <div className="font-12 flex-end-h flex-container-nowrap">
                            <CustomDatePicker ref = {(datePick) => { this.customDatePicker = datePick}}
                                              dateChange={this.updateDate}
                                              startOnChange={this.handleDateChangeInitial}
                                              endOnChange={this.handleDateChangeFinal}
                                              initialDate={this.props.initialDate}
                                              finalDate={this.props.finalDate}
                                              reloadGraphs={this.reloadGraphs}
                                              disabled={6}
                                              defaultValue={this.props.selectedDate}
                            />
                        </div>
                    </div>
                </div>
                {this.getTabContent()}
            </div>
        );
    }
}


const mapStateToProps = state => {
    const {FleetData} = state
    let Fleet = {
        selectedDate : FleetData.get('selectedDate'),
        finalDate : FleetData.get('finalDate'),
        initialDate : FleetData.get('initialDate'),
        selectedTab : FleetData.get('selectedTab'),
        selectedChart : FleetData.get('selectedChart'),
        allChartData : FleetData.get('allChartData'),
        allDataLoader : FleetData.get('allDataLoader'),
        allNoData : FleetData.get('allNoData'),
        hubChartData : FleetData.get('hubChartData'),
        hubDataLoader : FleetData.get('hubDataLoader'),
        hubNoData : FleetData.get('hubNoData'),
    }
    return Fleet
}
export default connect(mapStateToProps)(Fleet);
