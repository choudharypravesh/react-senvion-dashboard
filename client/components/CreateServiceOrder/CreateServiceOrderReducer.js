import moment from 'moment';
import ReactCookie from 'react-cookie';
import {Map} from 'immutable'
import AppConstants from '../../constants/AppConstants';

const initialState = Map({
    popupStatusCode: [],
    popupDescription: "",
    popupOrderId: "",
    popupTurbineId: localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert).turbine_id : "91690",
    popupSelectedAlert: localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert) : [],
    popupPotentialSymptoms: "",
    popupDegree: "",
    statusCodes: [],
    selectedChips: [],
    searchItems: [],
    statusCodesLoading: true,
    searchItemsLoading: false,
    placeholder: "",
    countries: [],
    selectedCountry: 'France',
    farms: [],
    selectedFarm: "",
    turbines: [{value:"82473", label: "82473"}],
    selectedTurbine: "",
    showSuccessMessage: false,
    showHidePopup: false,
    disablePopupFarmSelection: false,
    setErrorMessage: false
})

const createServiceOrderData = (state = initialState, action) => {
    switch(action.type) {
        case AppConstants.SELECT_TURBINE_CSO:
            return state.set('selectedTurbine',action.payload.turbine);
        case AppConstants.STATUSCODE_SEARCH_INPUT_CHANGED:
            return state.set('statusCodes',action.payload.data.statusCodes)
                .set('statusCodesLoading',action.payload.data.statusCodesLoading)
        case AppConstants.SELECT_STATUS_CODE:
            return state.set('popupStatusCode',action.payload.statuscode)
        case AppConstants.CHANGE_TEXT:
            return state.set(action.name,action.payload)
        case AppConstants.SEARCH_INPUT_CHANGED:
            return state.set('searchItems',action.payload.data.searchItems)
        case AppConstants.SELECT_RECOMMENDED_OBSERVATIONS:
            return state.set('selectedChips',action.payload.recObservations)
        case AppConstants.SET_ERROR_MESSAGE_CSO:
            return state.set('setErrorMessage',action.payload.boolean)
                .set('showSuccessMessage',!action.payload.boolean)
        case AppConstants.SHOW_HIDE_POPUP:
            return state.set('showHidePopup', action.payload.bool)
                .set('selectedTurbine',action.payload.turbine?action.payload.turbine:"")
                .set('popupDescription',"")
                .set('popupOrderId',"")
                .set('popupStatusCode',[])
                .set('selectedChips',[])
                .set('showSuccessMessage',false)
                .set('status',action.payload.status===2)
                .set('disablePopupFarmSelection',action.payload.turbineDisable)
                .set('setErrorMessage',false)
        case AppConstants.EMPTY_FORM_FIELDS:
            if(!state.get('disablePopupFarmSelection')) {
                return state.set('selectedTurbine',"")
                    .set('popupDescription',"")
                    .set('popupOrderId',"")
                    .set('popupStatusCode',[])
                    .set('selectedChips',[])
                    .set('showSuccessMessage',true)
                    .set('setErrorMessage',false)
            } else {
                return state.set('popupDescription',"")
                    .set('popupOrderId',"")
                    .set('popupStatusCode',[])
                    .set('selectedChips',[])
                    .set('showSuccessMessage',true)
                    .set('setErrorMessage',false)
            }
        default:
            return state;
    }
}
export default createServiceOrderData;
