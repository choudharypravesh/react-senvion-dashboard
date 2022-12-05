import React, {PropTypes} from 'react'
import update from 'react-addons-update'
import '../../../../public/styles/containers/admin/contracts/CreateContract.css'
import ReactDataGrid from 'react-data-grid'
import _ from 'lodash'
//import DatePicker from 'react-datepicker'
import classnames from 'classnames'
import FaMinus from 'react-icons/lib/fa/minus-circle'
import TextBox from '../../../components/Form/TextBox/TextBox';
import DropDown from '../../../components/Form/DropDown/DropDown';
import DatePicker from '../../../components/Form/DatePicker/DatePicker';
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons';
import moment from 'moment'
import { connect } from 'react-redux'
import Loader from '../../../components/Loader/Loader'
import {getSelectedContractData,addRowInSubContract} from '../../../actions/AppActions'
import {
        changeValue,
        postTurbineDetails,
        setContractNumber,
        setParkName,
        changeType,
        setNumberOfUnits,
        changeContractType,
        setHubHeight,
        changeGaranty,
        setCommissioningDate,
        setOperatingFrom,
        setContractEnd,
        setContractStart,
        changeRemuneration,
        changePGPossible,
        setAvailableFrom,
        setMaxPg,
        setPgFormula,
        setLgFormula,
        setBonusFormula,
        setAvailabilityRemarks,
        setValues, setContractData, setTurbineDetailsData, setRibbonSuccess} from './ContractActions';
