import alertStage from '../controllers/alertStage';

exports.timestamp = function(req, res) {
    // var params = req.query;
    var params = JSON.parse(req.query.data);
    alertStage.getPhcTimeStamp(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}