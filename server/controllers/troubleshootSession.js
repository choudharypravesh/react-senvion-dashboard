var postgres = require('../hilbert_db/schema');
var sequelizer = require('sequelize');
var generate_session_key = require('./userSession');
var _ = require('underscore');


exports.create = function(params, callback) {
    postgres.troubleshoot_session_details.create({
        user_id: params.user_id,
        troubleshoot_session_id: generate_session_key.generate_key(),
        order_id: params.order_id,
        start_time: params.start_time,
        end_time: params.end_time
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

exports.get = function(params, callback) {
    postgres.troubleshoot_session_details.findAll({
        where: params

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


exports.update = function(session_id, params, callback) {
    postgres.troubleshoot_session_details.update({
        end_time: params.end_time
    }, {
        where: {
            troubleshoot_session_id: session_id,
        }
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}