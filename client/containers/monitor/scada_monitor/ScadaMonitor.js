import React from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import axios from "axios";
import _ from "underscore";
import lodash from 'lodash'
import Select from 'react-select'
import FaCircle from 'react-icons/lib/fa/circle'
import Clock from './clock'
import Popup from './popup'
import classnames from 'classnames'
import Loader from '../../../components/Loader/Loader';
import { connect } from 'react-redux'
import {getScadaData, getCountries, getFarms, clearDataInterval, changeFarmValue, changeCountryValue, startInterval,
    onCountZero} from './ScadaMonitorActions'

class CustomPaginationTable extends React.Component {
    constructor(props) {
        super(props)

        this.filterChangeFarm = this.filterChangeFarm.bind(this);
        this.filterChangeCountry = this.filterChangeCountry.bind(this);
        this.pageClick = this.pageClick.bind(this);
        this.addClass = this.addClass.bind(this);
        this.removeClass = this.removeClass.bind(this);
        this.hasClass = this.hasClass.bind(this);

    }

    componentDidMount() {
        var self = this;
        const {dispatch} = this.props;
        if(window.innerHeight < 800) {
            self.setState({allowedRows: 10})
        } else {
            self.setState({allowedRows: 19})
        }
        dispatch(getCountries());
        dispatch(getFarms('CA'));
        dispatch(getScadaData('Lac Alfred', this.props.allowedRows))

        window.addEventListener("resize", function() {
            console.log("resized");
            if(window.innerHeight < 800) {
                self.setState({allowedRows: 10})
            } else {
                self.setState({allowedRows: 19})
            }
        });
    }


    filterChangeFarm(val) {
        let self = this;
          const { dispatch } = this.props;
          clearDataInterval();
          dispatch(changeFarmValue(val.label, ""))
          //this.setState({selectedFarm: val.label, noDataMessage: ""})
          dispatch(getScadaData(val.value,  self.props.allowedRows));
      }

      filterChangeCountry(val) {
          let self = this;
          const { dispatch } = this.props;
          clearDataInterval();
          dispatch(changeCountryValue(val.value, val.label));
          //this.setState({selectedCountryCode: val.value, selectedCountry: val.label})
          dispatch(getFarms(val.value));
          setTimeout(function() {
              dispatch(getScadaData(self.props.farms[0].value, self.props.allowedRows));
          }, 500)
      }

    pageClick(index) {
        const { dispatch } = this.props;
        var self = this;
        let count = 0;
        let pageDots = document.querySelectorAll('.dot-item>svg');
        console.log(index, document.querySelectorAll('.dot-item>svg')[index].classList.contains('clicked'));

        if(document.querySelectorAll('.dot-item>svg')[index].classList.contains('clicked')) {
            console.log("already there");
            self.addClass(pageDots[index], 'active');
            startInterval(self.props.totalChunks, index);
        } else {
            console.log("count == 0");
            clearDataInterval();
            self.addClass(pageDots[index], 'clicked');
            dispatch(onCountZero(index));
            //self.setState({tableData1: self.props.totalChunks[index], tableData2: self.props.totalChunks[index+1]});
        }

        for(let i=0; i<pageDots.length; i++) {
            self.removeClass(pageDots[i], 'active')
            if(i != index) {
                self.removeClass(pageDots[i], 'clicked')
            }
        }

    }


    hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }


    addClass(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className)) el.className += " " + className
    }

    removeClass(el, className) {
        var self = this;
        if (el.classList)
            el.classList.remove(className)
        else if (self.hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className=el.className.replace(reg, ' ')
        }
    }



    render() {

        let options = {
            /*onSizePerPageList: this.sizePerPageListChange.bind(this),*/
            page: 1,  // which page you want to show as default
            sizePerPage:this.props.allowedRows,  // which size per page you want to locate as default
        };

        const options0 = {
            /*onSizePerPageList: this.sizePerPageListChange.bind(this),*/
            page: 1,  // which page you want to show as default
            sizePerPage:this.props.allowedRows,  // which size per page you want to locate as default
        };



        function PowerProgress(cell,row) {

            let resultString = (cell/row.nominal_power)*100+"%";

            return(
                <div style={{display:'flex',justifyContent:'flex-start',color:'white'}}>
                    <div style={{width:'35px',textAlign:'left'}}>{Math.ceil(cell)}&nbsp;
                    </div>
                    <div id="new"
                         style={{
                             display:'flex',
                             width: '42%',
                             height: '10px',
                             marginTop:'2%',
                             background:'repeating-linear-gradient(90deg, rgb(11, 29, 47), rgb(11, 29, 47) 1px, #19352a 0px, #19352a 4px) rgb(75, 168, 130)'

                         }}
                    ><div
                        style={{
                            background: 'repeating-linear-gradient(90deg, #0b1d2f, #0b1d2f 1px, #4ba882 0px, #4ba882 4px)',
                            align:'left',
                            width: resultString,//`calc(${cell}*0.05%)`,
                            height: '10px',
                            backgroundColor:'#4ba882',
                            transition: 'all .2s ease-out'
                        }}
                    />
                    </div>
                </div>
            ) ;
        }

        function WindProgress(cell,row) {
            let total = 24;
            let windSpeedPercent = (cell/24)*100;
            return(
                <div style={{display:'flex',justifyContent:'flex-start',color:'white'}}>
                    <div style={{width:'35px',textAlign:'left', marginRight: '10px'}}>{cell.toFixed(1)}&nbsp;
                    </div><div
                    style={{
                        display:'flex',

                        width: '42%',
                        height: '10px',
                        marginTop:'1%',
                        background: "repeating-linear-gradient(90deg, rgb(11, 29, 47), rgb(11, 29, 47) 1px, #19352a 0px, #19352a 4px) rgb(75, 168, 130)"

                    }}
                ><div
                    style={{
                        align:'left',
                        width: `calc(${windSpeedPercent}%)`,
                        height: '10px',
                        background: 'repeating-linear-gradient(90deg, #0b1d2f, #0b1d2f 1px, #4ba882 0px, #4ba882 4px)',

                        transition: 'all .2s ease-out'
                    }}
                />
                </div></div>
            ) ;
        }

        function EnergyProgress(cell,row) {
            let total = (row.nominal_power*24)/1000;
            let value = cell/total
            return(
                <div style={{display:'flex',justifyContent:'flex-start',color:'white'}}>
                    <div style={{width:'35px',textAlign:'left', marginRight: '10px'}}>{Number(cell).toFixed(1)}&nbsp;
                    </div><div
                    style={{
                        display:'flex',
                        width: '85px',
                        height: '10px',
                        marginTop:'1%',
                        background: "repeating-linear-gradient(90deg, rgb(11, 29, 47), rgb(11, 29, 47) 1px, #19352a 0px, #19352a 4px) rgb(75, 168, 130)"

                    }}
                ><div
                    style={{
                        align:'left',
                        width: `calc(${value}*100%)`,
                        height: '10px',
                        background: 'repeating-linear-gradient(90deg, #0b1d2f, #0b1d2f 1px, #4ba882 0px, #4ba882 4px)',
                        transition: 'all .2s ease-out'
                    }}
                />
                </div></div>
            ) ;
        }

        function Status(cell,row) {
            if (row.status=='2') {
                return(<div>
                    <p style={{color:'#aba836',margin:'0 0 0 0 !important'}} className="ion-alert"></p>
                </div>);
            }
            else if(row.status=='3') {
                return(<div>
                    <p style={{color:'#EA7258',margin:'0 0 0 0  !important'}} className="ion-radio-waves"> </p>
                </div>);
            }
            else if(row.status=='4')  {
                return(<div>
                    <p style={{color:'#82b38e',margin:'0 0 0 0 !important'}} className="ion-ios-location"> </p>
                </div>);
            }
            else{

            }
        }

        return (
            <div className=""><br/><br/>
                <div className="body-wrapper">
                    <div className="flex-container flex-sb-h">
                        <div>

                        </div>
                        <div className="text-center farm-heading">
                            {this.props.selectedFarm}, {this.props.selectedCountry}
                        </div>
                        <div>
                            <div className="clock"><Clock/></div>
                        </div>
                    </div><br/>
                    <div className="flex-container flex-end-h">
                        {/*<Popup />*/}
                        <div className="flex-container">
                            <div>Country&nbsp;&nbsp;</div>
                            <Select
                                name="country"
                                value={this.props.selectedCountryCode}
                                options={this.props.countries}
                                onChange={this.filterChangeCountry}
                                clearable={false}
                                autosize={true}
                            />
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Farm&nbsp;&nbsp;</div>
                            <Select
                                name="alerts1"
                                value={this.props.selectedFarm}
                                options={this.props.farms}
                                onChange={this.filterChangeFarm}
                                clearable={false}
                                autosize={true}
                            />
                        </div>
                    </div>
                </div>
                {(this.props.loader) ? (
                        <Loader width={window.innerWidth/2.3} height={300}/>
                    ) : (<div className={classnames({'display-none': this.props.noDataMessage.length > 0})}>
                        <div className="monitor-tables flex-container flex-sa-h flex-start-v">
                            <div className="table1">
                                <BootstrapTable data={this.props.tableData1} bordered={false}   pagination={ true } options={options}>
                                    <TableHeaderColumn width='35%' dataField="turbine_id" isKey>Turbine Id</TableHeaderColumn>
                                    <TableHeaderColumn width='30%' dataField="type">Type</TableHeaderColumn>
                                    <TableHeaderColumn width='70%' dataField='wind_speed' dataFormat={WindProgress}>Windspeed (m/s)</TableHeaderColumn>
                                    <TableHeaderColumn width='70%' dataField='power' dataFormat={PowerProgress}>Power (kW)</TableHeaderColumn>
                                    <TableHeaderColumn width='154%' dataField='energy' dataFormat={EnergyProgress}>Energy Production (MWh)</TableHeaderColumn>
                                    {/*<TableHeaderColumn dataField='time' headerAlign='center' thStyle={{fontWeight:'300',fontSize:'16px'}} tdStyle={ { fontFamily:'Arial',textAlign:'center' } } dataFormat={Status}>Status</TableHeaderColumn>*/}
                                </BootstrapTable>
                            </div>
                            <div className="table2">
                                {(this.props.tableData2) ? (
                                        <BootstrapTable data={ this.props.tableData2 } bordered={false} pagination={ true } options={options0}>
                                            <TableHeaderColumn width='10%' dataField='turbine_id' isKey>Turbine Id</TableHeaderColumn>
                                            <TableHeaderColumn width='10%' dataField="type">Type</TableHeaderColumn>
                                            <TableHeaderColumn width='25%' dataField='wind_speed' dataFormat={WindProgress}>Windspeed (m/s)</TableHeaderColumn>
                                            <TableHeaderColumn width='25%' dataField='power' dataFormat={PowerProgress}>Power (kW)</TableHeaderColumn>
                                            <TableHeaderColumn width='25%' dataField='energy' dataFormat={EnergyProgress}>Energy Production (MWh)</TableHeaderColumn>
                                            {/*<TableHeaderColumn dataField='status' headerAlign='center' thStyle={{fontWeight:'300',fontSize:'16px'}} tdStyle={ { textAlign:'center' } } dataFormat={Status}>Status</TableHeaderColumn>*/}
                                        </BootstrapTable>
                                    ) : null}
                            </div>
                        </div>
                    </div>)}
                {(this.props.totalChunks) ? (
                        <Pagination
                            chunks={this.props.totalChunks}
                            currentChunk={this.props.currentChunk}
                            pageClick={this.pageClick}
                        />
                    ) : null}

                {/*NO DATA FOR FARM*/}
                <div className='no-data heading-title'>{this.props.noDataMessage}</div>
            </div>
        );
    }
}


