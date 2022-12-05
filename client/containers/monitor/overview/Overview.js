import React from 'react'
import OverviewCss from '../../../../public/styles/containers/monitor/overview/Overview.css'
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from'react-bootstrap-table';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import moment from 'moment';
import { connect } from 'react-redux'
import { getAlertsOverviewData, getAlertsOverviewSummary, setDate } from './OverviewActions'
import {downloadCSV} from "../../../Utils/utils";
import Loader from '../../../components/Loader/Loader'

class Overview extends React.Component {
    constructor(props) {
        super(props)

        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this);
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.handleGo = this.handleGo.bind(this);
        this.downloadData = this.downloadData.bind(this);
    }


    componentDidMount() {
        const { dispatch } = this.props
        let data = {
            start_date: this.props.data.get('initialDate'),
            end_date: this.props.data.get('finalDate')
        }
        Ps.initialize(document.querySelector('.react-bs-container-body'));
        dispatch(getAlertsOverviewData(data));
        dispatch(getAlertsOverviewSummary());
    }

    handleDateChangeInitial(initialDate) {
        this.props.dispatch(setDate({initialDate: initialDate, finalDate: this.props.data.get('finalDate')}))
    }
    handleDateChangeFinal(finalDate) {
        this.props.dispatch(setDate({initialDate: this.props.data.get('initialDate'), finalDate: finalDate}));
    }

    updateDate(start,end, selectedDate) {
        const { dispatch } = this.props;
        dispatch(setDate({initialDate: start, finalDate: end, selectedDate: selectedDate}));
        let data = {
            start_date: start,
            end_date: end
        };
        dispatch(getAlertsOverviewData(data));
    }

    handleGo() {
        const { dispatch } = this.props;
        let data = {
            start_date: this.props.data.get('initialDate'),
            end_date: this.props.data.get('finalDate')
        }
        dispatch(getAlertsOverviewData(data));
    }
    downloadData(){
        let csvData = this.props.data.get('tableData')
        let header = ["alerts","component_name","number_of_turbines_affected","number_of_farms_affected","number_of_alerts_actioned"]
        csvData.header = header;
        downloadCSV(csvData, "table")
    }

    render() {
        function priceFormatter(cell, row) {
            return <span title={cell}>{cell}</span>;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        return(
            <div className="overview-container">
                {/*<div className="text-right">
                    <h3 className="total-alerts">Total Number of Alerts : 60</h3>
                </div>*/}
                <div className="top-alerts"><br/>
                    <div className="box-container">
                        <div className="flex-container flex-sa-h text-center">
                            <div className="">
                                <div><strong>Lost Production </strong></div>
                                {!this.props.data.get('loaderStatusAlertsOverviewSummary')?
                                    <h2><span>{this.props.data.get('lpf')}</span> <span className='lead'>MWh</span></h2>
                                    :<h2><Loader/></h2>}
                            </div>
                            <div className="">
                                <div><strong>Total Alarms</strong></div>
                                {!this.props.loaderStatusAlertsOverviewSummary?
                                    <h2><span>{this.props.data.get('totalAlerts')}</span> </h2>
                                    :<h2><Loader/></h2>}
                            </div>
                            <div className="">
                                <div><strong>Total Affected Farms</strong></div>
                                {!this.props.loaderStatusAlertsOverviewSummary?
                                    <h2><span>{this.props.data.get('totalFarms')}</span> </h2>
                                    :<h2><Loader/></h2>}
                            </div>
                            <div className="">
                                <div><strong>Total Affected Turbines</strong></div>
                                {!this.props.loaderStatusAlertsOverviewSummary?
                                    <h2><span>{this.props.data.get('totalTurbines')}</span></h2>
                                    :<h2><Loader/></h2>}
                            </div>
                        </div>
                    </div>
                </div><br/>
                <div className="flex-container-nowrap flex-end-h">
                    <CustomDatePicker ref = {(datePick) => { this.customDatePicker = datePick}}
                                      dateChange={this.updateDate}
                                      startOnChange={this.handleDateChangeInitial}
                                      endOnChange={this.handleDateChangeFinal}
                                      initialDate={this.props.data.get('initialDate')}
                                      finalDate={this.props.data.get('finalDate')}
                                      reloadGraphs={this.handleGo}
                                      defaultValue={this.props.data.get('selectedDate')}

                    />
                </div>
               <div className="table-container top-buffer-2">
                    <div className="flex-container flex-end-h">
                        <div onClick={this.downloadData} className="link">CSV</div>
                    </div>
                   { !this.props.loaderStatusAlertsOverview ?
                   <BootstrapTable data={this.props.data.get('tableData')} hover options={ this.options } height={this.props.data.get('tableHeight')}>
                       <TableHeaderColumn width='100' dataField="alerts" isKey dataAlign="center" dataSort = {true}>Name of Alarm</TableHeaderColumn>
                       <TableHeaderColumn width='100' dataField="component_name" dataFormat={priceFormatter} dataAlign="center" dataSort = {true}>Affected Component</TableHeaderColumn>
                       <TableHeaderColumn width='100' dataField="number_of_turbines_affected" dataFormat={priceFormatter} dataSort = {true}>Affected Turbines</TableHeaderColumn>
                       <TableHeaderColumn width='100' dataField="number_of_farms_affected" dataFormat={priceFormatter} dataSort = {true}>Affected Farms</TableHeaderColumn>
                       <TableHeaderColumn width='100' dataField="number_of_alerts_actioned" dataFormat={priceFormatter} dataSort = {true}>Total Resolved</TableHeaderColumn>
                       {/*<TableHeaderColumn width='70' dataField="model" dataFormat={priceFormatter} dataSort>Number of Alerts Resolved</TableHeaderColumn>*/}
                   </BootstrapTable>
                       :
                       <Loader height={this.props.tableHeight}/>
                       }
               </div>
                       <br/><br/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const { OverviewReducer } = state
    let data = OverviewReducer
    return {data};
};


export default connect(mapStateToProps)(Overview);
