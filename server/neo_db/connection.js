var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://172.20.104.86:7687", neo4j.auth.basic("neo4j", "root"), {
    encrypted: "ENCRYPTION_ON"
});
/*
exports.driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "root"), {
    encrypted: "ENCRYPTION_ON"
});
*/



exports.getSession = function(context) {
    if (context.neo4jSession) {
        return context.neo4jSession;
    } else {
        context.neo4jSession = driver.session();
        return context.neo4jSession;
    }
};

exports.neo4jSessionCleanup = function(req, res, next) {
    //res.on('finish', function() {
    if (req.neo4jSession) {
        req.neo4jSession.close();
        delete req.neo4jSession;
    }
    //});
    //next();
};