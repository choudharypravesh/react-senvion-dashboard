import React from 'react';
import axios from 'axios';
import { Modal, Button, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'underscore';
import ReactCookie from 'react-cookie'
import CreateServiceOrderCss from '../../../public/styles/containers/analyze/CreateServiceOrderModel.css'
import VirtualizedSelect from 'react-virtualized-select'
import createFilterOptions from 'react-select-fast-filter-options'
import { connect } from 'react-redux'
import {errorMessage} from './CreateServiceOrderActions'
import {    getSearchInputChange,
            changeCountryAndGetFarms,
            selectFarmSOAndCallNextAction,
            getTurbinesListCsr,
            statusCodeSearchInputChanged,
            selectStatusCode,
            onChangeText,
            selectRecommendedObservations,
            emptyFormFields, showHidePopup,getFarmsAndTurbinesList} from '../../../client/actions/AppActions'

import {selectTurbine} from './CreateServiceOrderActions'

import { getOrdersForTechnician } from '../../containers/service_assist/order_list_view/OrderListActions'

import searchIcon from '../dropdownSearchIcon/DropdownSearchIcon'

class ModalPopup extends React.Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.selectBoxChanged = this.selectBoxChanged.bind(this);
        this.statusCodesBoxChangedCountry = this.statusCodesBoxChangedCountry.bind(this);
        this.statusCodesBoxChangedFarm = this.statusCodesBoxChangedFarm.bind(this);
        this.statusCodesBoxChangedTurbine = this.statusCodesBoxChangedTurbine.bind(this);
        this.searchInputChanged = this.searchInputChanged.bind(this);
        this.statusCodesBoxChanged = this.statusCodesBoxChanged.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.showPopup = this.showPopup.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(statusCodeSearchInputChanged());
        dispatch(getSearchInputChange());
        if(!(this.props.turbinesList && this.props.turbinesList[1])){
            dispatch(getFarmsAndTurbinesList());
        }
    }

    selectBoxChanged(object) {
        const {dispatch} = this.props;
        dispatch(selectRecommendedObservations(object));
    }

    statusCodesBoxChangedCountry(object) {
        let value = object && object.country_id ? object.country_id : ""
        console.log(object);
        const {dispatch} = this.props;
        dispatch(changeCountryAndGetFarms(value));
    }

    statusCodesBoxChangedFarm(object) {
        let value = object && object.wind_farm ? object.wind_farm : ""
        const {dispatch} = this.props;
        dispatch(selectFarmSOAndCallNextAction(value, [getTurbinesListCsr]));
    }

    statusCodesBoxChangedTurbine(object) {
        console.log(object);
        let value = object && object.value ? object.value : ""
        const {dispatch} = this.props;
        dispatch(selectTurbine(value));
    }

    statusCodesBoxChanged(object) {
        const {dispatch} = this.props;
        dispatch(selectStatusCode(object));
    }

    searchInputChanged() {
        const {dispatch} = this.props
        dispatch(getSearchInputChange());
    }

    onChange(e) {
        const {dispatch} = this.props;
        dispatch(onChangeText(e));
    }

    closePopup(e) {
        document.body.style.overflow = 'inherit'
        const {dispatch} = this.props;
        dispatch(showHidePopup(false))
        /*this.setState({showPopup: false})*/
    }

    showPopup() {
        document.body.style.overflow = 'hidden'
        const {dispatch} = this.props;
        dispatch(showHidePopup(true,"","", false))
    }


    onSubmit(e) {
        e.preventDefault();

        var orderId = "US"+Math.floor(Math.random()*900) + 100;

        var self = this;
        const {dispatch} = this.props;
        let statusCodes = _.map(self.props.popupStatusCode, function(item) {
            return item.label;
        })

        let selectedAlert = localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert) : {id:"14",alerts:"Rotor Bearing Temperature",priority:"High",farm_name:"St. Robert Bellarmin",turbine_id:"91690",model:"MM",date_identified:"2016-04-30T18:30:00.000Z",date_resolved:null,category:"Category 1",source:"PDM",status:0,resolved_by:null,resolved_at:null,type_of_chart:"1"}

        var data = {
            order_id: orderId,
            id: selectedAlert.id,
            status: 2,
            recommended_observations: self.props.selectedChips,
            turbine_id: Number(self.props.selectedTurbine.split(",")[2]),
            description: self.props.popupDescription,
            status_codes: statusCodes,
            order_status: 0,
            approval_status: null,
            submission_status: false
        };

        debugger;


        if(self.props.selectedTurbine.length > 0
            && self.props.popupStatusCode.length > 0
            && self.props.popupDescription.length > 0
            && self.props.selectedChips.length > 0) {

            axios.post('/api/service_order/create', 'data='+JSON.stringify(data))
                .then(function(response) {
                    console.log(response);
                    dispatch(emptyFormFields());
                    dispatch(getOrdersForTechnician());
                    document.getElementById('success-message').innerHTML = "&nbsp;New Service Order Created with Order ID - "+response.data.data.order_id;

                    // self.props.closePopup()
                }).catch(function(err) {
                console.log(err);
                console.log("Some error occured");
            });
        } else {
            dispatch(errorMessage(true));
        }


    }

    render() {
        let options = this.props.turbinesList;
        const filterOptionsTurbines = createFilterOptions({options});
        options = this.props.statusCodes;
        const filterOptionsStatus = createFilterOptions({options});
        options = this.props.searchItems;
        const filterOptionsRecommendation = createFilterOptions({options});
        return(
            <form onSubmit={this.onSubmit}
                  role="form"
                  action="api/post/user/setting"
                  method="post" encType="multipart/form-data"
                  id="global-status-order-create"
                  className="text-left create-service-order-container">
                <Modal
                    show={this.props.showHidePopup}
                    onHide={this.closePopup}
                    container={this}
                    aria-labelledby="contained-modal-title">

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Create New Service Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="status-order-form font-12">
                            <div className="alerts-info flex-container flex-sb-h">
                                <div className="flex-container">
                                    <div className="bold">Created By&nbsp;:&nbsp;</div>
                                    <div>{ReactCookie.load('user').user_name}</div>
                                </div>
                            </div><br/><br/>
                            <div className="sign-in-htm">
                                <div>
                                    <div className="flex-container-nowrap flex-sb-h horizontal-dropdowns">
                                        {/*<div className='form-group'>
                                            <label htmlFor="popupStatusCode" className="text-left">Alert</label>
                                            <input
                                                placeholder="Alert ID"
                                                value={this.props.alert_id}
                                                onChange={this.onChange}
                                                type="text"
                                                className="form-control"
                                                name="alert_id"
                                                id="alert_id"
                                                size="10"/>
                                        </div><br/>*/}
                                        <div className='form-group'>
                                            <label htmlFor="popupStatusCode" className="text-left">Turbine Number<span className="red">&nbsp;*</span></label>
                                            <VirtualizedSelect
                                                filterOptions={ filterOptionsTurbines }
                                                arrowRenderer = {searchIcon}
                                                className = "farm-select"
                                                name="popupStatusCode"
                                                value={this.props.selectedTurbine}
                                                placeholder= "Select Turbine Number"
                                                options={this.props.turbinesList}
                                                isLoading={this.props.statusCodesLoading}
                                                onChange={this.statusCodesBoxChangedTurbine}
                                                disabled = {this.props.disablePopupFarmSelection}
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <div className='form-group'>
                                        <label htmlFor="popupStatusCode" className="text-left">Status Code<span className="red">&nbsp;*</span></label>
                                        <VirtualizedSelect
                                            filterOptions={ filterOptionsStatus }
                                            multi
                                            name="popupStatusCode"
                                            value={this.props.popupStatusCode}
                                            placeholder= "Select Status Codes"
                                            options={this.props.statusCodes}
                                            isLoading={this.props.statusCodesLoading}
                                            onChange={this.statusCodesBoxChanged}
                                            disabled = {this.props.status}
                                        />
                                    </div><br/>
                                    <div className="form-group">
                                        <label htmlFor="popupDescription" className="text-left">Description<span className="red">&nbsp;*</span></label>
                                        <textarea
                                            type="text"
                                            className="input-custom form-control"
                                            value={this.props.popupDescription}
                                            onChange={this.onChange}
                                            id="lgUsername"
                                            name="popupDescription"
                                            placeholder="Description"/>
                                        {/*{errors.lgUsername && <span className="help-block">{errors.lgUsername}</span>}*/}
                                    </div><br/>
                                    <div className='form-group'>
                                        <label htmlFor="search" className="text-left">Recommend Observations<span className="red">&nbsp;*</span></label>
                                        <VirtualizedSelect
                                            filterOptions = {filterOptionsRecommendation}
                                            multi
                                            name="search"
                                            value={this.props.selectedChips}
                                            placeholder= "Select Recommendations"
                                            options={this.props.searchItems}
                                            isLoading={this.props.searchItemsLoading}
                                            onChange={this.selectBoxChanged}
                                            onInputChange={this.searchInputChanged}
                                            disabled = {this.props.status}
                                        />
                                    </div><br/>
                                    <div className="form-group">
                                        <label className="text-left" htmlFor="upload-picture">Upload Document</label>
                                        <div className="">
                                            <div>
                                                <input type="file" className="form-control-file" onChange={this.onChange} name="photo" id="photo"/>
                                                <small id="fileHelp" className="form-text text-muted">Upload necessary documents</small>
                                            </div>
                                        </div>
                                    </div><br/>
                                    {(!this.props.setErrorMessage && this.props.showSuccessMessage) ? (
                                            <div className="alert alert-success">
                                                <strong>Success!</strong>
                                                <span id="success-message"></span>
                                            </div>
                                        ) : null}
                                    {(this.props.setErrorMessage && !this.props.showSuccessMessage) ? (
                                            <div className="alert alert-danger">
                                                <strong>Alert! </strong>
                                                <span id="danger-message">&nbsp;Please fill all the mandatory fields before continuing.</span>
                                            </div>
                                        ) : null}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.closePopup}>Cancel</Button>
                        {
                            !this.props.status?<Button type="submit" bsStyle="success">Create</Button>:""
                        }

                    </Modal.Footer>
                </Modal>
            </form>
        )
    }
}

