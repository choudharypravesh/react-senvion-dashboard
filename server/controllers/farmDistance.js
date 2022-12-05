var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.getNearestFarm = function(params, callback) {
    console.log("comming to nearest turbine");
    let query_string = "select wind_farm_2 from farm_distance where wind_farm_1 = $wind_farm and distance = (select min(distance) from farm_distance where distance > 0 and wind_farm_1 = $wind_farm \
                                 group by wind_farm_1 limit 2)"
    postgres.sequelize.query(query_string, {
        bind: {
            wind_farm: params
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        console.log(data[0]);
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getNearFarms = function(params, callback) {
    console.log("now here: "+params);
    let query_string = "select wind_farm_2 from farm_distance where wind_farm_1 = $wind_farm order by distance limit 3";   
    postgres.sequelize.query(query_string, {
        bind: {
            wind_farm: params
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        console.log(data[0]);
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}
