var node_controller = require('../controllers/solutionGraphs');
var neo4j_db = require('../neo_db/connection');
var _ = require('underscore');

var tags = ["observation", "system", "sub_system", "status_code"];
var req = {};

exports.createNodesGraphsSolutions = function(req, params, callback) {

    //var params = (req.body);
    console.log(params);
    var param = {
        from_type: "",
        to_type: "cause",
        from_name: "",
        to_name: params.cause
    };
    
    for (var i in tags) {
        var array_conv = params[tags[i]].split(',');
        for (var j in array_conv) {
            var star = array_conv[j];
            param.from_type = tags[i];
            param.from_name = array_conv[j];
            param.created_by = params.created_by;
            param.created_at = params.created_at;
            param.approved_by = params.approved_by;
            param.approved = params.approved;
            param.approved_at = params.approved_at;

            node_controller.createNodeWithRelations(param, neo4j_db.getSession(req));
        }
    }
    node_controller.createSolutionForCause(params, neo4j_db.getSession(req), function(s, c, m, d) {
        callback(s, c, m, d);
    })

};


exports.getRecommendedCause = function(req, res) {
    var paramsa = {
        observations: []
    };

    var params = req.body;
    paramsa.observations = params.observations.split(',');

    node_controller.getCause(paramsa, neo4j_db.getSession(req), function(s, c, m, d) {
        var data = [];
        for (var i in d) {
            data.push("{name: " + d[i]._fields[0] + " , id: " + d[i]._fields[1].low + "}");
        }
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: data
        }));
    })
};


exports.getSearchRecommendation = function(req, res) {
    var params = (req.body);
    console.log(params);
    node_search.getDropDownList(params, neo4j_db.getSession(req), function(s, c, m, d) {
        var data = [];
        for (var i in d) {
            data.push.apply(data, d[i]._fields);
        }
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: data
        }))
    })
};


exports.getDropDownRecommendation = function(req, res) {
    var params = req.query;
    node_controller.getDropDownData(params, neo4j_db.getSession(req), function(s, c, m, d) {
        var data = {
            status_code: [],
            observation: [],
            system: [],
            sub_system: []
        };
        for (var i in d) {
            //var x = d[i]._fields[2][0];
            data[d[i]._fields[2][0]].push({ value: d[i]._fields[0], label: d[i]._fields[0] });
        }

        console.log(data);

        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: data
        }));
    })
};

exports.getObservationFromCauseId = function(params, res) {
    var data = [];
    var output = [];
    console.log("params");
    node_controller.getObservationFromCauseId(params, neo4j_db.getSession(req), function(s, c, m, d) {
        console.log("getObservationFromCauseId : " + d);
        for (var i in d) {
            data.push({ value: d[i]._fields[0].low, label: d[i]._fields[1] })
        }
        for (var i in data) {
            var count = 0;
            for (var j in output) {
                if (data[i].value == output[j].value) {
                    count = count + 1
                }
            }
            if (count == 0) {
                output.push(data[i])
            }
        }
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: output.slice(0, 20)
        }));
    });
};
exports.getObservationTokenFromCauseId = function(count, params, res) {
    var data = [];
    var output = [];
    var def_value = 9;
    node_controller.getObservationFromCauseId(params, neo4j_db.getSession(req), function(s, c, m, d) {
        console.log(d);
        for (var i in d) {
            data.push({ value: d[i]._fields[0].low, lable: d[i]._fields[1] })
        }
        for (var i in data) {
            var count = 0;
            for (var j in output) {
                if (data[i].value == output[j].value) {
                    count = count + 1
                }
            }
            if (count == 0) {
                output.push(data[i])
            }
        }
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: output.slice(9, 9 + count)
        }));
    });
};


exports.getProbableCause = function(params, callback) {
    var data = [];
    node_controller.getCauseFromCauseId(params, neo4j_db.getSession(req), function(s, c, m, d) {
        for (var i in d) {
            data.push({ value: d[i]._fields[0].low, label: d[i]._fields[1], percentage: "" })
        }
        callback(s, c, m, data);
    });
};

exports.getSolutionFromCause = function(req, res) {
    var params = req.query.data;
    console.log(params);
    node_controller.getSolution(params, neo4j_db.getSession(req), function(s, c, m, d) {
        console.log(d);
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }))
    })
};