import scada_farm from '../controllers/lvs_scada_farm_level';
import windTurbineAlertVsComponent from '../controllers/windTurbineAlertVsComponent';
import scada_turbine from '../controllers/lvs_scada';
import turbine_master_datas from '../controllers/turbineMasterDatas';
import _ from 'underscore'; 


exports.farmMeanPerValiableFromTurbine = function(req, res) {
    let params = JSON.parse(req.query.data);
    //let params = req.query;
    let one_day=1000*60*60*24;
    let start = Date.parse(params.start_date, "Y-m-d");
    let end = Date.parse(params.end_date, "Y-m-d");
    let date1 = new Date(start)
    let date2 = new Date(end)
    let difference_day = Math.round((date2 - date1)/one_day);
    let days = difference_day+1
    console.log('difference_day: '+difference_day)

     if (difference_day <= 90) {
        console.log("get 10 min level");
        windTurbineAlertVsComponent.get(params.alert_name, function(s, c, m, d) {
            params.variable = d;
            scada_farm.getSameFarmTurbines(params, function (s,c,m,d) {
                // console.log(d);
                scada_farm.get10MinLevelFarmLevelMean(d, params, function (s,c,m,d) {
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    }));
                });
            });
        });
    }else if (90 < difference_day) {
        console.log("get day level");
        windTurbineAlertVsComponent.get(params.alert_name, function(s, c, m,d) {
            params.variable = d;
            scada_farm.getSameFarmTurbines(params, function (s,c,m,d) {
                //console.log(d);
                scada_farm.getDayLevelFarmLevelMean(d, params, function (s,c,m,d) {
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    }));
                });
            });
        });
    }
}



exports.turbinePerValiable = function(req, res) {
    let params = JSON.parse(req.query.data);
    //let params = req.query;
    let one_day=1000*60*60*24;
    let start = Date.parse(params.start_date, "Y-m-d");
    let end = Date.parse(params.end_date, "Y-m-d");
    let date1 = new Date(start)
    let date2 = new Date(end)
    let difference_day = Math.round((date2 - date1)/one_day);
    let days = difference_day+1
    console.log('difference_day: '+difference_day)

    console.log(params);
    if (difference_day <= 90) {
        console.log("get 10 min level");
        windTurbineAlertVsComponent.get(params.alert_name, function(s, c, m,d) {
            params.variable = d;
            scada_turbine.get10MinLevel(params, function (s,c,m,d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            })
        });
    }else if (90 < difference_day) {
        console.log("get day level");
        windTurbineAlertVsComponent.get(params.alert_name, function(s, c, m,d) {
            params.variable = d;
            scada_turbine.getDayLevel(params, function (s,c,m,d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            })
        });
    }
}


exports.farmMeanPerValiableFromFarm = function(req, res) {
    let params = JSON.parse(req.query.data);
    //let params = req.query;
    let one_day=1000*60*60*24;
    let start = Date.parse(params.start_date, "Y-m-d");
    let end = Date.parse(params.end_date, "Y-m-d");
    let date1 = new Date(start)
    let date2 = new Date(end)
    let difference_day = Math.round((date2 - date1)/one_day);
    let days = difference_day+1
    console.log('difference_day: '+difference_day)

     if (difference_day <= 90) {
        console.log("get 10 min level");
        turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
            d = _.map(d, function(item) {
                    return item.serial_number
                });
            scada_farm.get10MinLevelFarmLevelMean(d, params, function (s,c,m,d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            });
        });        
    }else if (90 < difference_day) {
        console.log("get day level");
        turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
            d = _.map(d, function(item) {
                    return item.serial_number
                });
            params.variable = params.variable.split(",");
            scada_farm.getDayLevelFarmLevelMean(d, params, function (s,c,m,d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            });
        });
    }
}


exports.turbineLevelPerValiableFromFarm = function(req, res) {
    let params = JSON.parse(req.query.data);
    turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
        d = _.map(d, function(item) {
                return item.serial_number
            });
        console.log(d);
        params.turbines = d.slice(0,6);
        console.log(params);
        params.variable = params.variable.split(",");
        scada_turbine.getDayLevel(params, function (s,c,m,d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
    });        
}




exports.farmLevelAveragePerVariable = function(req, res) {
    let params = JSON.parse(req.query.data);
    turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
        d = _.map(d, function(item) {
                return item.serial_number
            });
        params.variable = params.variable.split(",");
        scada_farm.getFarmLevelAverage(d, params, function (s,c,m,d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        });
    });        
}