class ContractForm extends React.Component {
    constructor(props) {
        super(props)
        let gridWidth = (window.innerWidth - 160) / 30;
        let gridWidth2 = (window.innerWidth - 160) / 12;
            this.columns1 = [
                {
                    key: 'tab',
                    name: 'Year',
                    width: 300
                },
                {
                    key: 'year_1',
                    name: '1',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_2',
                    name: '2',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_3',
                    name: '3',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_4',
                    name: '4',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_5',
                    name: '5',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_6',
                    name: '6',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_7',
                    name: '7',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_8',
                    name: '8',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_9',
                    name: '9',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_10',
                    name: '10',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_11',
                    name: '11',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_12',
                    name: '12',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_13',
                    name: '13',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_14',
                    name: '14',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_15',
                    name: '15',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_16',
                    name: '16',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_17',
                    name: '17',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_18',
                    name: '18',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_19',
                    name: '19',
                    editable: true,
                    width: gridWidth
                },
                {
                    key: 'year_20',
                    name: '20',
                    editable: true,
                    width: gridWidth
                }
            ];
            this.columns2 = [
                {
                    key: 'technical_place',
                    name: 'Technical Place',
                    editable: true,
                    width: gridWidth2
                },
                {
                    key: 'construction_number',
                    name: 'Construction Number',
                    editable: true,
                    width: gridWidth2
                },
                {
                    key: 'type',
                    name: 'Type',
                    editable: true,
                    width: gridWidth2
                },
                {
                    key: 'contract_type',
                    name: 'Contract Type',
                    editable: true,
                    width: gridWidth2
                },
                {
                    key: 'operating_from',
                    name: 'Operating From Date',
                    editable: true,
                    width: gridWidth2
                },
                {
                    key: 'commissioning',
                    name: 'Commissioning Date',
                    editable: true,
                    width: gridWidth2
                },
                {
                    key: 'contract_start',
                    name: 'Contract Start Date',
                    editable: true,
                    width: gridWidth2
                },
                {
                    key: 'contract_end',
                    name: 'Contract End Date',
                    editable: true,
                    width: gridWidth2
                },
                {
                    key: 'duration',
                    name: 'Duration',
                    editable: true,
                    width: gridWidth2
                }
            ];
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.rowGetterTurbines = this.rowGetterTurbines.bind(this);
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
        this.handleGridRowsUpdatedTurbines = this.handleGridRowsUpdatedTurbines.bind(this);
        this.handleAddRow = this.handleAddRow.bind(this);
        this.addSubContract = this.addSubContract.bind(this);
        this.removeSubContract = this.removeSubContract.bind(this);
        this.getForm = this.getForm.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    componentDidMount() {
        var self = this;
    }
    componentWillMount(){
        if(this.props.currentPage === 'contractForm'){
            const {dispatch} = this.props;
            this.props.mode === 'edit' && dispatch(getSelectedContractData(this.props.selectedContractId))
        }
    }
    onChange(e) {
        this.props.dispatch(setValues(e.currentTarget.name, e.currentTarget.value, this.props.currentPage))
    }

    handleAddRow({ newRowIndex }) {
        this.props.dispatch(addRowInSubContract())

    }


    onSubmit() {
        let self = this;
        this.props.dispatch(postTurbineDetails(this.props.TurbineDetails, this.props.mode));
        setTimeout(function() {
            self.props.dispatch(setRibbonSuccess(false))
        }, 3000)

    }



    rowGetter(i) {
        return this.props.yearDetails[i];
    }

    rowGetterTurbines(i) {
        if(this.props.TurbineDetails.length){
            return this.props.TurbineDetails[i];
        }
        return [{technical_place:""},{technical_place:""},{technical_place:""},{technical_place:""}][i];
    }

    handleGridRowsUpdated({ fromRow, toRow, updated }) {
        this.props.dispatch(setContractData(toRow, updated));
    }


    handleGridRowsUpdatedTurbines({ fromRow, toRow, updated }) {
        this.props.dispatch(setTurbineDetailsData(toRow, updated))
    }

    addSubContract() {
        var self = this;
        this.setState({totalSubcontracts: self.state.totalSubcontracts+1});
    }

    removeSubContract() {
        var self = this;
        if(this.state.totalSubcontracts > 1) {
            this.setState({totalSubcontracts: self.state.totalSubcontracts-1});
        }
    }
    changeValue(val, key){
        this.props.dispatch(changeValue({key, value: val}));
    }
    getForm(){
        let details = this.props.details;
        let TurbineDetails = this.props.TurbineDetails ? this.props.TurbineDetails : [{},{},{},{}];
        if(this.props.currentPage === 'subContractForm'){
            return (
                <div id="contract-edit-5">
                    <div className="heading-title">Turbine Details</div><hr/>
                    <div className="flex-container-nowrap flex-start-h">
                        <TextBox
                            isDisabled={true}
                            value={details.get('windparc')}
                            placeholder="PARC"
                            name="c_parc"
                        />

                        <TextBox
                            isDisabled={true}
                            value={details.get('contract')}
                            placeholder="Contract Number"
                            name="c_contract_number"
                        />

                        <div className="form-group"></div>
                    </div><br/><br/>


                    <ReactDataGrid
                        enableCellSelect={true}
                        headerRowHeight={80}
                        columns={this.columns2}
                        rowGetter={this.rowGetterTurbines}
                        rowsCount={TurbineDetails.length}
                        height={750}
                        minHeight={750}
                        toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
                        onGridRowsUpdated={this.handleGridRowsUpdatedTurbines} />
                </div>
            );
        }else{
            return(
                <div>
                    <div id="contract-edit-1">
                        <div className="heading-title">Farm Details</div><hr/>
                        <div className="flex-container-nowrap flex-sb-h">
                            <div className="col-xs-3">
                                <TextBox
                                    isDisabled={this.props.mode === 'edit' ? true : false}
                                    value={details.get('windparc')}
                                    onChange = {this.changeValue}
                                    placeholder="PARC"
                                    name="windparc"
                                />
                            </div>
                            <div className="col-xs-3">
                                <TextBox
                                    isDisabled={this.props.mode === 'edit' ? true : false}
                                    value={details.get('contract')}
                                    placeholder="Contract Number"
                                    onChange = {this.changeValue}
                                    name="contract"
                                />
                            </div>
                            <div className="col-xs-3">
                                <DropDown
                                    name="type"
                                    value={details.get('type')}
                                    options={this.props.typeList}
                                    onChange={this.changeValue}
                                    placeholder="Type"
                                />
                            </div>
                            <div className="col-xs-3">
                                <TextBox
                                    value={details.get('number_of_units')}
                                    onChange={this.changeValue}
                                    placeholder="Number of Units"
                                    name="number_of_units"
                                />
                            </div>
                        </div>

                        <div className="flex-container-nowrap flex-sb-h">
                            <div className="col-xs-3">
                                <TextBox
                                    value={details.get('hub_height')}
                                    onChange={this.changeValue}
                                    placeholder="Hub Height"
                                    name="hub_height"
                                />
                            </div>
                            <div className="col-xs-3">
                                <DropDown
                                    name="contract_type"
                                    value={details.get('contract_type')}
                                    options={this.props.contractTypeList}
                                    onChange={this.changeValue}
                                    placeholder="Contract Type"
                                />
                            </div>
                            <div className="col-xs-3">
                                <DropDown
                                    name="garanty"
                                    value={details.get('garanty')}
                                    options={this.props.garantyList}
                                    onChange={this.changeValue}
                                    placeholder="Garanty"/>
                            </div>
                            <div className="col-xs-3">
                                    <div className="flex-container-nowrap">
                                        <DatePicker
                                            id='commissioning'
                                          value={this.props.commissioningDate}
                                          onChange={this.changeValue}
                                          name="Commissioning Date"/>
                                      </div>
                            </div>
                        </div>



                        <div className="flex-container-nowrap flex-sb-h">
                            <div className="col-xs-3">
                                <DatePicker
                                    id='operating_from'
                                  value={this.props.operatingFrom}
                                  onChange={this.changeValue}
                                  name="Operating From"
                                  />
                            </div>
                            <div className="col-xs-3">
                                <DatePicker
                                    id='contract_start'
                                  value={this.props.contractStart}
                                  onChange={this.changeValue}
                                  name="Contract Start"/>
                            </div>
                            <div className="col-xs-3">
                                <DatePicker
                                    id='contract_end'
                                    value={this.props.contractEnd}
                                    onChange={this.changeValue}
                                    name="Contract End"
                                  />
                            </div>
                            <div className="col-xs-3">
                                <TextBox
                                    id='contractduration_in_years'
                                    isDisabled={true}
                                    value={this.props.contractDuration}
                                    onChange={this.props.changeValue}
                                    placeholder="Duration"
                                    name="contractduration_in_years"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="separator"/>
                                            
                    <div id="contract-edit-2">
                        <div className="flex-container-nowrap flex-sb-h">
                            <div className="col-xs-4">
                                <DropDown
                                    name="remuneration_type"
                                    value={details.get('remuneration_type')}
                                    options={this.props.remunerationTypeList}
                                    onChange={this.changeValue}
                                    placeholder="Remuneration Type"/>
                            </div>
                            <div className="col-xs-4">
                                <DropDown
                                    name="pg_possible"
                                    value={details.get('pg_possible')}
                                    options={[{label: 'NO', value: 'NO'},{label:'YES', value:'YES'}]}
                                    onChange={this.changeValue}
                                    placeholder="PG Possible"/>
                            </div>
                            <div className="col-xs-4">
                                <TextBox
                                    name='available_from'
                                    placeholder="Available From"
                                    value={details.available_from}
                                    onChange={this.changeValue}/>
                            </div>

                        </div>

                        <div className="flex-container-nowrap flex-sb-h">
                            <div className="col-xs-4">
                                <TextBox
                                    isDisabled={true}
                                    value={details.get('pg_qualifying_date')}
                                    onChange={this.changeValue}
                                    placeholder="PG Qualifying Date"
                                    name="pg_qualifying_date"
                                />
                            </div>
                            <div className="col-xs-4">
                                <TextBox
                                    value={details.get('max_pg')}
                                    onChange={this.changeValue}
                                    placeholder="Max PG"
                                    name="max_pg"
                                />
                            </div>
                            <div className="col-xs-4">
                                <DropDown
                                    name="pg_formula"
                                    value={details.get('pg_formula')}
                                    options={this.props.pgFormulaList}
                                    onChange={this.changeValue}
                                    placeholder="PG Formula"
                                />
                             </div>
                        </div>
                    </div>


                    <div id="contract-edit-3">
                        <div className="flex-container-nowrap flex-sb-h">
                            <div className="col-xs-4">
                                <DropDown
                                    name="formula_lds"
                                    value={details.get('formula_lds')}
                                    options={this.props.formulaIdsList}
                                    onChange={this.changeValue}
                                    placeholder="LD's Formula"
                                />
                            </div>
                            <div className="col-xs-4">
                                <DropDown
                                    name="formula_bonus"
                                    value={details.get('formula_bonus')}
                                    options={this.props.formulaBonusList}
                                    onChange={this.changeValue}
                                    placeholder="Bonus Formula"
                                />
                            </div>
                            <div className="col-xs-4">
                                <TextBox
                                    isDisabled={false}
                                    value={details.get('remarks')}
                                    onChange={this.changeValue}
                                    placeholder="Availability Remarks"
                                    name="remarks"
                                />
                            </div>
                        </div>
                        <br/>
                    </div><br/><br/><br/><br/>

                    <div id="contract-edit-4">
                        <div className="container-1">
                            {this.props.detailsLoader ?
                                <ReactDataGrid
                                    enableCellSelect={true}
                                    headerRowHeight={80}
                                    columns={this.columns1}
                                    rowGetter={this.rowGetter}
                                    rowsCount={this.props.mode === 'edit' ? this.props.yearDetails?this.props.yearDetails.length: 7 : 7}
                                    height={750}
                                    minHeight={750}
                                    onGridRowsUpdated={this.handleGridRowsUpdated} />
                                :
                                <Loader height = {750} />
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.getForm()}
                {this.props.currentPage === 'subContractForm' && <div className="button-container text-center">
                        <button onClick={this.onSubmit} type="button"
                                className="btn btn-width-70 button-custom">Submit</button><br/><br/>
               </div>}
                <div className={classnames('success-ribbon', { 'display-none': !this.props.contractUpdated})}>Contract created successfully</div>
            </div>
        );
    }
}




const mapStateToProps = state => {
    const {Contracts} = state
    let details = Contracts.get('contractDetails')
    let yearDetails= Contracts.get('contractYearDetails')
    let TurbineDetails= Contracts.get('turbineContractDetails');
    let isContractSuccess = Contracts.get('isContractSuccess');
    let typeList = Contracts.get('typeList');
    let parksList = Contracts.get('parksList');
    let hubHeightList = Contracts.get('hubHeightList');
    let garantyList = Contracts.get('garantyList');
    let remunerationTypeList = Contracts.get('remunerationTypeList');
    let contractTypeList = Contracts.get('contractTypeList');
    let formulaBonusList = Contracts.get('formulaBonusList');
    let formulaIdsList = Contracts.get('formulaIdsList');
    let pgFormulaList = Contracts.get('pgFormulaList');
    let commissioningDate = details && !!details.get('commissioning') && details.get('commissioning');
    let operatingFrom = details && !!details.get('operating_from') && details.get('operating_from');
    let contractEnd = details && !!details.get('contract_end') && details.get('contract_end');
    let contractStart = details && !!details.get('contract_start') && details.get('contract_start');
    let contractDuration = details && !!details.get('contractduration_in_years') && details.get('contractduration_in_years').toFixed(2);
    let mode = Contracts.get('mode')
    let detailsLoader = Contracts.get('loadingSelectedContractData')
    let contractUpdated = Contracts.get('contractUpdated')
    return {
        detailsLoader,
        commissioningDate,
        operatingFrom,
        contractEnd,
        contractStart,
        contractDuration,
        formulaBonusList,
        formulaIdsList,
        pgFormulaList,
        mode,
        details,
        typeList,
        parksList,
        hubHeightList,
        garantyList,
        remunerationTypeList,
        contractTypeList,
        yearDetails,
        TurbineDetails,
        contractUpdated
    }
}
export default connect(mapStateToProps)(ContractForm);