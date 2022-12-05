import AppConstants from '../../../constants/AppConstants';
import {GetData} from '../../../Utils/utils';
import _ from "underscore";

export  const changeFleetTab = (tabId) => dispatch => {
    dispatch({
        type: AppConstants.CHANGE_FLEET_TAB,
        payload:{tabId},
    })
}

//country and ID reference
// ID            HUB
// 1              america
// 3              eu_central
// 4              eu_north
// 5              eu_south_east
// 6              eu_south_west
// 2              australia
// 7              onshore
// 8              offshore
// 9              all
export const getFleetData = (data,selectedTab) => dispatch => {
    let self = this;
    dispatch({
        type: AppConstants.LOADING,
        category: data.id,
        payload: {
            loaderStatus: true,
            chartId: data.id,
            noData: false
        }
    });
    GetData.getFleetData(data,selectedTab).then(data => {
        if(_.isEmpty(data.allChartData)){
            dispatch({
                type: AppConstants.NODATA,
                category: data.id,
                payload: {
                    noData: true,
                    loaderStatus: false,
                    allChartData: {
                        X: [],
                        Y1: [],
                        Y2: [],
                        Y3: [],
                        Y4: [],
                        Y5: [],
                        name: "",
                        name1: "",
                        name2: "",
                        name3: "",
                        name4: "",
                        name5: ""
                    }
                }
            })
        }else{
            dispatch({
                type: AppConstants.LOADED,
                category: data.id,
                payload: {
                    loaderStatus: false,
                    noData: false,
                    allChartData: data.allChartData
                }
            });
        }
    }).catch(function(err) {
        console.log(err);
        window.alert("Faliure "+err);
    });

}
export const setDates = (initial, final, selectedDate,data,dataHub,selectedTab) => dispatch =>{
    dispatch({
        type: AppConstants.SET_DATES,
        payload: {
            initialDate: initial,
            finalDate: final,
            selectedDate: selectedDate
        }
    });
    if(data && dataHub) {
        dispatch(getFleetData(data, selectedTab))
        dispatch(getFleetData(dataHub, selectedTab))
    }
}