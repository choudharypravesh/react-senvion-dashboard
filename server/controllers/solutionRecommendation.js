var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.create = function(order_id, params, callback) {
	postgres.solutionRecommendation.create({
        order_id: order_id,
        observations: params.observations,
        cause: {'ID': params.value , 'Description': params.label},
        percentage: params.percentage
    }).then(function(data) {
        console.log(data)
        console.log("done")
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}