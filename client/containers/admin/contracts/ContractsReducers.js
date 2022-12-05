import AppConstants from '../../../constants/AppConstants'
import {List, Set, Map} from 'immutable'
const contractsData = (
    state = Map({
        overviewData: [],
        loadingOverViewData: true,
        contractDetails:Map({
            available_from:"",
            commissioning: '',
            contract: '',
            contract_end: '',
            contract_start: '',
            contract_type: "",
            contractduration_in_years: '',
            formula_bonus: '',
            formula_lds: '',
            garanty: "",
            hub_height: "",
            max_pg: "",
            number_of_units: '',
            operating_from:'',
            pg_formula: '',
            pg_possible:"",
            pg_qualifying_date:"",
            remarks:"",
            remuneration_type:"",
            type: "",
            windparc: ""
        }),
        turbineContractDetails: [{},{},{},{}],
        contractYearDetails: [{tab: "Contractual availability"},
                                {tab: "Variable remuneration"},
                                {tab: "Variable compensation LD"},
                                {tab: "Variable compensation Bonus"},
                                {tab: "Threshold Bonus"},
                                {tab: "Fixed remuneration - Additive "},
                                {tab: "Energy Yield per WEA forecasted as per contract"}],
        currentlyShowing: 'overview',
        typeList: [{label: 'MM82', value: 'MM82'},
                   {label: 'MM92', value: 'MM92'},
                   {label: '3.4M', value: '3.4M'},
                   {label: 'MM70', value: 'MM70'},
                   {label: 'MM10', value: 'MM10'},
                   {label: '3.2M', value: '3.2M'},
                   {label: '5M', value: '5M'},
                   {label: 'MD77', value: 'MD77'},
                   {label: '600', value: '600'},
                   {label: '3.0M', value: '3.0M'},
                   {label: '750', value: '750'},
                   {label: '6M', value: '6M'},
                   {label: '100', value: '100'},
                   {label: 'andere', value: 'andere'},
                   {label: '6.', value: '6.'},
                   {label: 'S70', value: 'S70'},
                   {label: '500', value: '500'}],
       parksList: [],
       hubHeightList: [],
        contractUpdated: false,
       loadingSelectedContractData: true,
       garantyList: [{label: 'PG', value: 'PG'},{label: 'VG', value: 'VG'}],
       remunerationTypeList: ['Fixed payment', 'Fixed and Variable payment', '-', 'Fixed payment', 'min 5% L + M'].map(type => {return {label: type, value: type}}),
       contractTypeList: ['ISP', 'OSA', 'Agreement contract', 'ISP+', 'WSV',
                            'ISP+ Global Insurance', 'KV', 'OM Agreement',
                             'OSM', 'OSP', 'ISK', 'ISA', 'M+S'].map(type => {return {label: type, value: type}}),
    }),

                       action) => {
    var contractDetails;
    switch (action.type){
        case AppConstants.LOADING_CONTRACT_OVERVIEW_DATA:
            return state.set('loadingOverViewData', true);
        case AppConstants.LOADED_CONTRACT_OVERVIEW_DATA:
            let overviewData = List(action.payload.overviewData);
            let parksList = overviewData.map(data => data.windparc);
            parksList = Set(parksList).toJS().map(park => {return {label: park, value: park}});
            let hubHeightList = overviewData.map(data => data.hub_height);
            hubHeightList = Set(hubHeightList).toJS().map(hubHeight => {return {label: hubHeight, value: hubHeight}})
            return state.set('loadingOverViewData', false).set('overviewData', overviewData).set('parksList', hubHeightList)
        case AppConstants.LOADING_CONTRACT_FIELDS_DATA:
            return state.set('loadingSelectedContractData', true)
        case AppConstants.LOADED_CONTRACT_FIELDS_DATA:
            return state.set('loadingSelectedContractData', false).set('selectedContractData', action.payload.selectedContractData)
        case AppConstants.SET_CONTRACT:
            return state.set('selectedContractId', action.payload.selectedContractId);
        case AppConstants.SET_CURRENTLY_SHOWING:
            return state.set('currentlyShowing', action.payload.show)
        case AppConstants.SET_WIND_PARK:
            return state.set('selectedWindPark', action.payload.windPark)
        case AppConstants.SET_CONTRACT_DETAILS:
            return state.set('contractDetails', Map(action.payload.details));
        case AppConstants.SET_CONTRACT_YEAR_DETAILS:
            return state.set('contractYearDetails', action.payload.details)
        case AppConstants.SET_TURBINE_CONTRACT_DETAILS:
            return state.set('turbineContractDetails', action.payload.details);
        case AppConstants.SET_MODE:
            let defaultValues = [{tab: "Contractual availability"},
                                {tab: "Variable remuneration"},
                                {tab: "Variable compensation LD"},
                                {tab: "Variable compensation Bonus"},
                                {tab: "Threshold Bonus"},
                                {tab: "Fixed remuneration - Additive "},
                                {tab: "Energy Yield per WEA forecasted as per contract"}];

            let contractYearDetails = action.payload.mode === 'create' ? defaultValues : state.get('contractYearDetails');
            let contractDetails = action.payload.mode === 'create' ? Map({}) : state.get('contractDetails');
            let turbineContractDetail = action.payload.mode === 'create' ? [{}, {}, {}, {}] : state.get('turbineContractDetails')
            return state.set('mode', action.payload.mode).set('contractYearDetails',contractYearDetails).set('contractDetails',contractDetails).set('turbineContractDetails', turbineContractDetail)
        case AppConstants.ADD_ROW:
            let turbineContractDetails = state.get('turbineContractDetails');
            turbineContractDetails.push({technical_place: ""})
            return state.set('turbineContractDetails',turbineContractDetails);
        case AppConstants.SET_VALUE:
            let containerObject = {}
            if(action.payload.container === 'contractForm'){
                containerObject = Object.assign({}, state.get('contractDetails'));
                containerObject[action.payload.key] = action.payload.value;
                return state.set('contractDetails', containerObject)
            }else{
                containerObject = Object.assign({}, state.get('turbineContractDetails'));
                containerObject[action.payload.key] = action.payload.value;
                return state.set('turbineContractDetails', containerObject)
            }
        case AppConstants.SET_CONTRACT_DATA:
            let newRowData = Object.assign({}, state.get('contractYearDetails')[action.payload.row], action.payload.data);
            let newContractData = Object.assign({}, state.get('contractYearDetails'));
            newContractData[action.payload.row] = newRowData;
            return state.set('contractYearDetails', newContractData)
        case AppConstants.SET_TURBINE_DETAILS_DATA:
            let newTRowData = Object.assign({}, state.get('turbineContractDetails')[action.payload.row], action.payload.data);
            let newTurbineData = state.get('turbineContractDetails')
            newTurbineData[action.payload.row] = newTRowData;
            return state.set('turbineContractDetails', newTurbineData);
        case AppConstants.LOADED_DROPDOWN_VALUES:
            let contractTypeList = action.payload.contract_type.map(ct => {return {label: ct, value: ct}})
            let formulaBonusList = action.payload.formula_bonus.map(fb => {return {label: fb, value: fb}})
            let formulaIdsList = action.payload.formula_lds.map(fi => {return {label: fi, value: fi}})
            let garantyList = action.payload.garanty.map(g => {return {label: g, value :g}})
            let pgFormulaList = action.payload.pg_formula.map(pf => {return {label: pf, value: pf}})
            let remunerationTypeList = action.payload.remuneration_type.map(rt => {return {label: rt, value: rt}})
            return state.set('contractTypeList', contractTypeList)
                    .set('formulaBonusList',formulaBonusList)
                    .set('formulaIdsList', formulaIdsList)
                    .set('garantyList',garantyList)
                    .set('pgFormulaList',pgFormulaList)
                    .set('remunerationTypeList',remunerationTypeList)
        case AppConstants.UPDATED_CONTRACT:
            return state.set('contractUpdated', true)
        case AppConstants.CHANGE_VALUE:
            return state.setIn(['contractDetails', action.payload.key], action.payload.value)
        case AppConstants.SET_RIBBON_SUCCESS:
            return state.set('contractUpdated', action.payload.boolean).set('currentlyShowing','overview')
        default:
            return state
    }
}

export default contractsData;