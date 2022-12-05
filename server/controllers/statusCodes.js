var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');



exports.create = function(params, callback) {
    postgres.status_code_temp.create({
        cause: params.cause,
        status_code: params.status_code,
        observation: params.observation,
        system: params.system,
        sub_system: params.sub_system,
        solution: params.solution,
        created_by: params.created_by,
        created_at: params.created_at
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getCreatedSolutionsUser = function(user_id, callback) {
    let query_string = "SELECT id, cause, status_code, observation, system, sub_system, solution, created_at, created_by, approved " +
        "FROM status_code_temps where created_by = $user_id";
    postgres.sequelize.query(query_string, {
        bind: {
            user_id: params.user_id
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data[0]);
    }).catch(function(err) {
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getCreatedSolutionsSuperAdmin = function(callback) {
    let query_string = "SELECT id, cause, status_code, observation, system, sub_system, solution, created_at, created_by, approved FROM status_code_temps";
    postgres.sequelize.query(query_string, {
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data[0]);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getUpdated = function(params, callback) {
    let query_string = "SELECT id, cause, status_code, observation, system, sub_system, solution, created_by, created_at ,approved, approved_by, approved_at FROM status_code_temps where id = $id" 
    postgres.sequelize.query(query_string, {
        bind: {
            id: params.id
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data[0]);
    }).catch(function(err) {
        callback(false, 300, "Error : " + err, {});
    });
}

exports.update = function(id, params, callback) {
    postgres.status_code_temp.update(params, {
        where: {
            id: id
        }
    }).then(function(data) {
        callback(true, 200, "Success", data[0]);
    }).catch(function(err) {
        callback(false, 300, "Error : " + err, {});
    });
}