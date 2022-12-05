import React from 'react';
import InstructionsCss from '../../../public/styles/containers/admin/Instructions.css';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import ReactCookie from 'react-cookie';
import ToggleDisplay from 'react-toggle-display';
import _ from 'underscore';



import FaPlus from 'react-icons/lib/fa/plus-circle';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';

class ApproveStatusCodes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            instructions_data: [],
            user: ReactCookie.load('user'),
            title: "Instructions Approvals",
            toggleButtonText : 'Create Instructions',
            toggleButtonIcon : <FaPlus/>,
            viewType : "table",
            row: {solution:[]},
            showPopup: false,
            crossImage: require('../../../public/images/icons/cross-red-circular-button.svg'),
            tickImage: require('../../../public/images/icons/checked.svg')

        };
        this.toggleInstructionsView = this.toggleInstructionsView.bind(this);
        this.setTableData = this.setTableData.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    componentDidMount() {
        var self = this;
        var user_id = this.state.user.user_id;
        axios.get('/api/tcc/solution/getAll')
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

        return <div className="">
            <button type="button"
                    id="approve-steps"
                    onClick={() => {this.showSolutionPopup(row, 1)}}
                    className="btn btn-sm btn-default">
                View Details
            </button>
        </div>

    }


    actionOnSolution(row, index) {
        var self = this;
        var date = new Date();
        date = date.getTime()
        let data = {
            approved_by: ReactCookie.load('user').user_id,
            approved_at: date,
            approved: true,
            id: row.id
        }

        console.log(data);
        if(index == 1) {
            data.approved = true;
             axios.post('/api/tcc/solution/approval', 'data='+JSON.stringify(data))
             .then(function(response) {
             console.log(response.data.data);
                 self.setTableData(response.data.data);
                 self.setState({instructions_data: response.data.data});
             }).catch(function(err) {
             console.log(err);
             window.alert("Faliure "+err);
             });
        } else {
            data.approved = false;
            axios.post('/api/tcc/solution/approval', 'data='+JSON.stringify(data))
                .then(function(response) {
                    console.log(response.data.data);
                    self.setTableData(response.data.data);
                    self.setState({instructions_data: response.data.data});
                }).catch(function(err) {
                console.log(err);
                window.alert("Faliure "+err);
            });
        }
    }


    buttonFunction(cell, row) {
        if(row.approved == null) {
            return <div className="">
                <div className="flex-container flex-start-h">
                    <div onClick={() => {this.actionOnSolution(row, 1)}}>
                        {/* <FaCheck className="confirm-icons tick"/>*/}
                        <img onMouseEnter={() => this.changeChatButtonsMouseIn('tick')} src={this.state.tickImage} width='20px'/>
                    </div>&nbsp;&nbsp;
                    <div onClick={() => {this.actionOnSolution(row, 2)}}>
                        <img onMouseEnter={() => this.changeChatButtonsMouseIn('cross')} src={this.state.crossImage} width='20px'/>
                    </div>
                </div>
            </div>
        }
    }


    render() {

        function priceFormatter(cell, row) {
            return ""+cell;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
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
            <div className="instructions-container body-wrapper" id="create-view-instructions"><br/><br/>
                <div className="flex-container flex-sb-h">
                    {/*<div className="heading-title">{this.state.title}</div>*/}
                    <div className="btn-group" role="group">
                    </div>
                </div>
                    <div className="table-container">
                        <BootstrapTable data={this.state.instructions_data} striped={false} hover={true}>
                            <TableHeaderColumn width="100" dataField="id" isKey={true} dataAlign="center" dataSort={true}>Cause ID</TableHeaderColumn>
                            <TableHeaderColumn width="100" dataField="cause" dataSort={true}>Cause</TableHeaderColumn>
                            <TableHeaderColumn width="100" dataField="system" dataSort={true}>System</TableHeaderColumn>
                            <TableHeaderColumn width="100" dataField="created_at" dataFormat={priceFormatter}>Created At</TableHeaderColumn>
                            <TableHeaderColumn width="100" dataField="approved" dataFormat={statusFormatter}>Status</TableHeaderColumn>
                            <TableHeaderColumn width="100" dataField="solution" dataFormat={this.showSolutions.bind(this)}>Show Details</TableHeaderColumn>
                            <TableHeaderColumn width="100" dataField="approval" dataFormat={this.buttonFunction.bind(this)}>Approve/Reject</TableHeaderColumn>
                        </BootstrapTable>
                    </div>

                <ModalPopup closePopup={this.closePopup} row={this.state.row} show={this.state.showPopup}/>
            </div>
        )
    }
}


class ModalPopup extends React.Component {

    render() {
        let close = () => this.props.show = false;

        var steps = [];

        for(var i=0; i< this.props.row.solution.length; i++) {
            steps.push(<Steps row={this.props.row} stepCount={i+1} solutionStep={this.props.row.solution[i]}/>)
        }

        return(
            <div className="modal-container" style={{height: 200}}>
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
            </div>
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


export default ApproveStatusCodes