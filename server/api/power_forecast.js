import power_forecast from '../controllers/powerforecast'

exports.getGraphDetails = function(req, res) {
    console.log("comming to getGraphDetails");

    var params = JSON.parse(req.query.data);

    power_forecast.get(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}
