var alerts = require('../controllers/alerts');
var alert_comments = require('../controllers/alertComments');
import turbine_master_datas from '../controllers/turbineMasterDatas';
import lpf_pba from '../controllers/production_based_availability_&_powerfactor'
import _ from 'underscore';
import moment from 'moment';

// Functions for alert overview
exports.getAlertOverviewTable = function(req, res) {
    let params = JSON.parse(req.query.data);
    alerts.overviewTable(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}

exports.getAlertOverviewSummary = function(req, res) {
    let params = "";
    // let params = JSON.parse(req.query.data);
    alerts.overviewSummaryCount(params, function(s, c, m, data2) {

        lpf_pba.getTotalLpf(params, function(s, c, m, lpf) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: data2.concat(lpf)
            }));
        })
    })
}



//Funcions for alert details
exports.get = function(req, res) {
    var params = JSON.parse(req.query.data);
    params.alerts = ((params.alerts == "") || (params.alerts == null)) ? 'alerts in (alerts)' : "alerts in ('"+(params.alerts.split(',')).join("','")+"')";
    params.status = ((params.status === "") || (params.status == null)) ? 'status in (status)' : 'status in ('+params.status+')';
    params.priority = ((params.priority == "") || (params.priority == null)) ? 'priority in (priority)' : "priority in ('"+(params.priority.split(',')).join("','")+"')";
    params.turbines = ((params.turbines == "") || (params.turbines == null)) ? 'turbine_id in (turbine_id)' : 'turbine_id in ('+params.turbines+')';
    params.farms = ((params.farms == "") || (params.farms == null)) ? 'farm_name in (farm_name)' : "farm_name in ('"+(params.farms.split(',')).join("','")+"')";
    params.start_date = ((params.start_date == "") || (params.start_date == null)) ? '1970-01-01' : params.start_date;
    params.end_date = ((params.end_date == "") || (params.end_date == null)) ? moment().format("YYYY-MM-DD") : params.end_date;
    console.log(params);
    alerts.filter(params, function(s, c, m, data) {
        alerts.filterLength(params, function(s, c, m, length) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: {data:data, length:length}
            }));
        })
    })
}


// exports.getLength = function(req, res) {
//   var params = JSON.parse(req.query.data);
//     params.alerts = ((params.alerts == "") || (params.alerts == null)) ? 'alerts in (alerts)' : "alerts in ('"+(params.alerts.split(',')).join("','")+"')";
//     params.status = ((params.status == "") || (params.status == null)) ? 'status in (status)' : 'status in ('+params.status+')';
//     params.priority = ((params.priority == "") || (params.priority == null)) ? 'priority in (priority)' : "priority in ('"+(params.priority.split(',')).join("','")+"')";
//     params.turbines = ((params.turbines == "") || (params.turbines == null)) ? 'turbine_id in (turbine_id)' : 'turbine_id in ('+params.turbines+')';
//     params.farms = ((params.farms == "") || (params.farms == null)) ? 'farm_name in (farm_name)' : "farm_name in ('"+(params.farms.split(',')).join("','")+"')";
//     params.start_date = ((params.start_date == "") || (params.start_date == null)) ? '1970-01-01' : params.start_date;
//     params.end_date = ((params.end_date == "") || (params.end_date == null)) ? moment().format("YYYY-MM-DD") : params.end_date; 
//     alerts.filterLength(params, function(s, c, m, d) {
//         res.send(JSON.stringify({
//             status: s,
//             code: c,
//             message: m,
//             data: d
//         }));
//     })
// }


exports.getDropDown = function(req, res) {
  let params = JSON.parse(req.query.data);
  alerts.getDropDown(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}


exports.getAlertHistory = function(req, res) {
  let params = JSON.parse(req.query.data);
  alerts.getAlertHistory(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}


exports.update = function(req, res) {
//   var params = req.query;
  var params = JSON.parse(req.body.data);
  alerts.update(params, function(s, c, m, d) {
      params.alerts = ((params.alerts == "") || (params.alerts == null)) ? 'alerts in (alerts)' : "alerts in ('"+(params.alerts.split(',')).join("','")+"')";
      params.priority = ((params.priority == "") || (params.priority == null)) ? 'priority in (priority)' : "priority in ('"+(params.priority.split(',')).join("','")+"')";
      params.turbines = ((params.turbines == "") || (params.turbines == null)) ? 'turbine_id in (turbine_id)' : 'turbine_id in ('+params.turbines+')';
      params.farms = ((params.farms == "") || (params.farms == null)) ? 'farm_name in (farm_name)' : "farm_name in ('"+(params.farms.split(',')).join("','")+"')";
      params.start_date = ((params.start_date == "") || (params.start_date == null)) ? '1970-01-01' : params.start_date;
      params.end_date = ((params.end_date == "") || (params.end_date == null)) ? moment().format("YYYY-MM-DD") : params.end_date;
      params.status = params.cur_status;
      params.status = ((params.status === "") || (params.status == null)) ? 'status in (status)' : 'status in ('+params.cur_status+')';
      alerts.filter(params, function(s, c, m, data) {
              alerts.filterLength(params, function(s, c, m, length) {
                  res.send(JSON.stringify({
                      status: s,
                      code: c,
                      message: m,
                      data: {data:data, length:length}
                  }));
              })
          })
  })
}


exports.alertsByComponent = function(req, res) {
  let params = {turbine_id : req.query.turbine_id};
//   var params = req.query;
  alerts.alertsByComponent(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}


exports.totalAlertsByMonth = function(req, res) {
  let params = {turbine_id : req.query.turbine_id};
//   var params = req.query;
  alerts.totalAlertsByMonth(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}


exports.totalAlertsCount = function(req, res) {
    let params = req.query;
    //var params = JSON.parse(req.body.data);
  alerts.totalAlertsCount(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}


exports.totalAlertsCountByLocation = function(req, res) {
  let params = req.query;
  //var params = JSON.parse(req.body.data);
  alerts.totalAlertsCountByLocation(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}


exports.postAlertComment = function(req, res) {
 // var params = req.body;
  let params = JSON.parse(req.body.data);
  alert_comments.create(params, function(s, c, m, d) {
      alert_comments.get(params, function(s, c, m, d) {
          res.send(JSON.stringify({
              status: s,
              code: c,
              message: m,
              data: d
          }));
      })
  })
}


exports.getAlertComment = function(req, res) {
  let params = req.query;
//   var params = JSON.parse(req.body.data);
  alert_comments.get(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}


exports.getAlertFarmLevel = function(req, res) {
    //var params = req.query;
  let params = JSON.parse(req.query.data);
    turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
            d = _.map(d, function(item) {
                    return item.serial_number
                });
        alerts.getAlertFarmLevel(d, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        });
    });
}


exports.getFleetAverageMonthly = function(req, res) {
    //var params = req.query;
//   var params = JSON.parse(req.query.data);
    let params = "";
    alerts.getFleetAverageMonthly(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    });
}


exports.getAlertDropdown = function(req, res) {
    //var params = req.query;
//   var params = JSON.parse(req.query.data);
    let params = "";
    alerts.getAlertNameDropDown(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    });
}