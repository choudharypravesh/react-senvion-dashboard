var solutionAI = require('../controllers/solutionAI')
var orderDetails = require('../controllers/troubleshootView')
var solution_graph = require('./solution_graph')
var solutionGraphs = require('../controllers/solutionGraphs')
var solutionRecommendation = require('../controllers/solutionRecommendation')
var searchbar = require('../controllers/searchbarFunctionality')

exports.getObservation = function(req, res) {
    var params = req.query;
    orderDetails.getStatusCodes(params, function(s, c, m, d) {
        console.log("getObservation : " + JSON.stringify(d));
        var codes = d[0].status_codes;
        solutionAI.observationAI(codes, function(s, c, m, d) {
            var causeIDs = [];
            var data = JSON.parse(d)
            console.log(data)
            for (var i in data) {
                causeIDs.push(data[i]['index']);
            }
            solution_graph.getObservationFromCauseId(causeIDs, res)
        })
    })
};

exports.getObservationToken = function(req, res) {
    console.log(req.query);
    var params = req.query;
    orderDetails.getStatusCodes(params, function(s, c, m, d) {
        var codes = d[0].status_codes;
        solutionAI.observationAI(codes, function(s, c, m, d) {
            var causeIDs = [];
            var data = JSON.parse(d)
            for (var i in data) {
                causeIDs.push(data[i]['index']);
            }
            solution_graph.getObservationTokenFromCauseId(params.count, causeIDs, res)
        })
    })
};


exports.getCause = function(req, res, callback) {
	//var user_id = req.query. ;
	var order_id = 3;
    var params = req.query.tags;
    console.log('here is the data : '+ JSON.stringify(params));
    solutionAI.causeAI(params, function(s, c, m, d) {
        var causeIDs = [];
        var data = JSON.parse(d)
        for (var i in data) {
            causeIDs.push(data[i]['index']);
        }
        solution_graph.getProbableCause(causeIDs, function(s, c, m, causeIdWithName) {
            var  cause_list = (causeIdWithName)
            for (var i in cause_list) {
                for (var j in data) {
                    if (cause_list[i].value == data[j]['index']) {
                    	cause_list[i].percentage = data[j]['cosine_similarity']
                    	cause_list[i].observations = (data[j]['observations']).toString()
                    }
                }
            }

            for (var cause in cause_list) {
            	console.log("cause: "+JSON.stringify(cause_list[cause]));
            	solutionRecommendation.create(order_id, cause_list[cause], function (status, code, message, data) {
            		console.log(JSON.stringify({
	                status: status,
	                code: code,
	                message: message,
	                data: data
	            }));
            	})
            }
            console.log(JSON.stringify(cause_list));
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: cause_list
            }));

        })

    })
};
