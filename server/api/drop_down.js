var variables = require('../controllers/variables');
var turbine_master = require('../controllers/turbineMasterDatas');
var _ = require('underscore');

exports.getVariables = function(req, res) {
  var params = req.query;
  variables.get(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })

};

exports.getFarms = function (req, res) {
    var params = req.query;
    turbine_master.getFarms(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: _.uniq(d)
        }));
    })
}


exports.getTurbinesFromFarm = function (req, res) {
    var params = JSON.parse(req.query.data);
    turbine_master.getTurbinesFromFarm(params.wind_farm, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: _.uniq(d)
        }));
    })
}

//give turbines from same farma st the turbine irrespective of the types
// exports.getTurbines = function (req, res) {
//     let params = JSON.parse(req.query.data);
//     turbine_master.getFarmFromTurbine(params, function(s, c, m, d) {
//         console.log(d[0].dataValues.wind_farm)
//         turbine_master.getTurbinesFromFarm(d[0].dataValues.wind_farm ,  function(s, c, m, d) {
//             res.send(JSON.stringify({
//                 status: s,
//                 code: c,
//                 message: m,
//                 data: d
//             }));
//         })
        
//     })
// }

exports.getTurbines = function (req, res) {
    let params = JSON.parse(req.query.data);
    turbine_master.getFarmFromTurbine(params, function(s, c, m, d) {
        params.wind_farm = d[0].dataValues.wind_farm;
        turbine_master.getTurbinesFromFarmWithSameType(params ,  function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        
    })
}

exports.getAllTurbines = function (req, res) {
    let params = "";    
    turbine_master.getAllTurbines(params ,  function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));        
    })
}

exports.getCountry = function (req, res) {
    let params = ""
    turbine_master.getAllCountries(params ,  function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


exports.getFarmFromCountry = function (req, res) {
    let params = JSON.parse(req.query.data);
    turbine_master.getFarmFromCountry(params ,  function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}

//GET ALL THE PLACES IN FORM OF country,wind_farm,turbine_id

exports.getPlaces = function (req, res) {
    let params = JSON.parse(req.query.data);  ;
    turbine_master.getPlaces(params ,  function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}