const mapStateToProps = state => {
    const { CreateServiceOrderReducer,TurbineFarmList } = state
    let serviceOrderData = {
        selectedTurbine : CreateServiceOrderReducer.get('selectedTurbine'),
        statusCodes : CreateServiceOrderReducer.get('statusCodes'),
        statusCodesLoading : CreateServiceOrderReducer.get('statusCodesLoading'),
        popupStatusCode : CreateServiceOrderReducer.get('popupStatusCode'),
        searchItems : CreateServiceOrderReducer.get('searchItems'),
        selectedChips : CreateServiceOrderReducer.get('selectedChips'),
        popupDescription : CreateServiceOrderReducer.get('popupDescription'),
        showHidePopup : CreateServiceOrderReducer.get('showHidePopup'),
        searchItemsLoading : CreateServiceOrderReducer.get('searchItemsLoading'),
        showSuccessMessage : CreateServiceOrderReducer.get('showSuccessMessage'),
        turbinesList : TurbineFarmList.get('turbinesList'),
        status : CreateServiceOrderReducer.get('status'),
        disablePopupFarmSelection: CreateServiceOrderReducer.get('disablePopupFarmSelection'),
        setErrorMessage: CreateServiceOrderReducer.get('setErrorMessage')
    }
    return serviceOrderData
};

export default connect(mapStateToProps, null, null, { withRef: true })(ModalPopup);
