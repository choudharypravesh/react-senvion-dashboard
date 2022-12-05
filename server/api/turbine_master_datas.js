import turbineMasterData from '../controllers/turbineMasterDatas';
import lvs_turbineMasterData from '../controllers/lvs_turbineMasterDatas';
import _ from 'underscore';

exports.get = function(req, res) {
  var params = req.query;
  turbineMasterData.get(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}


exports.getPositionFromFarm = function(req, res) {
  let params = JSON.parse(req.query.data);
  console.log(params);
    console.log("here is params11", params)
    turbineMasterData.getTurbinesLocationsFromFarm(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })       
}


exports.getMap = function(req, res) {
  var params = req.query;
  turbineMasterData.getMap(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}

exports.getMapData = function(req, res) {
  let params = JSON.parse(req.query.data);
  lvs_turbineMasterData.getMapData(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}
