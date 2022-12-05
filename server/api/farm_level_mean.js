import thermal from '../controllers/farmLevelMeanThermal';
//var _ = require('underscore');

exports.nearestTurbineFarmMean = function(req, res) {
    let params = JSON.parse(req.query.data);
    thermal.get(params, function (s,c,m,d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}