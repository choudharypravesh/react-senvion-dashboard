import scada from '../controllers/lvs_scada';
import variables from '../MetaData/variables.json';
import realTime from '../controllers/lvs_realTime';
import turbineMasterDatas from '../controllers/turbineMasterDatas';
import _ from 'underscore';

exports.getScadaDetails = function(req, res) {
  console.log("scada api");
  var params = JSON.parse(req.query.data);
  //var params = (req.query);
  console.log(params);
  var variable = "";
  let variable_list = params.variable.split(',');
  console.log(variable_list);
  for (let x in variable_list) {
      if (variable == "") {
          variable = variables[variable_list[x]]
      } else {
          variable = variable+","+variables[variable_list[x]]
      }

  }
  console.log(variable);

  params.variable = variable;
  var one_day=1000*60*60*24;
  var start = Date.parse(params.start_date, "Y-m-d");
  var end = Date.parse(params.end_date, "Y-m-d");
  var date1 = new Date(start)
  var date2 = new Date(end)
  var difference_day = Math.round((date2 - date1)/one_day);
  var days = difference_day+1
  console.log(difference_day);

  if (difference_day <= 90) {
    console.log('get all');
    scada.get10MinLevel(params, function (s,c,m,d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
  }else if (90 < difference_day) {
    console.log('get daily');
    scada.getDayLevel(params, function (s,c,m,d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
  }
}

exports.getScadaDetails3Variable = function(req, res) {
  console.log("scada api");
  var params = JSON.parse(req.query.data);
  //var params = (req.query);
  console.log(params);
  var variable = "";
  let variable_list = params.variable.split(',');
  console.log(variable_list);
  for (let x in variable_list) {
      if (variable == "") {
          variable = variables[variable_list[x]]
      } else {
          variable = variable+","+variables[variable_list[x]]
      }

  }
  console.log(variable);

  params.variable = variable;
  var one_day=1000*60*60*24;
  var start = Date.parse(params.start_date, "Y-m-d");
  var end = Date.parse(params.end_date, "Y-m-d");
  var date1 = new Date(start)
  var date2 = new Date(end)
  var difference_day = Math.round((date2 - date1)/one_day);
  var days = difference_day+1
  console.log(difference_day);

  if (difference_day <= 180) {
    console.log('get all');
    scada.get10MinLevel(params, function (s,c,m,d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
  }else if (180 < difference_day) {
    console.log('get daily');
    scada.getDayLevel(params, function (s,c,m,d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
  }
}

exports.getRealTimeScadaDetails = function(req, res) {
  console.log("scada api");
  var params = JSON.parse(req.query.data);
//   var params = (req.query);
  console.log(params);
  turbineMasterDatas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
      let turbine_list = _.map(d, function(x) {
          return x.serial_number;
      })
      realTime.getDayLevel(turbine_list, function (s,c,m,d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    });
  });
  
}
