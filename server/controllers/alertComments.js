var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.create = function(params, callback) {
    console.log("comming here");
  postgres.alert_comments.create(params
  ).then(function() {
      callback(true, 200, "Success", "data");
  }).catch(function(err) {
      console.log(err)
      callback(false, 300, "Error : " + err, {});
  });
}

exports.update = function(params, callback) {
    console.log("comming here");
  postgres.alert_comments.update(params,{
    where: {
      params
    }
  }).then(function() {
      callback(true, 200, "Success", data);
  }).catch(function(err) {
      console.log(err)
      callback(false, 300, "Error : " + err, {});
  });
}

exports.get = function(params, callback) {
    let query_string = "select t1.* , t2.employee_name from alert_comments t1 join user_details t2 on t1.user_id = t2.user_id where t1.alert_id = $alert_id"
    postgres.sequelize.query(query_string, {
        bind:{
            alert_id: params.alert_id
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}