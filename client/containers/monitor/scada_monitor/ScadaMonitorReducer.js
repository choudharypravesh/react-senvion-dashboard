import moment from 'moment';
import ReactCookie from 'react-cookie';
import AppConstants from '../../../constants/AppConstants';
import {Map} from 'immutable'


let initialState = Map({
  tableData: [],
  tableData1: [],
  tableData2: [],
  totalChunks: [],
  currentChunk: 0,
  currentPageIndex: 1,
  farms: [],
  allowedRows: 19,
  selectedFarm: "Lac Alfred",
  selectedCountryCode: "CA",
  selectedCountry: 'Canada',
  countries: [{value: "CA", label: "Canada"}],
  loader: true,
  noDataMessage: "",
  isLoopActive: true
})

const scadaMonitorData = (state = initialState, action) => {
    switch(action.type) {
        case AppConstants.GET_SCADA_DATA:
            return state.set('tableData',action.payload.res.tableData)
                .set('loader',action.payload.res.loader)
                .set('totalChunks', action.payload.res.totalChunks)
                .set('noDataMessage', action.payload.res.noDataMessage)
        case AppConstants.UPDATE_ORDERS:
            return state.set('orders',action.payload.res.orders)
        case AppConstants.CHUNKIFY_DATA:
            return state.set('tableData1',action.payload.data.tableData1)
                .set('tableData2',action.payload.data.tableData2)
                .set('currentChunk',action.payload.data.currentChunk)
                .set('loader',false)
        case AppConstants.GET_COUNTRIES_SCADA:
            return state.set('countries',action.payload.res.variablesData)

        case AppConstants.GET_FARMS:
            console.log(action.payload);
            return state.set('farms',action.payload.res)
            .set('selectedFarm',action.payload.res[0].label)
        case AppConstants.CHANGE_FARM_VALUE:
            console.log(action.payload);
            return state.set('selectedFarm',action.payload.selectedFarm)
                    .set('noDataMessage',action.payload.message)
        case AppConstants.CHANGE_COUNTRY_VALUE:
            console.log(action.payload);
            return state.set('selectedCountryCode',action.payload.selectedCountryCode)
                        .set('selectedCountry',action.payload.selectedCountry)
        case AppConstants.ON_COUNT_ZERO:
            console.log(action.payload);
            console.log(state);
            let totalChunks = state.get('totalChunks');
            return state.set('tableData1',totalChunks[action.payload.index])
                            .set('tableData2',totalChunks[action.payload.index+1])
        default:
            return state;

    }
}
export default scadaMonitorData;
