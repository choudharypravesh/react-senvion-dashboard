import AppConstants from '../../../constants/AppConstants';
import {GetData} from '../../../Utils/utils'
import _ from "underscore";

let intervalForTables;

export const chunkifyData = data => ({
    type: AppConstants.CHUNKIFY_DATA,
    payload: {data}
})

export const changeFarmValue = (selectedFarm, message) => ({
    type: AppConstants.CHANGE_FARM_VALUE,
    payload: {selectedFarm: selectedFarm, message: message}
})

export const onCountZero = (index) => ({
    type: AppConstants.ON_COUNT_ZERO,
    payload: {index}
})

export const changeCountryValue = (selectedCountryCode, selectedCountry) => ({
    type: AppConstants.CHANGE_COUNTRY_VALUE,
    payload: {selectedCountryCode: selectedCountryCode, selectedCountry: selectedCountry}
})

export const getScadaData = (farm, allowedRows) => dispatch => {
    GetData.getScadaData(farm, allowedRows).then(res => {
        if(res.tableData.length > 0) {
            let chunks = res.totalChunks;
            let i=1;
            let currentChunk = 0;
            let data = {tableData1: chunks[0], tableData2: chunks[1], currentChunk: 0};
            dispatch(chunkifyData(data))
            intervalForTables = setInterval(function() {
                if(i<chunks.length) {
                    let seg_data = {tableData1: chunks[i], tableData2: chunks[i+1], currentChunk: currentChunk, totalChunks: res.totalChunks};
                    dispatch(chunkifyData(seg_data))
                    currentChunk++;
                    i+=2;
                } else if(i>=chunks.length) {
                    currentChunk=0;
                    i=0;
                }
            }, 10000)
            dispatch({
                type: AppConstants.GET_SCADA_DATA,
                payload: {res}
            });
        } else {
            dispatch({
                type: AppConstants.GET_SCADA_DATA,
                payload: {res}
            });
        }
    })
}


export const getCountries = () => dispatch => {
    GetData.getCountries().then(res => {
        dispatch({
            type: AppConstants.GET_COUNTRIES_SCADA,
            payload: {res}
        });

    })
}


export const getFarms = (country) => dispatch => {
    GetData.getFarmsListOfCountry(country).then(res => {
        dispatch({
            type: AppConstants.GET_FARMS,
            payload: {res}
        });

    })
}

export const clearDataInterval = () => {
    console.log("clear interval");
    clearInterval(intervalForTables);
}

export const startInterval = (chunks, index) => dispatch => {
        var self = this;
        let i=1;
        let currentChunk = self.state.currentChunk;
        let data = {tableData1: chunks[0], tableData2: chunks[1], currentChunk: index};
        dispatch(chunkifyData(data))
        intervalForTables = setInterval(function() {
            if(i<chunks.length) {
                let seg_data = {tableData1: chunks[i], tableData2: chunks[i+1], currentChunk: currentChunk};
                dispatch(chunkifyData(seg_data))
                currentChunk++;
                i+=2;
            } else if(i>=chunks.length) {
                currentChunk=0;
                i=0;
            }
        }, 10000)
}