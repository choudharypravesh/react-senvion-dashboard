import _ from 'underscore'

exports.getSearch = function(params, session, callback) {
    var tx = session.beginTransaction();

    console.log(params.searchkey);
    console.log(params);
    console.log(params.nodetype);
    tx
        .run("MATCH (n:" + params.nodetype + ") where n.name CONTAINS {search_string} return n", {
            search_string: params.searchkey
        }).then(function(result) {
            callback(true, 200, "Success", result.records);
            // console.log(true, 200, "Success", result.records);
        }).catch(function(err) {
            console.log(err);
            console.log("some error");
            callback(false, 300, "Error : " + err, {});
            console.log(false, 300, "Error : " + err, {});
        });
    tx.commit();
};
