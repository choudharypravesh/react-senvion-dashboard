var neo4j_db = require('../neo_db/connection');
var node_search = require('../controllers/searchbarFunctionality');
var _ = require('underscore');


exports.observationSearch = function(req, res) {
	var params = {
	              nodetype: 'observation',
	              searchkey: req.query.q
	}
	console.log(params)
	node_search.getSearch(params, neo4j_db.getSession(req), function(s, c, m, d) {
		res.send(JSON.stringify({
		    status: s,
		    code: c,
		    message: m,
				data: _.map(d , function (item) {
						return { value: item._fields[0].identity.low, label: item._fields[0].properties.name }
				})
		}));
	})
}

exports.statusCodeSearch = function(req, res) {
    var params = {
        nodetype: 'status_code',
        searchkey: req.query.q
    }
    console.log(params)
    node_search.getSearch(params, neo4j_db.getSession(req), function (s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: _.map(d, function (item) {
                return {value: item._fields[0].identity.low, label: item._fields[0].properties.name}
            })
        }));
    })
}