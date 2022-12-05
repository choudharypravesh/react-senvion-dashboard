var postgres = require('../hilbert_db/schema');
var lvs_server_databse = require('../lvs_server_database/schema');
var sequelize = require('sequelize');
var _ = require('underscore');
var moment = require('moment-timezone');


exports.getTurbine = function(params, callback) {
    let query_string = 'select availability_date AS date , availability_value_sum AS value from mita_availability_daily where  $start_date <= availability_date and  availability_date <= $end_date \
                            and wind_turbine_serial_id_fk = $turbines order by availability_date'
    lvs_server_databse.sequelize.query(query_string, {
          bind: {
              turbines: params.turbines,
              start_date: params.start_date,
              end_date: params.end_date
          },
          type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getAmerica = function(params, callback) {
  let query_string = "select to_timestamp(to_char(availability_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date , type_broad , avg(availability_value_sum) AS value from mita_availability_daily_america \
                            where  $start_date <= availability_date and  availability_date <= $end_date group by availability_date , type_broad order by availability_date";
    postgres.sequelize.query(query_string, {
        bind: {
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getAustralia = function(params, callback) {
    let query_string = "select to_timestamp(to_char(availability_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date , type_broad , avg(availability_value_sum) AS value from mita_availability_daily_australia \
                            where  $start_date < availability_date and  availability_date <= $end_date group by availability_date , type_broad order by availability_date"
    postgres.sequelize.query(query_string, {
        bind: {
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        console.log(data);
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getEUCentral = function(params, callback) {
    let query_string = "select to_timestamp(to_char(availability_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date , type_broad , avg(availability_value_sum) AS value from mita_availability_daily_eu_central \
                            where  $start_date < availability_date and  availability_date <= $end_date group by availability_date , type_broad order by availability_date"
    postgres.sequelize.query(query_string, {
        bind: {
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getEUNorth = function(params, callback) {
    let query_string = "select to_timestamp(to_char(availability_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date , type_broad , avg(availability_value_sum) AS value from mita_availability_daily_eu_north \
                            where  $start_date < availability_date and  availability_date <= $end_date group by availability_date , type_broad order by availability_date"
    postgres.sequelize.query(query_string, {
        bind: {
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getEUSouthEast = function(params, callback) {
    let query_string = "select to_timestamp(to_char(availability_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date , type_broad , avg(availability_value_sum) AS value  from mita_availability_daily_eu_south_east \
                            where  $start_date < availability_date and  availability_date <= $end_date group by availability_date , type_broad order by availability_date"
    postgres.sequelize.query(query_string, {
        bind: {
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getEUSouthWest = function(params, callback) {
    let query_string = "select to_timestamp(to_char(availability_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date , type_broad , avg(availability_value_sum) AS value from mita_availability_daily_eu_south_west \
                            where  $start_date < availability_date and  availability_date <= $end_date group by availability_date , type_broad order by availability_date"
    postgres.sequelize.query(query_string, {
        bind: {
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getOnShore = function(params, callback) {
    let query_string = "select to_timestamp(to_char(availability_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date , type_broad , avg(availability_value_sum) AS value from mita_availability_daily_onshore_1 \
                            where  $start_date < availability_date and  availability_date <= $end_date group by availability_date , type_broad order by availability_date"
    postgres.sequelize.query(query_string, {
        bind: {
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getOffShore = function(params, callback) {
    let query_string = "select to_timestamp(to_char(availability_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date , type_broad , avg(availability_value_sum) AS value from mita_availability_daily_offshore \
                            where  $start_date < availability_date and  availability_date <= $end_date group by availability_date , type_broad order by availability_date"
    postgres.sequelize.query(query_string, {
        bind: {
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getAll = function(params, callback) {
    let query_string = "select to_timestamp(to_char(availability_date, 'YYYY-MM-dd'),  'YYYY-MM-dd') AS date , type_broad , avg(availability_value_sum) AS value from mita_availability_daily_all_1 \
                            where  $start_date <= availability_date and  availability_date <= $end_date and type_broad in ('MM', '3.XM', 'MD', '5M', '6M') \
                            group by availability_date , type_broad order by availability_date"
    postgres.sequelize.query(query_string, {
        bind: {
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}



exports.getBestAvailableFarms = function(params, callback) {
    postgres.sequelize.query("select wind_farm, AVG(availability_value_sum) as value from mita_availability_daily_all_1 \
                            where availability_date > date_trunc('month', current_date - interval '2' month) \
                            GROUP BY wind_farm ORDER BY value desc LIMIT 5", {
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getWorstAvailableFarms = function(params, callback) {
    postgres.sequelize.query("select wind_farm, AVG(availability_value_sum) as value from mita_availability_daily_all_1 \
                            where availability_date > date_trunc('month', current_date - interval '2' month) \
                            GROUP BY wind_farm ORDER BY value LIMIT 5", {
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getBestAvailableTurbines = function(params, callback) {
    postgres.sequelize.query("select wind_turbine_serial_id_fk, AVG(availability_value_sum) as value from mita_availability_daily_all_1 \
                            where availability_date > date_trunc('month', current_date - interval '2' month) \
                            GROUP BY wind_turbine_serial_id_fk ORDER BY value desc LIMIT 5", {
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getWorstAvailableturbines = function(params, callback) {
    postgres.sequelize.query("select wind_turbine_serial_id_fk, AVG(availability_value_sum) as value from mita_availability_daily_all_1 \
                            where availability_date > date_trunc('month', current_date - interval '6' month) \
                            and type in ('MD','MM','3.0M', '3.2M', '3.4M', '3.2M NES', '3.4M NES', '5M', '6M') \
                            GROUP BY wind_turbine_serial_id_fk ORDER BY value limit 5 offset 2", {
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}



exports.getFarm = function(turbines, params, callback) {
    let query_string = "SELECT availability_date as date, AVG(availability_value_sum) as value FROM mita_availability_daily WHERE wind_turbine_serial_id_fk in ($turbines) \
                    AND availability_date >= $start_date AND availability_date <= $end_date GROUP BY availability_date;"
    lvs_server_databse.sequelize.query(query_string, {
        bind:{
            turbines: turbines,
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getFarmAverage = function(turbines, params, callback) {
    let query_string = "SELECT AVG(availability_value_sum) as value FROM mita_availability_daily WHERE wind_turbine_serial_id_fk in ($turbines) \
                    AND availability_date >= $start_date AND availability_date <= $end_date ;"
    lvs_server_databse.sequelize.query(query_string, {
        bind:{
            turbines: turbines,
            start_date: params.start_date,
            end_date: params.end_date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getFleetAverageMonthly = function(params, callback) {
    let end_date =   moment().tz("Europe/London").format("YYYY-MM-DD");
    let start_date = moment().add(-12, 'months').tz("Europe/London").format("YYYY-MM-DD");
    let query_string = " SELECT min(availability_date) as date, AVG(availability_value_sum) as value FROM mita_availability_daily WHERE  \
                         availability_date BETWEEN $start_date AND $end_date  GROUP BY YEAR(availability_date), MONTH(availability_date)";
    lvs_server_databse.sequelize.query(query_string, {
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