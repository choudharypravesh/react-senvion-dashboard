import React from 'react';
import {Link} from 'react-router';
import AlertsCss from '../../../../public/styles/containers/analyze/Alerts.css'
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from'react-bootstrap-table';
import FaArrowUp from 'react-icons/lib/fa/arrow-up'
import FaArrowDown from 'react-icons/lib/fa/arrow-down'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import classnames from 'classnames'
import _ from 'underscore'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import VirtualizedSelect from 'react-virtualized-select'
import 'react-virtualized-select/styles.css'
import createFilterOptions from 'react-select-fast-filter-options'
import {GetData,downloadCSV} from "../../../Utils/utils";
import { connect } from 'react-redux'
import {updateStatus, setPageIndex, clearAllFiltersAndGetData, changeTurbine, changeStatus, changePriority, changeAlert, setFinalDate, setInitialDate, getAlertsListData, getAlertTypes, getAllTurbines} from './AlertsListActions'
import Loader from '../../../components/Loader/Loader'
class Alerts extends React.Component {
    constructor(props) {
        super(props);
        this.options = {
            onPageChange: this.onPageChange.bind(this),
            /*onSizePerPageList: this.sizePerPageListChange.bind(this),*/
            page: 1,  // which page you want to show as default
            sizePerPage: this.props.numberOfRows,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: false,  // Accept bool or function
            paginationPosition: 'bottom'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };

        this.actionOnSolution = this.actionOnSolution.bind(this);
        this.statusFormatter = this.statusFormatter.bind(this);
        this.getPageData = this.getPageData.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.setPagination = this.setPagination.bind(this);
        this.downloadData = this.downloadData.bind(this);
        this.changAlert =this.changAlert.bind(this)
        this.changePriority = this.changePriority.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.changeTurbine = this.changeTurbine.bind(this)
        this.getFilterResults = this.getFilterResults.bind(this);
        this.getFilterData = this.getFilterData.bind(this);
        this.priceFormatter = this.priceFormatter.bind(this);
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
        this.priorityFormatter = this.priorityFormatter.bind(this);
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this);
        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this);
        this.getResults = this.getResults.bind(this)
    }

    componentDidMount() {
        var self = this;
        this.props.dispatch(getAlertTypes())
        this.props.dispatch(getAllTurbines())
        this.getPageData({status: "", pageNo: 1, entriesPerPage: 15, start: "", end: ""});
    }

    getFilterData(isClearAll){
        var data;
        if(isClearAll){
            data = {
                    alerts: '',
                    priority: '',
                    status: '',
                    start_date: '',
                    end_date: '',
                    turbines: '',
                    pageNo: 1,
                    entriesPerPage: 15
                };
        }else{
            data = {
               status: this.props.selectedStatus ? this.props.selectedStatus.value : '',
               pageNo: this.props.pageNo,
               entriesPerPage: this.props.entriesPerPage,
               alerts: this.props.selectedAlert ? this.props.selectedAlert.value : '',
               priority: this.props.selectedPriority ? this.props.selectedPriority.value : '',
                start_date: this.props.initialDate? moment(this.props.initialDate).format('YYYY-MM-DD'):"",
                end_date: this.props.finalDate?moment(this.props.finalDate).format('YYYY-MM-DD'):"",
               turbines: this.props.selectedTurbine ? this.props.selectedTurbine.value : ''
            };
        }
       return data;
    }

    getPageData(params, isClearAll) {
        let self = this;
        let data = this.getFilterData(isClearAll)
        this.props.dispatch(getAlertsListData(data, params));
    }
    downloadData(){
        let data = this.getFilterData();
        data.pageNo = 1;
        data.entriesPerPage = this.props.resultCount;
        this.props.dispatch(getAlertsListData(data,{saveToCsv: true}))
    }

    actionOnSolution(row, index) {
        var self = this;
        if(index == 1) {
            localStorage.selectedTurbineId = row.turbine_id;
            localStorage.selectedAlert = JSON.stringify(row);
            localStorage.removeItem('activeTab');
        } else {
            let data = {
                id: row.id,
                status: 1,
                cur_status: this.props.selectedStatus ? this.props.selectedStatus.value : '',
                pageNo: this.props.currentPageIndex,
                entriesPerPage: 15,
                alerts: this.props.selectedAlert ? this.props.selectedAlert.value : '',
                priority: this.props.selectedPriority ? this.props.selectedPriority.value : '',
                start_date: this.props.initialDate ?  moment(this.props.initialDate).format('YYYY-MM-DD'):"",
                end_date: this.props.finalDate? moment(this.props.finalDate).format('YYYY-MM-DD'):"",
                turbines: this.props.selectedTurbine ? this.props.selectedTurbine.value : ''
            }
            this.props.dispatch(updateStatus(data))
        }
    }

    setPagination(page, sizePerPage, isLast){
        let pageNo = page;
        let initPage = page === 1 ? 1 : 0;
        let currentPageIndex = this.props.currentPageIndex;
        if(page == 100) {//for next button
            if(currentPageIndex%5 == 0) {
                initPage = this.props.initialPage+5;
            }
            pageNo = currentPageIndex+1;
        } else if(page == 101) {// for previous button
            if((currentPageIndex-1)%5 == 0 && currentPageIndex > 1) {
                initPage = this.props.initialPage-5;
            }
            pageNo = currentPageIndex-1;
        } else if(isLast == 'last') {
            let rem = page%5
            initPage = page-(rem === 0 ?4:rem-1)
            pageNo = page;
        }
        let initialPage = initPage ? initPage : this.props.initialPage;
        currentPageIndex = pageNo;

        this.props.dispatch(setPageIndex({initialPage, currentPageIndex}))
        return pageNo;
    }

    onPageChange(page, sizePerPage, isLast) {
        let pageNo = this.setPagination(page, sizePerPage, isLast);
        let data = this.getFilterData();
        data.pageNo = pageNo;
        this.props.dispatch(getAlertsListData(data));
    }

    statusFormatter(status, row) {
        if(status == 0) {
            return '<span class="label label-primary">New</span>';
        } else if(status == 1) {
            return '<span class="label label-default">Ignored</span>';
        } else if(status == 2) {
            return '<span class="label label-success">Closed</span>';
        } else if(status == 3) {
            return '<span class="label label-success">In Progress</span>';
        }
    }

    clearAll(){
        this.setPagination(1,15);
        let data = this.getFilterData(true)
        this.props.dispatch(clearAllFiltersAndGetData(data));
    }

    getFilterResults(){
        let filterData = {
            alerts: this.props.selectedAlert,
            priority: this.props.selectedPriority,
            status: this.props.selectedStatus,
            start_date: moment(this.props.initialDate).format('YYYY-MM-DD'),
            end_date: moment(this.props.finalDate).format('YYYY-MM-DD'),
            turbines: this.props.selectedTurbine
        };
        this.setPagination(1,15);
        this.getPageData(filterData)
    }

    changAlert(val){
        this.setPagination(1,15);
        let data = this.getFilterData()
        this.props.dispatch(changeAlert(val, data));
    }
    changePriority(val){
        this.setPagination(1,15);
        let data = this.getFilterData()
        this.props.dispatch(changePriority(val, data));
    }
    changeStatus(val){
        this.setPagination(1,15);
        let data = this.getFilterData()
        this.props.dispatch(changeStatus(val, data));
    }
    changeTurbine(val){
        this.setPagination(1,15);
        let data = this.getFilterData()
        this.props.dispatch(changeTurbine(val, data));
    }
    handleDateChangeInitial(initialDate){
        this.props.dispatch(setInitialDate(initialDate))
    }

    handleDateChangeFinal(finalDate){
        this.props.dispatch(setFinalDate(finalDate))
    }

    getResults(){
        this.getPageData();
    }

    priceFormatter(cell, row) {
        return <span title={cell}>{cell}</span>;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }

    buttonFormatter(cell, row) {
        //return '<a href="/monitor/alerts/charts" class="btn btn-xs btn-default">View</a>'
        if(row.status == 0) {
            return <div className="flex-container-nowrap flex-start-h">
                <div style={{width: '20px'}} onClick={() => {this.actionOnSolution(row, 1)}}>
                    <Link to="/monitor/alerts/details" className="">
                        <img src={require('../../../../public/images/icons/view-inside.svg')} width="100%"/>
                    </Link>
                </div>&nbsp;&nbsp;
                <div style={{width: '20px'}} onClick={() => {this.actionOnSolution(row, 6)}}>
                    <img src={require('../../../../public/images/icons/archive.svg')} width="100%"/>
                </div>
            </div>
        } else {
            return <div className="">
                        <div style={{width: '20px'}} onClick={() => {this.actionOnSolution(row, 1)}}>
                            <Link to="/monitor/alerts/details" className="">
                                <img src={require('../../../../public/images/icons/view-inside.svg')} width="100%"/>
                            </Link>
                        </div>
                    </div>
        }
    }

    dateFormatter(cell, row) {
        var date = new Date(cell);
        return <span title={moment(date).startOf('day').fromNow()}>{moment(date).format('DD MMMM YYYY')}</span>;
    }

    priorityFormatter(cell, row) {
        if(cell == 'High') {
            return <div className="">
                <span title={cell}><FaArrowUp className="red-text"/>&nbsp;High</span>
            </div>
        } else {
            return <div className="">
                <span title={cell}><FaArrowDown className="blue-text"/>&nbsp;Low</span>
            </div>
        }
    }

    render() {
        var self = this;
        let options=this.props.turbinesList
        const filterOptions  = createFilterOptions({options});
        return (
            <div className="alerts-container" id="alerts">
                <div className="row">
                    <div>
                        <div>
                            <div className="row margin-bottom top-buffer alert-filter-container">
                                    <div className="col-xs-2 no-padding">
                                        <label htmlFor="example-text-input" className="col-2 col-form-label">Alerts</label>
                                        <VirtualizedSelect
                                            name="alerts"
                                            value={this.props.selectedAlert}
                                            options={this.props.alertTypesList}
                                            onChange={this.changAlert}
                                            placeholder="Select alert type"
                                        />
                                    </div>
                                    <div className="col-xs-2 ">
                                        <label htmlFor="example-text-input" className="col-2 col-form-label">Priority</label>
                                        <VirtualizedSelect
                                            name="alerts"
                                            value={this.props.selectedPriority}
                                            options={this.props.priorityList}
                                            onChange={this.changePriority}
                                            placeholder="Select priority"
                                        />
                                    </div>
                                    <div className="col-xs-2 no-padding">
                                        <label htmlFor="example-text-input" className="col-2 col-form-label">Status</label>
                                        <VirtualizedSelect
                                            name="alerts"
                                            value={this.props.selectedStatus}
                                            options={this.props.statusList}
                                            onChange={this.changeStatus}
                                            placeholder="Select Status"
                                        />
                                    </div>
                                    <div className="col-xs-2 ">
                                        <label htmlFor="example-text-input" className="col-2 col-form-label">Turbine</label>
                                        <VirtualizedSelect
                                            filterOptions={ filterOptions }
                                            name="turbines"
                                            value={this.props.selectedTurbine}
                                            options={this.props.turbinesList}
                                            onChange={this.changeTurbine}
                                            placeholder="Select Turbine"
                                        />
                                    </div>
                                    <div className="col-xs-4 no-padding">
                                        <label htmlFor="example-text-input" className="col-2 flex-end-h col-form-label">Date Range </label>
                                        <div className="flex-container-nowrap flex-start-h">
                                              <DatePicker
                                                  id="example-datepicker"
                                                  selected={this.props.initialDate}
                                                  onChange={this.handleDateChangeInitial}
                                                  showClearButton={false}
                                                  maxDate={moment()}
                                                  dateFormat="DD/MM/YYYY"/>
                                              <div>&nbsp;To&nbsp;</div>
                                              <DatePicker
                                                  id="example-datepicker"
                                                  selected={this.props.finalDate}
                                                  onChange={this.handleDateChangeFinal}
                                                  showClearButton={false}
                                                  maxDate={moment()}
                                                  dateFormat="DD/MM/YYYY"/>
                                              <div className="date-go-button">
                                                  &nbsp;&nbsp;<button onClick={this.getResults} className="btn btn-success btn-sm">Go</button>
                                              </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className = "col-xs-4">
                            <strong>{this.props.tableData && this.props.tableData.length}</strong> of <strong>{this.props.resultCount}</strong> alerts for the filter
                            {/*this.state.showAll ?
                                <button onClick={this.changeResults} className="btn btn-default btn-sm margin-left-small">Show unique turbines</button>
                                :
                                <button onClick={this.changeResults} className="btn btn-default btn-sm margin-left-small">Show All turbines</button>
                            */}
                            <button onClick={this.clearAll} className="btn btn-default btn-sm margin-left-small">Clear All</button>
                        </div>
                    </div>
                </div>

                <div className="flex-container flex-end-h">
                    <div onClick={this.downloadData} className="link">CSV</div>
                </div>

                <div className="table-container row top-buffer">
                    {this.props.loadingAlertsList ?
                        <Loader height={this.props.tableHeight}/>
                        :
                        <BootstrapTable data={this.props.tableData} hover options={ this.options } height={this.props.tableHeight+'px'}>
                            <TableHeaderColumn width='50' dataField="id" isKey dataAlign="center" dataSort>ID</TableHeaderColumn>
                            <TableHeaderColumn width='180' dataField="alerts" dataFormat={this.priceFormatter} dataAlign="center" dataSort>Alerts</TableHeaderColumn>
                            <TableHeaderColumn width='70' dataField="priority" dataFormat={this.priorityFormatter} dataSort>Priority</TableHeaderColumn>
                            <TableHeaderColumn width='150' dataField="farm_name" dataFormat={this.priceFormatter} dataSort>Farm</TableHeaderColumn>
                            <TableHeaderColumn width='70' dataField="turbine_id" dataFormat={this.priceFormatter} dataSort>Turbine ID</TableHeaderColumn>
                            <TableHeaderColumn width='70' dataField="model" dataFormat={this.priceFormatter} dataSort>Model</TableHeaderColumn>
                            <TableHeaderColumn width='130' dataField="date_identified" dataFormat={this.dateFormatter} dataSort>Date Identified</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField="status" dataFormat={this.statusFormatter} dataSort>Status</TableHeaderColumn>
                            <TableHeaderColumn width='90' dataField="approval" dataFormat={this.buttonFormatter} dataSort>Action</TableHeaderColumn>
                        </BootstrapTable>
                    }
                    <div className="row top-buffer-2">
                        <div className="col-xs-5">
                            <strong>{this.props.tableData && this.props.tableData.length}</strong> of <strong>{this.props.resultCount}</strong> alerts for the filter
                        </div>
                        <div className="col-xs-7">
                            <Pagination
                                onPageChange={this.onPageChange}
                                currentPageIndex={this.props.currentPageIndex}
                                initialPage={this.props.initialPage}
                                numberOfAlerts={this.props.resultCount}
                            />
                        </div>
                    </div>
                </div><br/><br/>
            </div>
        )
    }
}


