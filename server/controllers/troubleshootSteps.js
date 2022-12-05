var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');


exports.create = function(params, callback) {
    console.log("createTroubleshootSteps params " + JSON.stringify(params));
    postgres.troubleshoot_steps_details.create({
        user_id: params.user_id,
        order_id: params.order_number,
        start_time: params.start_time,
        end_time: params.end_time,
        step_number: params.step_count,
        status_code: params.status_code

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
    console.log("createTroubleshootSteps params " + JSON.stringify(params));
    postgres.troubleshoot_steps_details.findAll({
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


exports.update = function(params, callback) {
    postgres.troubleshoot_steps_details.update(params, {
        where: {
            user_id: params.user_id,
            order_id: params.order_number,
            start_time: params.start_time,
            end_time: params.end_time,
            step_number: params.step_count,
            status_code: params.status_code
        }
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}