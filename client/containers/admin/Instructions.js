import React from 'react';
import InstructionsCss from '../../../public/styles/containers/admin/Instructions.css';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import ReactCookie from 'react-cookie';
import ToggleDisplay from 'react-toggle-display';
import GenerateStatuscodeSolutions from './GenerateStatuscodeSolutions';
import _ from 'underscore';


import FaPlus from 'react-icons/lib/fa/plus-circle';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';

class CreateInstructions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            instructions_data: [],
            user: ReactCookie.load('user'),
            title: "Instructions",
            toggleButtonText : 'Create Instructions',
            toggleButtonIcon : <FaPlus/>,
            viewType : "table",
            row: {solution:[]},
            showPopup: false
        };
        this.toggleInstructionsView = this.toggleInstructionsView.bind(this);
        this.setTableData = this.setTableData.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    componentDidMount() {
        var self = this;
        var user_id = this.state.user.user_id;
        axios.get('/api/admin/solution/getAll?user_id='+user_id)
            .then(function(response) {
                var data = response.data.data;
                console.log("this is the original data");
                console.log(data);
                self.setTableData(data);
                self.setState({instructions_data: data});
            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });
    }

    closePopup(e) {
        this.setState({showPopup: false})
    }

    setTableData(data) {
        let tableData = data;
        tableData = _.map(tableData, function(item) {
            console.log(item.created_at);
            let date = new Date(Number(item.created_at));
            console.log(date);
            date = date.toDateString();
            item.created_at = date;
            return item;
        })

        console.log(tableData);

    }

    toggleInstructionsView () {
        var self = this;
        if(this.state.viewType == 'table') {
            self.setState({title: 'Create Instructions' ,viewType: 'create', toggleButtonText: 'View Created Instructions', toggleButtonIcon: <FaChevronLeft/>});
        } else {
            self.setState({title: 'Instructions', viewType: 'table', toggleButtonText: 'Create Instructions', toggleButtonIcon: <FaPlus/>});
        }
    }


    showSolutionPopup(row) {
        console.log(row.solution);
        //this.state.steps.push(row.solution);
        this.setState({showPopup: true})
        this.setState({row: row})
    }



    showSolutions(cell, row) {

        return <div className="text-center">
            <button type="button"
                    id="approve-steps"
                    onClick={() => {this.showSolutionPopup(row, 1)}}
                    className="btn btn-sm btn-default">
                View Details
            </button>
        </div>

    }


    render() {


        var products = [{
            order_no: 101,
            status_code: 1001,
            turbine_location: "Maida1",
            turbine_number: 90974,
            wind_speed: "103m/s",
            date: "13th March 2017",
            comments: "Critical"
        },{
            order_no: 102,
            status_code: 1002,
            turbine_location: "Maida2",
            turbine_number: 90975,
            wind_speed: "103m/s",
            date: "13th March 2017",
            comments: "Critical"
        },{
            order_no: 103,
            status_code: 1003,
            turbine_location: "Maida3",
            turbine_number: 90976,
            wind_speed: "103m/s",
            date: "13th March 2017",
            comments: "Critical"
        },{
            order_no: 104,
            status_code: 1004,
            turbine_location: "Maida4",
            turbine_number: 90977,
            wind_speed: "103m/s",
            date: "13th March 2017",
            comments: "Critical"
        },{
            order_no: 105,
            status_code: 1005,
            turbine_location: "Maida5",
            turbine_number: 90979,
            wind_speed: "103m/s",
            date: "13th March 2017",
            comments: "Critical"
        }];

        function priceFormatter(cell, row) {
            return ""+cell;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        function buttonFormatter(cell, row) {
            return '<button class="btn btn-sm btn-default">View</button>'
        }

        function statusFormatter(cell, row) {
            console.log(cell);
            if(cell == null) {
                return '<span class="label label-default">Pending</span>';
            } else if(cell == true) {
                return '<span class="label label-success">Approved</span>'
            } else if(cell == false) {
                return '<span class="label label-danger">Rejected</span>'
            }
        }


        return(
            <div className="instructions-container body-wrapper" id="create-view-instructions">
                <div className="flex-container flex-sb-h">
                    <div className="heading-title"></div>
                    <div className="btn-group" role="group">
                        <button onClick={this.toggleInstructionsView} className="btn btn-success">{this.state.toggleButtonIcon}&nbsp;&nbsp;{this.state.toggleButtonText}</button>
                    </div>
                </div>
                <ToggleDisplay show={this.state.viewType == "table"}>
                    <div className="table-container">
                        <BootstrapTable data={this.state.instructions_data} striped={false} hover={true}>
                            <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Cause ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="cause" dataSort={true}>Cause</TableHeaderColumn>
                            <TableHeaderColumn dataField="system" dataSort={true}>System</TableHeaderColumn>
                            <TableHeaderColumn dataField="created_at" dataFormat={priceFormatter}>Created At</TableHeaderColumn>
                            <TableHeaderColumn dataField="approved" dataFormat={statusFormatter}>Status</TableHeaderColumn>
                            <TableHeaderColumn dataField="solution" dataFormat={this.showSolutions.bind(this)}>Show Details</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </ToggleDisplay>
                <ToggleDisplay  show={this.state.viewType == "create"}>
                    <GenerateStatuscodeSolutions/>
                </ToggleDisplay>

                <ModalPopup closePopup={this.closePopup} row={this.state.row} show={this.state.showPopup}/>
            </div>
        )
    }
}


class ModalPopup extends React.Component {

    render() {
        let close = () => this.props.show = false;

        var steps = [];
        var stepCount = 1;

        for(var i=0; i< this.props.row.solution.length; i++) {
            if(this.props.row.solution[i].length > 0) {
                steps.push(<Steps row={this.props.row} stepCount={stepCount} solutionStep={this.props.row.solution[i]}/>)
                stepCount++;
            }
        }

        return(

                <Modal
                    show={this.props.show}
                    onHide={this.props.closePopup}
                    container={this}
                    aria-labelledby="contained-modal-title">

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Solution Steps</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="control-group">
                            <label className="control-label">Observations</label>
                            <div className="controls readonly">
                                {this.props.row.observation}
                            </div>
                        </div><br/>
                        <div className="control-group">
                            <label className="control-label">Sub Systems</label>
                            <div className="controls readonly">
                                {this.props.row.sub_system}
                            </div>
                        </div><br/>
                        <div className="control-group">
                            <label className="control-label">Solution Steps</label>
                            <div className="controls readonly">
                                {steps}
                            </div>
                        </div><br/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.closePopup}>Close</Button>
                    </Modal.Footer>
                </Modal>

        )
    }
}


class Steps extends React.Component {
    render() {
        return(
            <div className="overflow-y-hidden">
                <div className="small-padding flex-container-nowrap flex-start-v flex-start-h">
                    <div>{this.props.stepCount}.&nbsp;&nbsp;</div>
                    <div>{this.props.solutionStep}</div>
                </div>
            </div>
        )
    }
}


export default CreateInstructions