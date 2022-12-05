var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.get = function(params, callback) {
    postgres.wind_turbine_alerts_vs_components.findAll({
        attributes: ['variable_id'],
        where: {
            alert_name: params
        }
    }).then(function(data) {
        let d = data[0].dataValues.variable_id
        callback(true, 200, "Success", d);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}
