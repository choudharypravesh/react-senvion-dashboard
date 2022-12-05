import troubleshootSession from '../controllers/troubleshootSession';



exports.createTroubleshootSessionDetails = function(req, res) {
    console.log("comming to createtroubleshootSessionDetails");

    var params = JSON.parse(req.body.data);
    //var params = (req.body);
    console.log(params);

    troubleshootSession.create(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


exports.updateTroubleshootSessionDetails = function(req, res) {
    console.log("comming to updatetroubleshootSessionDetails");

    var params = JSON.parse(req.body.data);
    //var params = (req.body);
    console.log(params);
    //var session_id = "5f6bcaab8d242226c2f748762b76e10d266edd7c";
    troubleshootSession.update(session_id, params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


exports.getTroubleshootSessionDEtails = function(req, res) {
    console.log('comming to gettroubleshootSessionDetails');

    var params = JSON.parse(req.body.data);
    console.log(params);
    troubleshootSession.get(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}