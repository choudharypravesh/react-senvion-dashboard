var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.getNearestTurbines = function(params, callback) {
    console.log("comming to nearest turbine");
    let query_string = "select turbine_id_2 from turbine_distance where turbine_id_1 = $turbine_id and distance = \
                                (select min(distance) from turbine_distance where distance > 0 and turbine_id_1 = $turbine_id group by turbine_id_1 limit 10)"
    postgres.sequelize.query(query_string, {
         bind: {
            turbine_id: params
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


exports.getNearestTurbine = function(params, callback) {
    console.log("comming to nearest turbine");
    let query_string = "SELECT turbine_id_2 FROM turbine_distance WHERE turbine_id_1 = $turbine_id AND distance > 0 AND turbine_id_2 IN ( \
                            SELECT serial_number  FROM turbine_master_datas WHERE wind_farm= (SELECT type FROM turbine_master_datas \
                                WHERE serial_number= $turbine_id) AND type = ( SELECT type FROM turbine_master_datas WHERE \
                                 serial_number= $turbine_id)) ORDER BY distance ASC LIMIT 1"
    postgres.sequelize.query(query_string, {
        bind: {
            turbine_id: params.turbines
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