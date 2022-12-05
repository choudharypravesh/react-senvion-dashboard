var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');
var moment = require('moment-timezone');

exports.overviewTable = function(params, callback) {
    let queryString = "SELECT t1.alerts, t4.component_name, number_of_turbines_affected, number_of_farms_affected, coalesce(t3.number_of_alerts_actioned, 0) AS number_of_alerts_actioned \
                        FROM (SELECT alerts, count(DISTINCT(turbine_id)) AS number_of_turbines_affected FROM alerts \
                            WHERE date_identified BETWEEN :start_date AND :end_date GROUP BY alerts ) t1 \
                        JOIN (SELECT alerts, count(DISTINCT(farm_name)) AS number_of_farms_affected FROM alerts \
                            WHERE date_identified BETWEEN :start_date AND :end_date GROUP BY alerts) t2 \
                        ON t1.alerts = t2.alerts \
                        LEFT OUTER JOIN (SELECT alerts, coalesce(count(status), 0) AS number_of_alerts_actioned FROM alerts WHERE status != 0 \
                            AND date_identified BETWEEN :start_date AND :end_date GROUP BY alerts) t3 \
                        ON t1.alerts = t3.alerts \
                        LEFT OUTER JOIN (SELECT alert_name, component_name FROM wind_turbine_alerts_vs_components) t4 \
                        ON t1.alerts = t4.alert_name";

    postgres.sequelize.query(queryString, {
        replacements: {
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

exports.getOverviewSummary = function(params, callback) {
    let queryString = "SELECT t2.component_name, t1.count FROM (SELECT alerts, count(alerts) as count FROM alerts GROUP BY alerts) t1 \
                        LEFT OUTER JOIN (SELECT alert_name, component_name FROM wind_turbine_alerts_vs_components) t2 \
                            ON t1.alerts = t2.alert_name";
    
    postgres.sequelize.query(queryString, {
          type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });  
}

exports.overviewSummaryCount = function(params, callback) {
    let queryString = "SELECT  total_no_alarms, number_of_turbines_affected, number_of_farms_affected \
                        FROM (SELECT 'test'::text as col, count(DISTINCT(turbine_id)) AS number_of_turbines_affected FROM alerts) t1 \
                        JOIN (SELECT 'test'::text as col, count(DISTINCT(farm_name)) AS number_of_farms_affected FROM alerts ) t2 \
                        ON t1.col = t2.col \
                        JOIN (SELECT 'test'::text as col, count(*) AS total_no_alarms FROM alerts ) t3 \
                        ON t1.col = t3.col";

    postgres.sequelize.query(queryString, {
          type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


exports.filter = function(params, callback) {
    let queryString = "";
    switch (params.filterType) {
        case 'distinct':
            queryString = "SELECT  DISTINCT ON (t1.alerts, t1.turbine_id) alerts, turbine_id, t1.id, t1.priority, t1.farm_name, t1.model, t1.date_identified, t1.status , t3.country_name, t3.country_id, t2.type_of_chart , t2.variable_name , t2.variable_id, t2.component_name \
                FROM alerts t1 LEFT OUTER JOIN wind_turbine_alerts_vs_components t2 ON t1.alerts = t2.alert_name LEFT OUTER JOIN turbine_master_datas t3 ON t1.turbine_id = t3.serial_number \
                WHERE "+params.status+" AND date_identified >= :start_date AND date_identified <= :end_date AND "+params.alerts+" AND "+params.priority+" AND "+params.turbines+" AND "+params.farms+
                " order by  t1.alerts, t1.turbine_id, t1.date_identified desc LIMIT :limit OFFSET :offset";
                break;
        case 'all':
            queryString = "SELECT t1.* , t3.country_name, t3.country_id, t2.type_of_chart , t2.variable_name , t2.variable_id, t2.component_name FROM alerts t1 LEFT OUTER JOIN wind_turbine_alerts_vs_components t2 ON t1.alerts = t2.alert_name \
                LEFT OUTER JOIN turbine_master_datas t3 ON t1.turbine_id = t3.serial_number \
                WHERE "+params.status+" AND date_identified >= :start_date AND date_identified <= :end_date AND "+params.alerts+" AND "+params.priority+" AND "+params.turbines+" AND "+params.farms+" order by  date_identified desc LIMIT :limit OFFSET :offset";
            break;

        default :
            queryString = "SELECT t1.* , t3.country_name, t3.country_id, t2.type_of_chart, t2.variable_name , t2.variable_id, t2.component_name FROM alerts t1 LEFT OUTER JOIN wind_turbine_alerts_vs_components t2 ON t1.alerts = t2.alert_name \
                LEFT OUTER JOIN turbine_master_datas t3 ON t1.turbine_id = t3.serial_number \
                WHERE "+params.status+" AND date_identified >= :start_date AND date_identified <= :end_date AND "+params.alerts+" AND "+params.priority+" AND "+params.turbines+" AND "+params.farms+" order by  date_identified desc LIMIT :limit OFFSET :offset";
    }
    
    

  postgres.sequelize.query(queryString, {
          replacements: {
              status: params.status,
              limit: params.entriesPerPage,
              offset: (params.pageNo-1)*(params.entriesPerPage),
               start_date: params.start_date,
               end_date: params.end_date,
              alerts: params.alerts,
              priority: params.priority,
              turbines: params.turbines,
              farms: params.farms
          },
          type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });  
}

// exports.filter = function(params, callback) {
//     console.log("inside filter:  ");
//     let queryString = "";
//     console.log(params.filterType);
//     switch (params.filterType) {
//         case 'distinct':
//         console.log("inside type0");
//             queryString = "SELECT  DISTINCT ON (t1.alerts, t1.turbine_id) alerts, turbine_id, t1.id, t1.priority, t1.farm_name, t1.model, t1.date_identified, t1.status , t2.type_of_chart , t2.variable_name , t2.variable_id, t2.component_name \
//                 FROM alerts t1 LEFT OUTER JOIN wind_turbine_alerts_vs_components t2 ON t1.alerts = t2.alert_name \
//                 WHERE "+params.status+" AND date_identified >= :start_date AND date_identified <= :end_date AND "+params.alerts+" AND "+params.priority+" AND "+params.turbines+" AND "+params.farms+
//                 " order by  t1.alerts, t1.turbine_id, t1.date_identified desc LIMIT :limit OFFSET :offset";
//                 break;
//         case 'all':
//         console.log("inside type1");
//             queryString = "SELECT t1.* , t2.type_of_chart , t2.variable_name , t2.variable_id, t2.component_name FROM alerts t1 LEFT OUTER JOIN wind_turbine_alerts_vs_components t2 ON t1.alerts = t2.alert_name \
//                 WHERE "+params.status+" AND date_identified >= :start_date AND date_identified <= :end_date AND "+params.alerts+" AND "+params.priority+" AND "+params.turbines+" AND "+params.farms+" order by  date_identified desc LIMIT :limit OFFSET :offset";
//             break;

//         default :
//         console.log("inside default");
//             queryString = "SELECT t1.* , t2.type_of_chart , t2.variable_name , t2.variable_id, t2.component_name FROM alerts t1 LEFT OUTER JOIN wind_turbine_alerts_vs_components t2 ON t1.alerts = t2.alert_name \
//                 WHERE $status AND date_identified >= $start_date AND date_identified <= $end_date AND $alerts AND $priority AND $turbines AND $farms order by  date_identified desc LIMIT $limit OFFSET $offset";
//     }
    
    
//     console.log(queryString);
//   postgres.sequelize.query(queryString, {
//           bind: {
//               status: params.status,
//               limit: params.entriesPerPage,
//               offset: (params.pageNo-1)*(params.entriesPerPage),
//                start_date: params.start_date,
//                end_date: params.end_date,
//               alerts: params.alerts,
//               priority: params.priority,
//               turbines: params.turbines,
//               farms: params.farms
//           },
//           type: sequelize.QueryTypes.SELECT
//     }).then(function(data) {
//         callback(true, 200, "Success", data);
//     }).catch(function(err) {
//         console.log(err)
//         callback(false, 300, "Error : " + err, {});
//     });  
// }

exports.filterLength = function(params, callback) {
    
    let queryString = ""
    switch(params.filterType) {
        case 'distinct':
            queryString = "SELECT COUNT(*) FROM (SELECT  DISTINCT ON (t1.alerts, t1.turbine_id) alerts, turbine_id, t1.id, t1.priority, t1.farm_name, t1.model, t1.date_identified, t1.status , t2.type_of_chart , t2.variable_name , t2.variable_id, t2.component_name \
                FROM alerts t1 LEFT OUTER JOIN wind_turbine_alerts_vs_components t2 ON t1.alerts = t2.alert_name \
                WHERE "+params.status+" AND date_identified >= :start_date AND date_identified <= :end_date AND "+params.alerts+" AND "+params.priority+" AND "+params.turbines+" AND "+params.farms+") t3";
                break;
        case 'all':
            queryString = "SELECT COUNT(*) FROM alerts \
                        WHERE "+params.status+" AND date_identified >= :start_date AND date_identified <= :end_date AND "+params.alerts+" AND "+params.priority+" AND "+params.turbines+" AND "+params.farms;
            break;

        default :
            queryString = "SELECT COUNT(*) FROM alerts \
                        WHERE "+params.status+" AND date_identified >= :start_date AND date_identified <= :end_date AND "+params.alerts+" AND "+params.priority+" AND "+params.turbines+" AND "+params.farms;
    }
  postgres.sequelize.query(queryString, {
          replacements: {
              limit: params.entriesPerPage,
              offset: (params.pageNo-1)*(params.entriesPerPage),
               start_date: params.start_date,
               end_date: params.end_date,
          },
          type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });  
}


exports.getAlertHistory = function(params, callback) {
  postgres.alerts.findAll({
    where: {
      date_identified: {
           $lt: params.date_identified
        },
        // alerts: {
        //    $eq: params.alerts
        // },
        turbine_id: {
          $eq: params.turbine_id
        }
      },
    order: [['date_identified', 'DESC']],
    limit : 10
  }).then(function(data) {
        callback(true, 200, "Success", data);
  }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
  });
}


exports.update = function(params, callback) {
  postgres.alerts.update({status: params.status},{
    where: {
      id: params.id
    }
  }).then(function() {
      callback(true, 200, "Success", "data");
  }).catch(function(err) {
      console.log(err)
      callback(false, 300, "Error : " + err, {});
  });
}



exports.totalAlertsByMonth = function(params, callback) {
  let queryString = "select date_trunc('month', date_identified) as month ,  count(alerts) from alerts where date_identified > date_trunc('month', CURRENT_DATE) - INTERVAL '1 year' "+
                    "and turbine_id = $turbine_id group by   date_trunc('month', date_identified) order by month"
  postgres.sequelize.query(queryString, {
          bind: {
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


exports.alertsByComponent = function(params, callback) {
  let queryString = "select t2.component_name , count(t1.alerts) from alerts t1 left outer join wind_turbine_alerts_vs_components t2 on t1.alerts = t2.alert_name \
                     where t1.date_identified > date_trunc('month', CURRENT_DATE) - INTERVAL '1 year' and t1.turbine_id = $turbine_id \
                     group by t2.component_name order by t2.component_name"
    
  postgres.sequelize.query(queryString, {
        bind: {
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



exports.totalAlertsCount = function(params, callback) {
  let queryString = "SELECT status , MAX(COUNT) AS COUNT FROM ( SELECT status , COUNT(*) FROM alerts GROUP BY status UNION SELECT 1 AS status, 0 FROM alerts \
                        UNION SELECT 2 AS status, 0 FROM alerts UNION SELECT 3 AS status, 0 FROM alerts) t1 GROUP BY status";
  postgres.sequelize.query(queryString,{
        type: sequelize.QueryTypes.SELECT
  }).then(function(data) {
      callback(true, 200, "Success", data);
  }).catch(function(err) {
      console.log(err)
      callback(false, 300, "Error : " + err, {});
  });
}


exports.totalAlertsCountByLocation = function(params, callback) {
  let queryString = "SELECT t2.country_name, t2.un AS country_id, COALESCE(t1.count,0) AS count FROM ( \
                        SELECT country_id, count(*) as count FROM alerts LEFT OUTER JOIN  turbine_master_datas ON turbine_id=serial_number WHERE country_id IS NOT NULL GROUP BY  country_id) t1 \
                        RIGHT OUTER JOIN country_code t2   ON t1.country_id = t2.iso"
  postgres.sequelize.query(queryString,{
        type: sequelize.QueryTypes.SELECT
  }).then(function(data) {
      callback(true, 200, "Success", data);
  }).catch(function(err) {
      console.log(err)
      callback(false, 300, "Error : " + err, {});
  });
}


exports.getAlertFarmLevel = function(params, callback) {
  let queryString = "SELECT COALESCE(COUNT(*),0) AS value FROM alerts WHERE turbine_id IN (:turbines)";
  postgres.sequelize.query(queryString,{
      replacements: {
          turbines: params
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
    
    let queryString = "select trim(to_char(EXTRACT(YEAR FROM date_identified), '99999999999999999')) || '-' || trim(to_char(EXTRACT(MONTH FROM date_identified), '99999999999999999')) || '-01' AS time, count(*) \
                        from alerts WHERE date_identified BETWEEN $start_date AND $end_date GROUP BY  EXTRACT(YEAR FROM date_identified), EXTRACT(MONTH FROM date_identified) ORDER BY time";
    postgres.sequelize.query(queryString,{
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


exports.getAlertNameDropDown = function(params, callback) {
    let queryString = "SELECT alert_name FROM wind_turbine_alerts_vs_components";
    postgres.sequelize.query(queryString,{
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}