class Pagination extends React.Component {
    render() {
        let Page = [];
        let NoOfPages = Math.ceil(this.props.numberOfAlerts/15);
        console.log(this.props.initialPage)
        for(let i=this.props.initialPage; i<=NoOfPages; i++) {
            Page.push(<li onClick={() => this.props.onPageChange(i, 15)}
                          className={classnames({ 'active': this.props.currentPageIndex == i}, { 'display-none': i > this.props.initialPage+4})}>
                        <a>{i} <span className="sr-only">(current)</span></a>
                    </li>)
        }

        return(
            <div className="alerts-pagination-container">
                <nav className="text-right">
                    <ul className="list-inline">
                        <li onClick={() => this.props.onPageChange(1, 15)}
                            className={classnames({ 'display-none': this.props.currentPageIndex == 1})}>
                              <a>
                                <span>First</span>
                              </a>
                        </li>
                        <li onClick={() => this.props.onPageChange(101, 15)}
                            className={classnames({ 'display-none': this.props.currentPageIndex == 1})}>
                              <a>
                                <span>Prev</span>
                              </a>
                        </li>
                        {Page}
                        <li onClick={() => this.props.onPageChange(100, 15)}
                            className={classnames({ 'active': this.props.currentPageIndex == 101}, {'display-none': NoOfPages == 1 || this.props.currentPageIndex == NoOfPages})}>
                            <a>Next <span className="sr-only">(current)</span></a>
                        </li>
                        <li onClick={() => this.props.onPageChange(NoOfPages, 15, 'last')}
                            className={classnames({ 'active': this.props.currentPageIndex == NoOfPages})}>
                              <a>
                                <span>Last</span>
                              </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStoreToProps = state => {
    const {AlertsList} = state;
    return {
        numberOfRows: AlertsList.get('numberOfRows'),
        selectedStatus: AlertsList.get('selectedStatus'),
        pageNo: AlertsList.get('pageNo'),
        entriesPerPage: AlertsList.get('entriesPerPage'),
        selectedAlert: AlertsList.get('selectedAlert'),
        selectedPriority: AlertsList.get('selectedPriority'),
        initialDate: AlertsList.get('initialDate'),
        finalDate: AlertsList.get('finalDate'),
        selectedTurbine: AlertsList.get('selectedTurbine'),
        resultCount: AlertsList.get('resultCount'),
        currentPageIndex: AlertsList.get('currentPageIndex'),
        initialPage: AlertsList.get('initialPage'),
        turbinesList: AlertsList.get('turbinesList'),
        alertTypesList: AlertsList.get('alertTypesList'),
        priorityList: AlertsList.get('priorityList'),
        statusList: AlertsList.get('statusList'),
        tableData: AlertsList.get('tableData'),
        loadingAlertsList: AlertsList.get('loadingAlertsList'),
        tableHeight: AlertsList.get('tableHeight')
    };
}
export default connect(mapStoreToProps)(Alerts);
