var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.getFarmFromTurbine = function(params, callback) {
    postgres.turbine_master_datas.findAll({
        attributes: ['wind_farm'],
        where: {
            serial_number: params.turbine_id
        }
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getFarms = function(params, callback) {
    postgres.turbine_master_datas.findAll({
        //attributes: ['wind_farm'],
        attributes: [[sequelize.literal('DISTINCT wind_farm'), 'wind_farm']]
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getTurbinesFromFarm = function(params, callback) {
    postgres.turbine_master_datas.findAll({
        attributes: ['serial_number'],
        where: {
            wind_farm: params
        }
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getAllTurbines = function(params, callback) {
    let query_string = "select serial_number from turbine_master_datas";
    postgres.sequelize.query(query_string, {
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}



exports.getTurbinesFromFarmWithSameType = function(params, callback) {
    let query_string = "select serial_number from turbine_master_datas WHERE wind_farm= $wind_farm AND type = (SELECT type from turbine_master_datas WHERE serial_number= $turbine_id);"
    postgres.sequelize.query(query_string, {
        bind: {
            wind_farm : params.wind_farm,
            turbine_id: params.turbine_id
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

//Not in use
//****************** */
exports.getTurbinesLocationsFromCountry = function(params, callback) {
    let query_string = 'SELECT serial_number, coordinate_longitude, coordinate_latitude \
                                FROM "turbine_master_datas"  \
                                WHERE country_id = :country_id AND "coordinate_latitude"::numeric != 0 AND "coordinate_longitude"::numeric != 0 ';
    postgres.sequelize.query(query_string, {
        replacements: {
            country_id : params.country_id
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}
//***************** */
exports.getTurbinesLocationsFromFarm = function(params, callback) {
    let query_string = 'SELECT serial_number, coordinate_longitude, coordinate_latitude \
                                FROM "turbine_master_datas"  \
                                WHERE wind_farm = $wind_farm AND ("coordinate_latitude"::numeric != 0 OR "coordinate_longitude"::numeric != 0) ';
    postgres.sequelize.query(query_string, {
        bind: {
            wind_farm : params.wind_farm
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getCountryFromFarm = function(params, callback) {

    console.log("farm");
    console.log(params)

    postgres.turbine_master_datas.findAll({
        attributes: ['country_id'],
        where: params,
        limit: 1
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getAllCountries = function(params, callback) {
    let query_string = "SELECT DISTINCT t1.country_id, t2.country_name FROM turbine_master_datas t1 JOIN country_code t2 ON t1.country_id = t2.iso";
    postgres.sequelize.query(query_string,{
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}



exports.getFarmFromCountry = function(params, callback) {
    let query_string = "SELECT DISTINCT wind_farm FROM turbine_master_datas WHERE  country_id= $country_id";
    postgres.sequelize.query(query_string,{
        bind:{
            country_id: params.country_id
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getMap = function(params, callback) {
    let query_string = 'SELECT "wind_farm",  serial_number AS "turbine_id", "Unit-Id" AS "unit_id", coordinate_height AS "elevation_old", coordinate_longitude AS "longitude", coordinate_latitude AS "latitude", "Baureihe" AS "series", "type", "rotor_diameter", "hub_height", "commisioning_date" AS "commissioning_date", t2.country_name \
                                FROM "turbine_master_datas" t1 \
                                LEFT OUTER JOIN country_code t2 \
                                    ON t1.country_id = t2.iso \
                                WHERE t1."coordinate_latitude"::numeric::integer != 0 AND t1."coordinate_longitude"::numeric::integer != 0 ORDER BY "coordinate_latitude", "coordinate_longitude"';
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

//GET PLACES IN FORM OF country,wind_farm,turbine_id

exports.getPlaces = function(params, callback) {
    let query_string
    switch (params.type) {
        // var upto turbine level (country,farm,turbine)
        case 0:
            query_string = "SELECT place FROM turbine_master_datas where place is not null";
            break
        //// var upto farm level (country,farm)
        case 1:
            query_string = "SELECT distinct place_farm FROM turbine_master_datas where place_farm is not null";
            break
        default:
            query_string = "SELECT place FROM turbine_master_datas where place is not null";
    
    }
    
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