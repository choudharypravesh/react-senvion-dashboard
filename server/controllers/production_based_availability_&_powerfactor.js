var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');
var moment = require('moment-timezone');


exports.getTurbinePba = function(params, callback) {
    postgres.sequelize.query("select to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date,  production_based_availability AS value from lpf_stage where  $start_date <= measuring_date and  measuring_date <= $end_date \
                            and wind_turbine_serial_id_fk in ($turbines) order by measuring_date", {
                                bind:{
                                    turbines: params.turbines,
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getTurbineLpf = function(params, callback) {
    postgres.sequelize.query("select to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date,  lost_production_factor AS value from lpf_stage where  $start_date <= measuring_date and  measuring_date <= $end_date \
                            and wind_turbine_serial_id_fk in ($turbines) order by measuring_date", {
                                bind:{
                                    turbines: params.turbines,
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getRankingPba = function(params, callback) {
    let query_string = "SELECT wind_turbine_serial_id_fk, avg(production_based_availability) AS value FROM lpf_stage WHERE measuring_date BETWEEN $start_date AND $end_date \
                                GROUP BY wind_turbine_serial_id_fk ORDER BY production_based_availability DESC ;" 
    postgres.sequelize.query(query_string, {
                                bind:{
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getRankingLpf = function(params, callback) {
    let query_string = "SELECT wind_turbine_serial_id_fk, avg(lost_production_factor) AS value FROM lpf_stage WHERE measuring_date BETWEEN $start_date AND $end_date \
                                GROUP BY wind_turbine_serial_id_fk ORDER BY lost_production_factor DESC ;" 
    postgres.sequelize.query(query_string, {
                                bind:{
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}



//************************************* */
//Farm Level
//************************************* */
exports.getFarmPba = function(params, callback) {
    postgres.sequelize.query("select to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date,  AVG(production_based_availability) AS value from lpf_stage where  :start_date <= measuring_date and  measuring_date <= :end_date \
                            and wind_turbine_serial_id_fk in (:turbines) GROUP BY date order by date", {
                                replacements:{
                                    turbines: params.turbines,
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getFarmLpf = function(params, callback) {
    postgres.sequelize.query("select to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date,  AVG(lost_production_factor) AS value from lpf_stage where  :start_date <= measuring_date and  measuring_date <= :end_date \
                            and wind_turbine_serial_id_fk in (:turbines) GROUP BY date order by date", {
                                replacements:{
                                    turbines: params.turbines,
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}



//************************************* */
//Hub level
//************************************* */
exports.getHubPba = function(params, callback) {
    postgres.sequelize.query("select to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date, type_broad, AVG(production_based_availability) AS value from lpf_stage AS lpfs\
                            LEFT OUTER JOIN turbine_master_datas AS tmd \
                            ON lpfs.wind_turbine_serial_id_fk = tmd.serial_number \
                            WHERE  :start_date <= measuring_date and  measuring_date <= :end_date \
                            AND lpfs.wind_turbine_serial_id_fk in (:turbines) AND tmd.serial_number in (:turbines) GROUP BY type_broad, date ORDER BY date", {
                                replacements:{
                                    turbines: params.turbines,
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getAllPba = function(params, callback) {
    postgres.sequelize.query("select to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date, type_broad, AVG(production_based_availability) AS value from lpf_stage AS lpfs\
                            LEFT OUTER JOIN turbine_master_datas AS tmd \
                            ON lpfs.wind_turbine_serial_id_fk = tmd.serial_number \
                            WHERE :start_date <= measuring_date and  measuring_date <= :end_date \
                            GROUP BY tmd.type_broad, date ORDER BY date", {
                                replacements:{
                                    turbines: params.turbines,
                                    start_date: params.start_date,
                                    end_date:params.end_date
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


// exports.getHubLpf = function(params, callback) {
//     postgres.sequelize.query("select to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS measuring_date,  AVG(lost_production_factor) AS production_based_availability from lpf_stage where  :start_date <= measuring_date and  measuring_date <= :end_date \
//                             and wind_turbine_serial_id_fk in (:turbines) GROUP BY measuring_date order by measuring_date", {
//                                 replacements:{
//                                     turbines: params.turbines,
//                                     start_date: params.start_date,
//                                     end_date:params.end_date
//                                 },
//         type: sequelize.QueryTypes.SELECT
//     }).then(function(data) {
//         callback(true, 200, "Success", data);
//     }).catch(function(err) {
//         console.log(err)
//         callback(false, 300, "Error : " + err, {});
//     });
// }



//************************************* */
//Fleet Level
//************************************* */
exports.getFleetAverageMonthlyPba = function(params, callback) {
    let end_date =   moment().tz("Europe/London").format("YYYY-MM-DD");
    let start_date = moment().add(-12, 'months').tz("Europe/London").format("YYYY-MM-DD");
    let query_string = " SELECT min(to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd')) as date, AVG(production_based_availability) as value FROM lpf_stage WHERE  \
                         measuring_date BETWEEN $start_date AND $end_date  GROUP BY date_part('year' , (to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd'))), date_part('month' , (to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd')))";
    postgres.sequelize.query(query_string, {
        bind:{
            start_date: start_date,
            end_date: end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getFleetAverageMonthlyLpf = function(params, callback) {
    let end_date =   moment().tz("Europe/London").format("YYYY-MM-DD");
    let start_date = moment().add(-12, 'months').tz("Europe/London").format("YYYY-MM-DD");
    let query_string = " SELECT min(measuring_date) as date, AVG(lost_production_factor) as value FROM lpf_stage WHERE  \
                         measuring_date BETWEEN $start_date AND $end_date  GROUP BY date_part('year' , (to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd'))), date_part('month' , (to_timestamp(to_char(measuring_date, 'YYYY-MM-dd'),  'YYYY-MM-dd')))";
    postgres.sequelize.query(query_string, {
        bind:{
            start_date: start_date,
            end_date: end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getTotalLpf = function(params, callback) {
    // Return today's date and time
    let currentTime = new Date()
    // returns the year (four digits)
    let year = currentTime.getFullYear()
    let date = year+"-"+"01"+"-"+"01"
    let query_string = 'SELECT sum("Lost_Production"*24)/1000 AS lpf from lpf_stage WHERE measuring_date > $date';
    postgres.sequelize.query(query_string, {
        bind:{
            date: date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}