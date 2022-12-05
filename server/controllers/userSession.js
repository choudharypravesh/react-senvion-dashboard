var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

var crypto = require('crypto');

var generate_session_key = exports.generate_key = function() {
    var sha = crypto.createHash('sha1');
    sha.update(Date.now().toString());
    return sha.digest('hex');
};


exports.create = function(params, callback) {
    console.log("user_session_details_create params " + JSON.stringify(params));
    console.log(generate_session_key());
    postgres.user_session_details.create({
        user_id: params.user_id,
        session_id: generate_session_key(),
        session_start_time: params.session_start_time,
        session_end_time: params.session_end_time,
        is_active: params.active

    }).then(function(data) {
        console.log(data)
        console.log("done")
        var datas = _.pick(data, "user_id", "session_id");
        callback(true, 200, "Success", datas);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}


exports.get = function(params, callback) {
    console.log("user_session_details_get params " + JSON.stringify(params));
    postgres.user_session_details.findAll({
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
    console.log("user_session_details_update" + JSON.stringify(params));
    postgres.user_session_details.update({
        session_end_time: params.session_end_time,
        is_active: params.is_active
    }, {
        where: {
            session_id: session_id
        }
    }).then(function(data) {
        console.log(data)
        console.log("done")
        var datas = _.pick(data, "user_id", "session_id");
        callback(true, 200, "Success", datas);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}