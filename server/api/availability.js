import availability from '../controllers/availability';
import turbine_master_datas from '../controllers/turbineMasterDatas';
import _ from 'underscore'; 

exports.get = function(req, res) {
  var params = JSON.parse(req.query.data);
  switch(params.id) {
  //'turbine'
      case 0:
        availability.getTurbine(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
//'america'
      case 1:
        availability.getAmerica(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
//'australia'
      case 2:
        availability.getAustralia(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
//'eu_central'
      case 3:
        availability.getEUCentral(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
//'eu_north'
      case 4:
        availability.getEUNorth(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
//'eu_south_east'
      case 5:
        availability.getEUSouthEast(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
//'eu_south_west'
      case 6:
        availability.getEUSouthWest(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
//'onshore'
      case 7:
        availability.getOnShore(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
//'offshore'
      case 8:
        availability.getOffShore(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
//'all'
      case 9:
        availability.getAll(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;

      default:
         availability.getAll(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
  }
  
}

exports.getBestAndWorst = function(req, res) {
    var params = req.query;
    switch(params.type){
        case 'bestFarm':
            availability.getBestAvailableFarms(params, function(s, c, m, d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            })
            break;

        case 'bestTurbine':
            availability.getBestAvailableTurbines(params, function(s, c, m, d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            })
            break;
            
        case 'worstFarm':
            availability.getWorstAvailableFarms(params, function(s, c, m, d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            })
            break;
            
        case 'worstTurbine':
            availability.getWorstAvailableturbines(params, function(s, c, m, d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            })
            break;
            
        default:
            availability.getBestAvailableFarms(params, function(s, c, m, d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            })
    }
}


//FARM LEVEL
//***************************************************************************** */
exports.getFarmLevel = function(req, res) {
    var params = JSON.parse(req.query.data);
    turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
            d = _.map(d, function(item) {
                    return item.serial_number
                });
        availability.getFarm(d, params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        });
    });   
  }

 
  exports.getFarmLevelAverage = function(req, res) {
    var params = JSON.parse(req.query.data);
    turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
            d = _.map(d, function(item) {
                    return item.serial_number
                });
        availability.getFarmAverage(d, params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        });
    });   
  }


  //********************************************************************************** */

//FULL FLEET
//***************************************************************************** */
  exports.getFleetAverageMonthly = function(req, res) {
    // var params = JSON.parse(req.query.data);
    var params =""; 
        availability.getFleetAverageMonthly(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    });       
  }

  //********************************************************************************** */

