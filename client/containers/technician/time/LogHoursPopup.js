import React from 'react';
import axios from 'axios';
import { Modal, Button, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import LogHoursPopupCss from '../../../../public/styles/containers/technician/LogHoursPopup.css'


class ModalPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            week: [{
                label: "1",
                value: "1"
            },{
                label: "2",
                value: "2"
            },{
                label: "3",
                value: "3"
            },{
                label: "4",
                value: "4"
            },{
                label: "5",
                value: "5"
            },{
                label: "6",
                value: "6"
            },{
                label: "7",
                value: "7"
            }]
        }
    }

    componentDidMount() {

    }



    onChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {

        return(
            <form onSubmit={this.onSubmit} id="status-order-create" className="text-left loghours-popup-container">
                <Modal
                    show={this.props.show}
                    onHide={this.props.closePopup}
                    container={this}
                    aria-labelledby="contained-modal-title">

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Log Hours</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form className="form-inline">
                            <div className="form-group">
                                <label>Employee Name</label>
                                <div className="">John</div>
                            </div>
                            <div className="form-group">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className="form-group">
                                <label>Employee ID</label>
                                <div className="">E1022563</div>
                            </div>
                            <div className="form-group">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className="form-group">
                                <label>Supervisor Name</label>
                                <div className="">Niranjan</div>
                            </div>
                            <div className="form-group">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className="form-group">
                                <label>Month</label>
                                <div className="">April</div>
                            </div>
                            <div className="form-group">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className="form-group">
                                <label>Week</label>
                                <div className="">17th</div>
                            </div>
                            <div className="form-group">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className="form-group">
                                <label>Select Week</label>
                                <Select
                                    name="form-field-name"
                                    value="1"
                                    options={this.state.week}
                                    onChange={this.logChangeTurbine1}
                                    clearable={false}
                                />
                            </div>
                        </form><br/><br/>



                        <table className="table">
                            <thead>
                                <th></th>
                                <th>Order No./Description</th>
                                <th>Start Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Duration (hrs)</th>
                                <th>Travel Time</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Sunday</td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                    <td><input type="text" className="form-control" /></td>
                                </tr>
                            </tbody>
                        </table>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.closePopup}>Cancel</Button>
                        <Button type="submit" bsStyle="success">Log Hour</Button>
                    </Modal.Footer>
                </Modal>
            </form>
        )
    }
}

export default ModalPopup