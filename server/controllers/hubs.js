var lvs_db = require('../lvs_server_database/schema');
var sequelize = require('sequelize');
var postgres = require('../hilbert_db/schema');

exports.getTurbines = function(params, callback) {
    let query_string_1 = "SELECT query FROM hub_details where id = $id"
    postgres.sequelize.query(query_string_1, {
                                bind:{
                                    id: params.id
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) { 
        lvs_db.sequelize.query(data[0].query, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {
            callback(true, 200, "Success", data);
        }).catch(function(err) {
            console.log(err)
            callback(false, 300, "Error : " +  err, {});
        });
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " +  err, {});
    });  
}