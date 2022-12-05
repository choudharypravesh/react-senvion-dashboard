import React from 'react';
import moment from  'moment';
import classnames from 'classnames';
import { FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './CustomDatePicker.css';
import Select  from 'react-virtualized-select'


let windowWidth =  window.innerWidth;
class CustomDatePicker extends React.Component{
  constructor(props){
    super(props),
    this.changeDate=this.changeDate.bind(this);
    let disabled = [0];
    this.props.disabled ? disabled.push(this.props.disabled) : disabled;
    this.state={
        selectedDate: this.props.defaultValue,
        offsetDate: this.props.offsetDate ? moment().diff(this.props.offsetDate, 'days') : 0,
        disabled: disabled,
        dateArray : [
                {label:'Today', value:'today',disabled : (disabled.indexOf(0)!=-1)},
                {label:'Last 7 Days', value:'last7day',disabled : (disabled.indexOf(1)!=-1)},
                {label:'Last 30 Days', value:'last30day',disabled : (disabled.indexOf(2)!=-1)},
                {label:'Last 90 Days', value:'last90day',disabled : (disabled.indexOf(3)!=-1)},
                {label:'Last 180 Days', value:'last180day',disabled : (disabled.indexOf(4)!=-1)},
                {label:'Last 360 Days', value:'last360day',disabled : (disabled.indexOf(5)!=-1)} ,
                {label:'Yesterday', value:'yesterday',disabled : (disabled.indexOf(6)!=-1)},
            {label:'Custom', value:'custom',disabled : true}
        ],
    };
    this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this);
    this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this);
    this.getDate = this.getDate.bind(this);
    this.handleDropdownChange =this.handleDropdownChange.bind(this);
    this.getSelectedDate = this.getSelectedDate.bind(this);
      this.disableAll = this.disableAll.bind(this);
  }
  getDate(days, offsetDate){
    return moment().subtract(days, 'days').subtract(offsetDate, 'days').format('YYYY-MM-DD');
  }
  componentWillReceiveProps(nextProps){
    let disabled = [0];
    this.props.disabled ? disabled.push(this.props.disabled) : disabled;
    this.setState({
        disabled: disabled
    });
  }
    disableAll(){
        this.props.disableCustom?this.props.fullLife(0):this.props.fullLife(1);
    }
  changeDate(val) {
    let end = this.props.offsetDate ? this.props.offsetDate : moment().format('YYYY-MM-DD');
    let start = moment(this.props.initialDate).format('YYYY-MM-DD');
    let selectedDate = 0;
    let offsetDate = this.state.offsetDate;
    if (val=='today') {
        this.props.dateChange( moment(), end);
    }
    else if(val == 'yesterday') {
        start = this.getDate(1, offsetDate)
        selectedDate = 6;
        this.props.dateChange(start, end, selectedDate);
    }else if (val=='last7day') {
        start = this.getDate(7, offsetDate)
        selectedDate = 1;
        this.props.dateChange(start, end, selectedDate);
    }
    else if (val=='last30day') {
        console.log("coming into last30day");
        start = this.getDate(30, offsetDate);
        selectedDate = 2;
        this.props.dateChange(start, end, selectedDate);
    }
    else if (val=='last90day') {
        start = this.getDate(90, offsetDate);
        selectedDate = 3;
        this.props.dateChange(start, end, selectedDate);
    }
    else if (val=='last180day') {
        start = this.getDate(180, offsetDate);
        selectedDate = 4;
        this.props.dateChange(start,end, selectedDate);
    }
    else if (val=='last360day') {
        start = this.getDate(360, offsetDate);
        selectedDate = 5;
        this.props.dateChange(start, end, selectedDate);
    }
    this.setState({
        selectedDate: selectedDate
    });
  }

  handleDateChangeInitial(date){
        let initialDate = date.format('YYYY-MM-DD');
        this.props.startOnChange(initialDate);
        this.setState({
            selectedDate: 7
        });
  }
  handleDateChangeFinal(date){
      let finalDate = date.format('YYYY-MM-DD');
        this.props.endOnChange(finalDate);
        this.setState({
            selectedDate: 7
        });
  }
  getSelectedDate(){
    return this.state.dateArray[this.state.selectedDate];
  }


  handleDropdownChange(val) {
      this.changeDate(val.value);
  }
  render(){
      let selectedDate = this.getSelectedDate();
      return(
      <div className="flex-container-nowrap">
          &nbsp;&nbsp;{this.props.showFullLife && <a
             className={classnames('btn btn-xs full-life', {
                 'full-life-selected': this.props.disableCustom === 1})}
             onClick={() => {
                 this.disableAll()
             }}>Full Life</a>}
          {(windowWidth > 1400) ?
              <div>
                  &nbsp;
                  <a id="today"
                     className={classnames('btn btn-xs h-text', {
                         'disabled': this.state.disabled.indexOf(0) != -1 || this.props.disableCustom  === 1})}
                     onClick={() => {
                         this.changeDate('today')
                     }}>Today</a>&nbsp;
                  <a id="yesterday" className={classnames('btn btn-xs h-text', {
                      'selected': this.state.selectedDate === 6,
                      'disabled': this.state.disabled.indexOf(6) != -1 || this.props.disableCustom  === 1
                  })} onClick={() => {
                      this.changeDate('yesterday')
                  }}>Yesterday</a>&nbsp;
                  <a id="last7" className={classnames('btn btn-xs h-text', {
                      'selected': this.state.selectedDate === 1,
                      'disabled': this.state.disabled.indexOf(1) != -1 || this.props.disableCustom  === 1
                  })} onClick={() => {
                      this.changeDate('last7day')
                  }}>Last 7 Days</a>&nbsp;
                  <a id="last30" className={classnames('btn btn-xs h-text', {
                      'selected': this.state.selectedDate === 2,
                      'disabled': this.state.disabled.indexOf(2) != -1 || this.props.disableCustom  === 1
                  })} onClick={() => {
                      this.changeDate('last30day')
                  }}>Last 30 Days</a>&nbsp;
                  <a id="last90" className={classnames('btn btn-xs h-text', {
                      'selected': this.state.selectedDate === 3,
                      'disabled': this.state.disabled.indexOf(3) != -1 || this.props.disableCustom  === 1
                  })} onClick={() => {
                      this.changeDate('last90day')
                  }}>Last 90 Days</a>&nbsp;
                  <a id="last180" className={classnames('btn btn-xs h-text', {
                      'selected': this.state.selectedDate === 4,
                      'disabled': this.state.disabled.indexOf(4) != -1 || this.props.disableCustom  === 1
                  })} onClick={() => {
                      this.changeDate('last180day')
                  }}>Last 180 Days</a>&nbsp;
                  <a id="last360" className={classnames('btn btn-xs h-text', {
                      'selected': this.state.selectedDate === 5,
                      'disabled': this.state.disabled.indexOf(5) != -1 || this.props.disableCustom  === 1
                  })} onClick={() => {
                      this.changeDate('last360day')
                  }}>Last 360 Days</a>&nbsp;

              </div>
              :
              <span>

                  <Select
                      value={selectedDate}
                      className='date-picker-dropdown'
                      options={this.state.dateArray}
                      placeholder={'Select a days'}
                      clearable={false}
                      autosize={true}
                      onChange={this.handleDropdownChange}
                      disabled = {this.props.disableCustom  === 1}
                  />

              </span>

          }

          {(!this.props.noCalendar) ?
                <div className="flex-container-nowrap flex-end-h date-picker">
                  <div className="Custom-date-picker-box">
                      <FormGroup>
                          <DatePicker
                              dropdownMode="select"
                              selected={moment(this.props.initialDate)}
                              onChange={this.handleDateChangeInitial}
                              maxDate={moment()}
                              dateFormat="DD/MM/YYYY"
                              disabled = {this.props.disableCustom  === 1}
                          />

                      </FormGroup>
                  </div>
                  <div>&nbsp;&nbsp;To&nbsp;&nbsp;</div>
                  <div className="Custom-date-picker-box">
                      <FormGroup>
                          <DatePicker
                              dropdownMode="select"
                              selected={moment(this.props.finalDate)}
                              onChange={this.handleDateChangeFinal}
                              maxDate={moment()}
                              dateFormat="DD/MM/YYYY"
                              disabled = {this.props.disableCustom  === 1}
                          />
                          {/*<HelpBlock>Help</HelpBlock>*/}
                      </FormGroup>
                  </div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div className="date-go-button">
                      <button id="submit-filter-selection" onClick={this.props.reloadGraphs} disabled={this.props.disableCustom  === 1} className={classnames("btn btn-success btn-xs")}>Go</button>
                  </div>
                </div>

              :
              <span />
          }
      </div>
    );
  }
}
export default CustomDatePicker;
