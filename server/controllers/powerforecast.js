var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.get = function(params, callback) {
    console.log(params);
    let query_string = "SELECT to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS measuring_date, to_timestamp((time_interval::BIGINT)/1000) AT TIME ZONE 'UTC' AS time_interval, active_power_actual, active_power_predicted, wind_speed, windspeed_predicted, abs_wind_direction, downtime \
        FROM powerforecast WHERE turbine_id in (:turbines)  and measuring_date BETWEEN  :start_date::date and :end_date::date";
    postgres.sequelize.query(query_string, {
        replacements: {
            turbines: params.turbines,
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}



// exports.get = function(params, callback) {
//     console.log(params);
//     let query_string = "SELECT to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS measuring_date, to_timestamp((time_interval::BIGINT)/1000) AT TIME ZONE 'UTC' AS time_interval, active_power_actual, active_power_predicted, wind_speed, windspeed_predicted, abs_wind_direction, downtime \
//         FROM powerforecast WHERE turbine_id in ("+params.turbines+")  and measuring_date BETWEEN  '"+params.start_date+"'::date and '"+params.end_date+"'::date";
//         console.log(query_string);
//     postgres.sequelize.query(query_string, {
//         type: sequelize.QueryTypes.SELECT
//     }).then(function(data) {
//         callback(true, 200, "Success", data);
//     }).catch(function(err) {
//         console.log(err)
//         callback(false, 300, "Error : " + err, {});
//     });
// }
