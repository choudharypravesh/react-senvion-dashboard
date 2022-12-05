import StatusCodes from '../controllers/statusCodes';
import solution_graph from './solution_graph'


exports.createSolution = function(req, res) {
    console.log("coming here in the function createstatus code");
    console.log("req " + JSON.stringify(req.body));
    var params = JSON.parse(req.body.data);
    StatusCodes.create(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })

}


exports.approveRejectSolution = function(req, res) {
    var params = JSON.parse(req.body.data);
    //var params = (req.body);
    console.log(params.approved);
    StatusCodes.update(params.id, params, function(s, c, m, d) {
        console.log(s, c, m, d);
        StatusCodes.getUpdated(params, function(s, c, m, d) {
            console.log(s, c, m, d[0]);
            if (d[0].approved) {
                console.log('approved confirmed');
                solution_graph.createNodesGraphsSolutions(req, d[0], function(s, c, m, d) {
                    StatusCodes.getCreatedSolutionsSuperAdmin(function(s, c, m, d) {
                        console.log(s, c, m, d)
                        res.send(JSON.stringify({
                            status: s,
                            code: c,
                            message: m,
                            data: d
                        }));
                    })
                });
            } else {
                console.log('not approved');
                StatusCodes.getCreatedSolutionsSuperAdmin(function(s, c, m, d) {
                    console.log(s, c, m, d)
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    }));
                })
            }

        });
    });
}


exports.getSolutions = function(req, res) {
    console.log(JSON.stringify(req.query));
    var params = req.query;
    StatusCodes.get(params, function(s, c, m, d) {
        console.log(s, c, m, d)
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}

exports.getCreatedSolutionsUser = function(req, res) {
    console.log(JSON.stringify(req.query));
    var user_id = req.query.user_id;
    console.log("params ki user id " + user_id);
    StatusCodes.getCreatedSolutionsUser(user_id, function(s, c, m, d) {
        console.log(s, c, m, d)
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}

exports.getCreatedSolutionsSuperAdmin = function(req, res) {
    console.log(JSON.stringify(req.query));
    StatusCodes.getCreatedSolutionsSuperAdmin(function(s, c, m, d) {
        console.log(s, c, m, d)
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


exports.chatSessionGetSolution = function(req, res) {
    console.log(JSON.stringify(req.query.data));
    var params = JSON.parse(req.query.data);
    console.log(params);
    StatusCodes.get(params, function(s, c, m, d) {
        console.log(s, c, m, d)
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })

}