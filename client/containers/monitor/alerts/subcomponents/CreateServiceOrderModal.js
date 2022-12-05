import React from 'react';
import axios from 'axios';
import { Modal, Button, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'underscore';
import CreateServiceOrderCss from '../../../../../public/styles/containers/analyze/CreateServiceOrderModel.css'
import VirtualizedSelect from 'react-virtualized-select'
import createFilterOptions from 'react-select-fast-filter-options'

class ModalPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popupStatusCode: [],
            popupDescription: "",
            popupOrderId: "",
            popupTurbineId: localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert).turbine_id : '90983',
            popupSelectedAlert: localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert) : {id:"14",alerts:"Rotor Bearing Temperature",priority:"High",farm_name:"St. Robert Bellarmin",turbine_id:"91690",model:"MM",date_identified:"2016-04-30T18:30:00.000Z",date_resolved:null,category:"Category 1",source:"PDM",status:0,resolved_by:null,resolved_at:null,type_of_chart:"1"},
            popupPotentialSymptoms: "",
            popupDegree: "",
            statusCodes: [],
            selectedChips: [],
            searchItems: [],
            statusCodesLoading: false,
            searchItemsLoading: false,
            placeholder: "sdfsdfsdfsdf",
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.searchInputChanged = this.searchInputChanged.bind(this);
        this.selectBoxChanged = this.selectBoxChanged.bind(this);
        this.statusCodesBoxChanged = this.statusCodesBoxChanged.bind(this);
        this.statusCodeSearchInputChanged = this.statusCodeSearchInputChanged.bind(this);
    }

    componentDidMount() {
        this.statusCodeSearchInputChanged();
        this.searchInputChanged();
    }




    statusCodeSearchInputChanged() {
        this.setState({statusCodesLoading: true})

        var query = ' ';
        var self = this;
        axios.get('/api/technician/recommend/searchbar/statuscode?q='+query)
            .then(function(response) {
                var data = response.data.data;
                var dataObject = [];
                for(let i=0; i<data.length; i++) {
                    dataObject.push({
                        value: data[i]['value'],
                        label: data[i]['label']
                        //label: data[i]._fields[0]
                    })
                }
                self.setState({statusCodes: dataObject, statusCodesLoading: false})
            }).catch(function(err) {
            window.alert("Faliure "+err);
        });
    }


    searchInputChanged() {

        this.setState({searchItemsLoading: true})

        var query = ' ';
        var self = this;
        axios.get('/api/technician/recommend/searchbar?q='+query)
            .then(function(response) {
                var data = response.data.data;
                var dataObject = [];
                for(let i=0; i<data.length; i++) {
                    dataObject.push({
                        value: data[i]['value'],
                        label: data[i]['label']
                        //label: data[i]._fields[0]
                    })
                }
                self.setState({searchItems: dataObject, searchItemsLoading: false})
            }).catch(function(err) {
            window.alert("Faliure "+err);
        });
    }

    selectBoxChanged(object) {
        this.setState({selectedChips: object});
    }

    statusCodesBoxChanged(object) {
        console.log(object);
        this.setState({popupStatusCode: object});
    }


    onSubmit(e) {
        e.preventDefault();

        var orderId = "US"+Math.floor(Math.random()*900) + 100;

        var self = this;
        let statusCodes = _.map(self.state.popupStatusCode, function(item) {
            return item.label;
        })

        var data = {
            order_id: orderId,
            id: self.state.popupSelectedAlert.id,
            status: 2,
            recommended_observations: self.state.selectedChips,
            turbine_id: Number(self.state.popupTurbineId),
            description: self.state.popupDescription,
            status_codes: statusCodes,
            order_status: 0,
            approval_status: null,
            submission_status: false
        };

        console.log(data);

        axios.post('/api/service_order/create', 'data='+JSON.stringify(data))
            .then(function(response) {
                console.log(response);
                self.props.closePopup();
                self.setState({
                    selectedChips: [],
                    popupStatusCode: []
                });
            }).catch(function(err) {
            console.log(err);
            console.log("Some error occured");
        });

    }


    onChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        let options = this.state.statusCodes;
        const filterOptionsStatus = createFilterOptions({options});
        options = this.state.searchItems;
        const filterOptionsRecommendation = createFilterOptions({options});
        return(
            <form onSubmit={this.onSubmit} id="status-order-create" className="text-left create-service-order-container">
                <Modal
                    show={this.props.show}
                    onHide={this.props.closePopup}
                    container={this}
                    aria-labelledby="contained-modal-title">

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Create New Service Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="status-order-form font-12">
                            <div className="alerts-info flex-container flex-sb-h">
                                <div className="flex-container">
                                    <div className="bold">Alert&nbsp;:&nbsp;</div>
                                    <div>{this.state.popupSelectedAlert.alerts}</div>
                                </div>
                                <div className="flex-container">
                                    <div className="bold">Farm&nbsp;:&nbsp;</div>
                                    <div>{this.state.popupSelectedAlert.farm_name}</div>
                                </div>
                                <div className="flex-container">
                                    <div className="bold">Turbine Number&nbsp;:&nbsp;</div>
                                    <div>{this.state.popupSelectedAlert.turbine_id}</div>
                                </div>
                                <div className="flex-container">
                                    <div className="bold">Country&nbsp;:&nbsp;</div>
                                    <div>Canada</div>
                                </div>
                                <div className="flex-container">
                                    <div className="bold">Created By&nbsp;:&nbsp;</div>
                                    <div>John</div>
                                </div>

                            </div><br/><br/>
                            <div className="sign-in-htm">
                                <form>
                                    {/*<div className="form-group">
                                        <label htmlFor="popupStatusCode" className="text-left">Status Code</label>
                                        <input
                                            type="text"
                                            className="input-custom form-control"
                                            value={this.state.popupStatusCode}
                                            onChange={this.onChange}
                                            id="lgUsername"
                                            name="popupStatusCode"
                                            placeholder="Status Code"/>
                                        /!*{errors.lgUsername && <span className="help-block">{errors.lgUsername}</span>}*!/
                                    </div><br/>*/}
                                    <div className='form-group'>
                                        <label htmlFor="popupStatusCode" className="text-left">Status Code</label>
                                        <VirtualizedSelect
                                            filterOptions={ filterOptionsStatus }
                                            multi
                                            name="popupStatusCode"
                                            value={this.state.popupStatusCode}
                                            placeholder= "Select Status Codes"
                                            options={this.state.statusCodes}
                                            isLoading={this.state.statusCodesLoading}
                                            onChange={this.statusCodesBoxChanged}
                                        />
                                    </div><br/>
                                    <div className="form-group">
                                        <label htmlFor="popupDescription" className="text-left">Description</label>
                                        <textarea
                                            type="text"
                                            className="input-custom form-control"
                                            value={this.state.popupDescription}
                                            onChange={this.onChange}
                                            id="lgUsername"
                                            name="popupDescription"
                                            placeholder="Description"/>
                                        {/*{errors.lgUsername && <span className="help-block">{errors.lgUsername}</span>}*/}
                                    </div><br/>
                                    <div className='form-group'>
                                        <label htmlFor="search" className="text-left">Recommend Observations</label>
                                        <VirtualizedSelect
                                            filterOptions = {filterOptionsRecommendation}
                                            multi
                                            name="search"
                                            value={this.state.selectedChips}
                                            placeholder= "Select Recommendations"
                                            options={this.state.searchItems}
                                            isLoading={this.state.searchItemsLoading}
                                            onChange={this.selectBoxChanged}
                                        />
                                    </div>

                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.closePopup}>Cancel</Button>
                        <Button type="submit" bsStyle="success">Create</Button>
                    </Modal.Footer>
                </Modal>
            </form>
        )
    }
}

export default ModalPopup