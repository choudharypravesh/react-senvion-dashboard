var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');


exports.getTurbine = function(params, callback) {
//   console.log(params);
    postgres.sequelize.query("select to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS measuring_date,  lost_production_factor from lpf_stage where  $start_date <= measuring_date and  measuring_date <= $end_date \
                            and wind_turbine_serial_id_fk in ($turbines) order by measuring_date", {
                                bind:{
                                    turbines: params.turbines,
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getFarm = function(params, callback) {
//   console.log(params);
    postgres.sequelize.query("select to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS measuring_date,  lost_production_factor from lpf_stage where  $start_date <= measuring_date and  measuring_date <= $end_date \
                            and wind_turbine_serial_id_fk in ($turbines) GROUP BY measuring_date order by measuring_date", {
                                bind:{
                                    turbines: params.turbines,
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}