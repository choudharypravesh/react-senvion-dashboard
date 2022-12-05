import farmDistance from '../controllers/farmDistance';
import variables from '../MetaData/variables.json';
import lvs_scada_weather from '../controllers/lvs_scada_weather';
import turbineMasterDatas from '../controllers/turbineMasterDatas';
import lvs_scada_day_night_average from '../controllers/lvs_scada_day_night_average';
import lvs_scada_farm_level from '../controllers/lvs_scada_farm_level';
import _ from 'underscore';

//params.type = value_type_id_fk
//


exports.getWeatherFarmLevel = function(req, res) {
    var params = JSON.parse(req.query.data);
    //Bind paramete taker care of below line thats why it has been commented
    // params.wind_farm = params.wind_farm.replace("'","''");
    console.log(params.wind_farm)
    farmDistance.getNearFarms(params.wind_farm, function (s, c, m, d) {
        let farms =  _.map(d, function(x) {
                            return x.wind_farm_2
                        })
        let count = 0;
        let result = [];
        farms.forEach(function(element){
            switch (params.duration){
                case "daily":
                    lvs_scada_weather.getDailyWeatherAverage(element, params, function (s,c,m,d) {
                        result = result.concat(d);
                        count++;
                        if (count == farms.length) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: result
                            }));
                        }
                    });
                    break;

                case "day":
                    lvs_scada_weather.getDayWeatherAverage(element, params, function (s,c,m,d) {
                        result = result.concat(d);
                        count++;
                        if (count == farms.length) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: result
                            }));
                        }
                    });
                    break;

                case "night":
                    lvs_scada_weather.getNightWeatherAverage(element, params, function (s,c,m,d) {
                        result = result.concat(d);
                        count++;
                        if (count == farms.length) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: result
                            }));
                        }
                    });
                    break;

                default:
                    lvs_scada_weather.getDailyWeatherAverage(element, params, function (s,c,m,d) {
                        result = result.concat(d);
                        count++;
                        if (count == farms.length) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: result
                            }));
                        }
                    });
            }
            
        }); 
    });
}

exports.getWeatherFarmLevelAverage = function(req, res) {
    var params = JSON.parse(req.query.data);
    switch (params.duration){
        case "all":
            turbineMasterDatas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
                d = _.map(d, function(item) {
                        return item.serial_number
                    });
                console.log(d);
                params.variable = params.variables.split(",");
                params.type = params.type.split(",");
                lvs_scada_farm_level.getFarmLevelAverage(d, params, function (s,c,m,d_total) {
                    params.variables = params.variables.split(",");
                    lvs_scada_day_night_average.getDayWeatherAverage(d, params, function (s,c,m,d_night) {
                        lvs_scada_day_night_average.getNightWeatherAverage(d, params, function (s,c,m,d_day) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: {total:d_total,
                                    day: d_day,
                                    night:d_night
                                }
                            })); 
                        });
                    });
                });
            }); 
            break;

        case "total":
            turbineMasterDatas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
                d = _.map(d, function(item) {
                        return item.serial_number
                    });
                params.variable = params.variables.split(",");
                params.type = params.type.split(",");
                lvs_scada_farm_level.getFarmLevelAverage(d, params, function (s,c,m,d) {
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    }));
                });
            }); 
            break;

        case "day":
            turbineMasterDatas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
                d = _.map(d, function(item) {
                        return item.serial_number
                    });
                params.variables = params.variables.split(",");
                params.type = params.type.split(",");
                lvs_scada_day_night_average.getDayWeatherAverage(d, params, function (s,c,m,d) {
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    })); 
                });
            });
            break;

        case "night":
            turbineMasterDatas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
                d = _.map(d, function(item) {
                        return item.serial_number
                    });
                params.variables = params.variables.split(",");
                params.type = params.type.split(",");
                lvs_scada_day_night_average.getNightWeatherAverage(d, params, function (s,c,m,d) {
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    })); 
                });
            });
            break;

        default:
            turbineMasterDatas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
                d = _.map(d, function(item) {
                        return item.serial_number
                    });
                params.variable = params.variables.split(",");
                params.type = params.type.split(",");
                lvs_scada_farm_level.getFarmLevelAverage(d, params, function (s,c,m,d) {
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