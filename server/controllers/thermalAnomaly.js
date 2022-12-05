var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.get = function(params, callback) {
    console.log(params);
    postgres.sequelize.query('SELECT measuring_date, turbine_id::text, "'+ params.variable+
    '" FROM thermal_anomaly WHERE measuring_date BETWEEN'+"'"+ params.start_date+"'::date and "+"'"+ params.end_date+"'::date", {
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}
