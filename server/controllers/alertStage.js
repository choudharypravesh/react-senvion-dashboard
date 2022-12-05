var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.getPhcTimeStamp = function(params, callback) {
    let query_string = 'select distinct  time_interval, "Toweroszillation_X_2" from phc_stage_2  where flag =1 and wind_turbine_serial_id_fk = $turbine and measuring_date >= $start_date and measuring_date <= $end_date order by time_interval'
    
    postgres.sequelize.query(query_string, {
        bind: {
            turbine: params.turbines,
            start_date: params.start_date,
            end_date: params.end_date
        },type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        console.log(data[0]);
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}