class Pagination extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let chunksCount = this.props.chunks.length
        let pages = [];
        for(let i=0; i<chunksCount/2; i++) {
            pages.push(<div className="dot-item" style={{marginRight: '5px', cursor: 'pointer'}}>
                            <FaCircle id={i} onClick={() => this.props.pageClick(i)} className={classnames('dots', {'active': i == this.props.currentChunk})}/>
                        </div>);
        }

        return(
            <div className="flex-container text-center pagination-container">
                {pages}
            </div>
        )
    }
}


//export default CustomPaginationTable

const mapStateToProps = state => {
    const { ScadaMonitorData } = state
    let scadaMonitor = {
      tableData: ScadaMonitorData.get('tableData'),
      tableData1: ScadaMonitorData.get('tableData1'),
      tableData2: ScadaMonitorData.get('tableData2'),
      totalChunks: ScadaMonitorData.get('totalChunks'),
      currentChunk:ScadaMonitorData.get('currentChunk'),
      currentPageIndex: ScadaMonitorData.get('currentPageIndex'),
      farms: ScadaMonitorData.get('farms'),
      allowedRows: ScadaMonitorData.get('allowedRows'),
      selectedFarm: ScadaMonitorData.get('selectedFarm'),
      selectedCountryCode: ScadaMonitorData.get('selectedCountryCode'),
      selectedCountry: ScadaMonitorData.get('selectedCountry'),
      countries: ScadaMonitorData.get('countries'),
      loader: ScadaMonitorData.get('loader'),
      noDataMessage: ScadaMonitorData.get('noDataMessage'),
      isLoopActive: ScadaMonitorData.get('isLoopActive')
    }
    return scadaMonitor
};


export default connect(mapStateToProps)(CustomPaginationTable);
