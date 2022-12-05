// App.js
import React from 'react';
import xhr from 'xhr';
import axios from 'axios';
import { Modal, ButtonGroup, Button, Dropdown, MenuItem, ButtonToolbar, DropdownButton, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import AnomaliesComparasionsCss from '../../../../../public/styles/containers/technician/analyze/AnomaliesComparasions.css'
import FaTimes from 'react-icons/lib/fa/times-circle'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left'
import FaBell from 'react-icons/lib/fa/bell'
import Anamoly from './AnalyzeAnamolies'
import _ from 'underscore'
import Select from 'react-select'
import DatePicker from 'react-bootstrap-date-picker';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {Link} from 'react-router';
import FaPlus from 'react-icons/lib/fa/plus-circle';
import moment from 'moment';

class App2 extends React.Component {
    constructor(props) {
        super(props)

        let focusedInput = null;
        if (props.autoFocus) {
            focusedInput = 'startDate';
        } else if (props.autoFocusEndDate) {
            focusedInput = 'endDate';
        }

        this.state = {
            format: "YYYY-MM-DD",
            inputFormat: "DD/MM/YYYY",
            mode: "date",
            focusedInput,
            selectedTurbine1: "90249",
            selectedTurbine2: "90244",
            categoriesDropdown: [
                { value: '90249', label: '90249' },
                { value: '90244', label: '90244' },
                { value: '98989', label: '98989' },
                { value: '88999', label: '88999' },
                { value: '90998', label: '90998' }
            ],
            categories: ['Current_2', 'Active_power_2', 'Hydraulic_pressure_2', 'Tempgear_bearing1_2', 'Abs_wind_direct_2'],
            showPopup: false,
            data: {},
            dates: [],
            temps: [],
            plot1X1: [],
            plot1Y1: [],
            plot1X2: [],
            plot1Y2: [],
            plot2X1: [],
            plot2Y1: [],
            plot2X2: [],
            plot2Y2: [],
            HydraulicPressureX: [],
            HydraulicPressureY: [],
            plot3X1: [],
            plot3Y1: [],
            plot3X2: [],
            plot3Y2: [],
            plot4X1: [],
            plot4Y1: [],
            plot4X2: [],
            plot4Y2: [],
            initialDate: localStorage.initialDate ? localStorage.initialDate : '2015-01-01',
            finalDate: localStorage.finalDate ? localStorage.finalDate : '2015-01-02'
        };

        this.fetchData = this.fetchData.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this);
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this);
        this.reloadGraphs = this.reloadGraphs.bind(this);
        this.openCreateServiceOrderPopup = this.openCreateServiceOrderPopup.bind(this);
        this.onSelectMenuItem = this.onSelectMenuItem.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.fetchData();
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }


    fetchData() {
        console.log(this.state.initialDate)
        console.log(this.state.finalDate)
        var url = '/api/anomaly/graph';

        var self = this;
        var data = {
            variable: "Current_2",
            start_date: self.state.initialDate,
            end_date: self.state.finalDate,
            turbine_id : '90249,90244'
        }
        //var categories = ['Current_2', 'Active_power_2', 'Hydraulic_pressure_2', 'Tempgear_bearing1_2', 'Abs_wind_direct_2'];
        var fullData = {
            plot1X1: [],
            plot1Y1: [],
            plot1X2: [],
            plot1Y2: [],
            plot2X1: [],
            plot2Y1: [],
            plot2X2: [],
            plot2Y2: [],
            HydraulicPressureX: [],
            HydraulicPressureY: [],
            plot3X1: [],
            plot3Y1: [],
            plot3X2: [],
            plot3Y2: [],
            plot4X1: [],
            plot4Y1: [],
            plot4X2: [],
            plot4Y2: [],
        };

        for(let j=0; j<this.state.categories.length; j++) {
            data.variable = this.state.categories[j]
            xhr({
                url: url+"?data="+JSON.stringify(data)
            }, function (err, data) {
                console.log(data);
                var body = JSON.parse(data.body);
                console.log(body)
                var list = body.data;
                for (var i = 0; i < list.length; i++) {
                    var date = new Date(Number(list[i].timestamp));
                    if(j == 0) {
                        if(list[i].wind_turbine_serial_id_fk == self.state.selectedTurbine1) {
                            fullData.plot1Y1.push(list[i].Current_2);
                            fullData.plot1X1.push(date);
                        } else {
                            fullData.plot1Y2.push(list[i].Current_2);
                            fullData.plot1X2.push(date);
                        }
                    } else if(j == 1) {
                        if(list[i].wind_turbine_serial_id_fk == self.state.selectedTurbine1) {
                            fullData.plot2Y1.push(list[i].Active_power_2);
                            fullData.plot2X1.push(date);
                        } else {
                            fullData.plot2Y2.push(list[i].Active_power_2);
                            fullData.plot2X2.push(date);
                        }
                    } else if(j ==2) {

                    } else if(j == 3) {
                        if(list[i].wind_turbine_serial_id_fk == self.state.selectedTurbine1) {
                            fullData.plot3Y1.push(list[i].Tempgear_bearing1_2);
                            fullData.plot3X1.push(date);
                        } else {
                            fullData.plot3Y2.push(list[i].Tempgear_bearing1_2);
                            fullData.plot3X2.push(date);
                        }
                    } else if(j == 4) {
                        if(list[i].wind_turbine_serial_id_fk == self.state.selectedTurbine1) {
                            fullData.plot4Y1.push(list[i].Abs_wind_direct_2);
                            fullData.plot4X1.push(date);
                        } else {
                            fullData.plot4Y2.push(list[i].Abs_wind_direct_2);
                            fullData.plot4X2.push(date);
                        }

                    }
                }
            });

        }

        setTimeout(function() {
            console.log("final full data");
            console.log(fullData);

            self.setState({
                plot1X1: fullData.plot1X1,
                plot1Y1: fullData.plot1Y1,
                plot1X2: fullData.plot1X2,
                plot1Y2: fullData.plot1Y2,
                plot2X1: fullData.plot2X1,
                plot2Y1: fullData.plot2Y1,
                plot2X2: fullData.plot2X2,
                plot2Y2: fullData.plot2Y2,
                HydraulicPressureX: fullData.HydraulicPressureX,
                HydraulicPressureY: fullData.HydraulicPressureY,
                plot3X1: fullData.plot3X1,
                plot3Y1: fullData.plot3Y1,
                plot3X2: fullData.plot3X2,
                plot3Y2: fullData.plot3Y2,
                plot4X1: fullData.plot4X1,
                plot4Y1: fullData.plot4Y1,
                plot4X2: fullData.plot4X2,
                plot4Y2: fullData.plot4Y2,
                initialDate: self.state.initialDate,
                finalDate: self.state.finalDate
            });
        }, 3000)

       /* Anamoly.forceUpdate();*/

    };
    onDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }


    handleDateChangeInitial(initialDate) {
        localStorage.initialDate = initialDate;
    }


    handleDateChangeFinal(finalDate) {
        localStorage.finalDate = finalDate;
    }


    reloadGraphs() {
        window.location.href = "/chart";
    }


    onSelectMenuItem(menuNumber, menuitemIndex) {
        console.log(menuNumber, menuitemIndex);
        var self = this;

        switch(menuNumber) {
            case 1:
                if(menuitemIndex == 1) {
                   localStorage.categories = ['Current_2', 'Active_power_2', 'Hydraulic_pressure_2', 'Tempgear_bearing1_2', 'Abs_wind_direct_2']
                    window.location.href = "/chart";
                } else if(menuitemIndex == 2) {
                    localStorage.categories = ['Active_power_2', 'Current_2', 'Hydraulic_pressure_2', 'Tempgear_bearing1_2', 'Abs_wind_direct_2']
                    window.location.href = "/chart";
                } else if(menuitemIndex == 3) {
                    localStorage.categories = ['Active_power_2', 'Current_2', 'Hydraulic_pressure_2', 'Tempgear_bearing1_2', 'Abs_wind_direct_2']
                    window.location.href = "/chart";
                } else if(menuitemIndex == 4) {
                    localStorage.categories = ['Tempgear_bearing1_2', 'Current_2', 'Hydraulic_pressure_2', 'Active_power_2', 'Abs_wind_direct_2']
                    window.location.href = "/chart";
                } else if(menuitemIndex == 5) {
                    localStorage.categories = ['Abs_wind_direct_2', 'Current_2', 'Hydraulic_pressure_2', 'Tempgear_bearing1_2', 'Active_power_2']
                    window.location.href = "/chart";
                }
        }
    }

    changeLocation(evt) {
        this.setState({
            location: evt.target.value
        });
    };

    openCreateServiceOrderPopup() {
        this.setState({showPopup: true})
    }

    closePopup(e) {
        this.setState({showPopup: false})
    }


    goBack() {
        window.location.href = "/technician/analyze/anomalies";
    }

    render() {
        var currentTemp = 'not loaded yet';
        var margins = {
            marginBottom: '4%',
            marginRight: '2%'
        };

        const { focusedInput, startDate, endDate } = this.state;

        var plotStyle= {
            border: '1px solid #ddd'
        }
        return (

            <div className="anamolies-comparasions-container" id="anamolies-comparasions">
                <div className="flex-container-nowrap flex-sb-h content-heading-margins">
                    <div className="flex-container">
                        <div onClick={this.goBack} className="back-button"><FaArrowLeft/></div>
                        <div className="chip">Gear Heating {/*<FaTimes/>*/}</div>
                    </div>
                    <div>
                        <div className="btn-group" role="group">
                            <button onClick={this.openCreateServiceOrderPopup} className="btn btn-success"><FaPlus/>&nbsp;&nbsp;CREATE SERVICE ORDER</button>
                        </div>
                    </div>
                </div>
                <div className="flex-sb-h flex-container-nowrap">
                    <div className="margin-left-2 flex-container flex-start-h padding-right-left-2">
                        <div>Turbine&nbsp;&nbsp;</div>
                        <div>
                            <Select
                                name="form-field-name"
                                value="90249"
                                options={this.state.categoriesDropdown}
                                onChange={this.logChange}
                            />
                        </div>
                        <div>&nbsp;&nbsp;compared to Turbine&nbsp;&nbsp;</div>
                        <div>
                            <Select
                                name="form-field-name"
                                value="90244"
                                options={this.state.categoriesDropdown}
                                onChange={this.logChange}
                            />
                        </div>
                    </div>
                    <div className="flex-container-nowrap">
                        <div className="margin-right-small col-sm-4">
                            <FormGroup>
                                <ControlLabel>From</ControlLabel>
                                <DatePicker
                                    id="example-datepicker"
                                    value={this.state.initialDate}
                                    onChange={this.handleDateChangeInitial}
                                    showClearButton={false}
                                    dateFormat="DD/MM/YYYY"/>
                                {/* <HelpBlock>Help</HelpBlock>*/}
                            </FormGroup>
                        </div>
                        <div className="col-sm-4">
                            <FormGroup>
                                <ControlLabel>To</ControlLabel>
                                <DatePicker
                                    id="example-datepicker"
                                    value={this.state.finalDate}
                                    onChange={this.handleDateChangeFinal}
                                    showClearButton={false}
                                    dateFormat="DD/MM/YYYY"/>
                                {/*<HelpBlock>Help</HelpBlock>*/}
                            </FormGroup>
                        </div>
                        <div className="col-sm-4 date-go-button">
                            <button onClick={this.reloadGraphs} className="btn btn-success">Go</button>
                        </div>
                    </div>
                    {/*<div className="flex-container-nowrap">
                        <DateRangePicker
                            {...this.props}
                            onDatesChange={this.onDatesChange}
                            onFocusChange={this.onFocusChange}
                            focusedInput={focusedInput}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>*/}
                    {/*<div></div>*/}
                </div><br/><br/>
                <div className="">
                    <div></div>
                    <div>
                        {(this.state.plot4X1.length > 0) ? (
                                <div className="wrapper charts-wrapper">
                                    <div className="flex-container flex-sb-h flex-start-v row" id="analyze-anomalies">
                                        <div className="col-xl-4 col-lg-6">
                                            <div style={margins}>
                                                <div>
                                                    <ButtonToolbar>
                                                        <DropdownButton bsSize="default" title="Current_2" id="dropdown-size-large">
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(1, 1)} eventKey="1">Current_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(1, 2)} eventKey="2">Active_power_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(1, 3)} eventKey="3">Hydraulic_pressure_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(1, 4)} eventKey="3">gear_bearing1_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(1, 5)} eventKey="3">Abs._wind_direct._2</MenuItem>
                                                            <MenuItem eventKey="3">Active_power_2</MenuItem>
                                                        </DropdownButton>
                                                    </ButtonToolbar>
                                                </div><br/><br/>
                                                <Anamoly
                                                    x1= {this.state.plot1X1}
                                                    y1= {this.state.plot1Y1}
                                                    x2= {this.state.plot1X2}
                                                    y2= {this.state.plot1Y2}
                                                    name= 'plot1'
                                                    initialDate= {this.state.initialDate}
                                                    finalDate= {this.state.finalDate}
                                                    type="scatter"
                                                />
                                            </div>
                                            <div style={margins}>
                                                <div>
                                                    <ButtonToolbar>
                                                        <DropdownButton bsSize="default" title="Active_power_2" id="dropdown-size-large">
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(2, 1)} eventKey="1">Current_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(2, 2)} eventKey="2">Active_power_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(2, 3)} eventKey="3">Hydraulic_pressure_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(2, 4)} eventKey="3">gear_bearing1_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(2, 5)} eventKey="3">Abs._wind_direct._2</MenuItem>
                                                        </DropdownButton>
                                                    </ButtonToolbar>
                                                </div><br/><br/>
                                                <Anamoly
                                                    x1= {this.state.plot2X1}
                                                    y1= {this.state.plot2Y1}
                                                    x2= {this.state.plot2X2}
                                                    y2= {this.state.plot2Y2}
                                                    name= 'plot2'
                                                    initialDate= {this.state.initialDate}
                                                    finalDate= {this.state.finalDate}
                                                    type="scatter"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-6">
                                            <div style={margins}>
                                                <div>
                                                    <ButtonToolbar>
                                                        <DropdownButton bsSize="default" title="Temp.gear_bearing1_2" id="dropdown-size-large">
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(3, 1)} eventKey="1">Current_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(3, 2)} eventKey="2">Active_power_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(3, 3)} eventKey="3">Hydraulic_pressure_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(3, 4)} eventKey="3">gear_bearing1_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(3, 5)} eventKey="3">Abs._wind_direct._2</MenuItem>
                                                        </DropdownButton>
                                                    </ButtonToolbar>
                                                </div><br/><br/>
                                                <Anamoly
                                                    x1= {this.state.plot3X1}
                                                    y1= {this.state.plot3Y1}
                                                    x2= {this.state.plot3X2}
                                                    y2= {this.state.plot3Y2}
                                                    name= 'plot3'
                                                    initialDate= {this.state.initialDate}
                                                    finalDate= {this.state.finalDate}
                                                    type="scatter"
                                                />
                                            </div>
                                            <div style={margins}>
                                                <div>
                                                    <ButtonToolbar>
                                                        <DropdownButton bsSize="default" title="Abs._wind_direct._2" id="dropdown-size-large">
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(4, 1)} eventKey="1">Current_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(4, 2)} eventKey="2">Active_power_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(4, 3)} eventKey="3">Hydraulic_pressure_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(4, 4)} eventKey="3">gear_bearing1_2</MenuItem>
                                                            <MenuItem onSelect={() => this.onSelectMenuItem(4, 5)} eventKey="3">Abs._wind_direct._2</MenuItem>
                                                        </DropdownButton>
                                                    </ButtonToolbar>
                                                </div><br/><br/>
                                                <Anamoly
                                                    x1= {this.state.plot4X1}
                                                    y1= {this.state.plot4Y1}
                                                    x2= {this.state.plot4X2}
                                                    y2= {this.state.plot4Y2}
                                                    name= 'plot4'
                                                    initialDate= {this.state.initialDate}
                                                    finalDate= {this.state.finalDate}
                                                    type="scatter"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="details-block">
                                        <div className="title">DETAILS</div><br/>
                                        <table className="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <td>Date</td>
                                                <td>20 Jan 2017</td>
                                            </tr>
                                            <tr>
                                                <td>Root Cause</td>
                                                <td>Oil starvation</td>
                                            </tr>
                                            <tr>
                                                <td>TCC Comment</td>
                                                <td>Inspect Gear oil pump and conduct oil endoscopy</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        {/*<div className="heading-title">Troubleshoot</div><br/>
                                         <div className="links">
                                         <div>
                                         <Link className='btn-link' to="#">Link1</Link>
                                         </div><br/>
                                         <div>
                                         <Link className='btn-link' to="#">Link2</Link>
                                         </div>
                                         </div>*/}
                                    </div>
                                </div>
                            ) : null}

                    </div>
                </div>
                <ModalPopup closePopup={this.closePopup} show={this.state.showPopup}/>
            </div>
        );
    }
}



class ModalPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popupDescription: "",
            popupPotentialSymptoms: "",
            popupDegree: ""
        }

        this.onChange = this.onChange.bind(this);
    }


    onChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {

        return(
                <Modal
                    show={this.props.show}
                    onHide={this.props.closePopup}
                    container={this}
                    aria-labelledby="contained-modal-title">

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Create Service Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="login-form">
                            <form onSubmit={this.onSubmit} id="login-form" className="text-left">
                                <div className="sign-in-htm">
                                    <div className="form-group">
                                        <label htmlFor="popupDescription" className="text-left">Description</label>
                                        <input
                                            type="text"
                                            className="input-custom form-control"
                                            value={this.state.popupDescription}
                                            onChange={this.onChange}
                                            id="lgUsername"
                                            name="popupDescription"
                                            placeholder="Description"/>
                                        {/*{errors.lgUsername && <span className="help-block">{errors.lgUsername}</span>}*/}
                                    </div><br/>
                                    <div className="form-group">
                                        <label htmlFor="popupPotentialSymptoms" className="text-left">Potential Symptoms</label>
                                        <input type="text"
                                               className="input-custom form-control"
                                               value={this.state.popupPotentialSymptoms}
                                               onChange={this.onChange}
                                               id="lgPassword"
                                               name="popupPotentialSymptoms"
                                               placeholder="Potential Symptoms"/>
                                        {/*{errors.lgPassword && <span className="help-block">{errors.lgPassword}</span>}*/}
                                    </div><br/>
                                    <div className="form-group">
                                        <label htmlFor="popupPotentialSymptoms" className="text-left">Degree</label>
                                        <ButtonToolbar>
                                            <DropdownButton bsSize="default" title="Select..." id="dropdown-size-large">
                                                <MenuItem onSelect={() => this.onSelectMenuItem(1, 1)} eventKey="1">1</MenuItem>
                                                <MenuItem onSelect={() => this.onSelectMenuItem(1, 2)} eventKey="2">2</MenuItem>
                                                <MenuItem onSelect={() => this.onSelectMenuItem(1, 3)} eventKey="3">3</MenuItem>
                                                <MenuItem onSelect={() => this.onSelectMenuItem(1, 4)} eventKey="3">4</MenuItem>
                                                <MenuItem onSelect={() => this.onSelectMenuItem(1, 5)} eventKey="3">5</MenuItem>
                                            </DropdownButton>
                                        </ButtonToolbar>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.closePopup}>Cancel</Button>
                        <Button bsStyle="success" onClick={this.props.closePopup}>Create</Button>
                    </Modal.Footer>
                </Modal>
        )
    }
}

export default App2;
