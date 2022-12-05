var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.get = function(params, callback) {
postgres.variables.findAll({
    attributes: ['id', 'name'],
    where: params,
    limit: 100
  }).then(function(data) {
      callback(true, 200, "Success", data);
  }).catch(function(err) {
      console.log(err)
      callback(false, 300, "Error : " + err, {});
  });
}

//Global variable list in format source,variable_name,variable_tyep,duration,granularity
exports.getPlaces = function(params, callback) {
    let query_string = "SELECT place FROM turbine_master_datas where place is not null";
    
    postgres.sequelize.query(query_string, {
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        //console.log(data[0]);
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });

}