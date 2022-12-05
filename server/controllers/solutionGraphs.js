exports.createNodeWithRelations = function(params, session) {
    var to_type = params.to_type;
    var from_type = params.from_type;
    var tx = session.beginTransaction();
    console.log(params);
    tx
        .run("MERGE (t:" + to_type + " {name: {to_name}}) " +
            "ON CREATE SET t.created_by = {user_id} , t.created_at = {created_at} , t.approved_by = {approved_by} , t.approved_at = {approved_at} " +
            "MERGE (f:" + from_type + " {name: {from_name}}) " +
            "ON CREATE SET f.created_by = {user_id} , f.created_at = {created_at} , f.approved_by = {approved_by} , f.approved_at = {approved_at} " +
            "CREATE UNIQUE (t) <- [ cause:" + from_type + "_to_" + to_type + " {weight: 0}] - (f)", {
                to_name: params.to_name,
                from_name: params.from_name,
                user_id: params.created_by,
                created_at: params.created_at,
                approved_by: params.approved_by,
                approved_at: params.approved_at
            }).then(function() {
            //callback(true, 200, "Success", "data");
            console.log(true, 200, "Success", "data");
        }).catch(function(err) {
            //callback(false, 300, "Error : " + err, {});
            console.log(false, 300, "Error : " + err, {});
        });
    tx.commit();
};

exports.createSolutionForCause = function(params, session, callback) {
    var tx = session.beginTransaction();
    tx
        .run("MERGE (t:solution {cause: {from_name}}) " +
            "ON CREATE SET t.name= {to_name} , t.created_by = {user_id} , t.created_at = {created_at} , t.approved_by = {approved_by} , t.approved_at = {approved_at} " +
            "MERGE (f:cause {name: {from_name}}) " +
            "ON CREATE SET f.created_by = {user_id} , f.created_at = {created_at} , f.approved_by = {approved_by} , f.approved_at = {approved_at} " +
            "CREATE UNIQUE (t) <- [ name:cause_to_solution {weight: 0 , created_by: {user_id} , created_at: {created_at} , approved_by: {approved_by} , approved_at: {approved_at}}] - (f)", {
                to_name: params.solution,
                from_name: params.cause,
                user_id: params.created_by,
                created_at: params.created_at,
                approved_by: params.approved_by,
                approved_at: params.approved_at
            }).then(function() {
            callback(true, 200, "Success", "data");
        }).catch(function(err) {
            console.log(err);
            console.log("some error");
            callback(false, 300, "Error : " + err, {});
        });
    tx.commit();
};

exports.getCause = function(params, session, callback) {
    var tx = session.beginTransaction();
    console.log(params.observations);
    tx
        .run("MATCH (o:observation)-[rel]-(c:cause) " +
            "WHERE o.name IN {observation_list} " +
            "RETURN c.name , ID(c) as id, count(*) as times ORDER BY times DESC", {
                observation_list: params.observations
            }).then(function(result) {
            callback(true, 200, "Success", result.records);
            console.log(result.records[0]);
        }).catch(function(err) {
            console.log(err);
            callback(false, 300, "Error : " + err, {});
        });
    tx.commit();
}


exports.getSolution = function(params, session, callback) {
    var tx = session.beginTransaction();
    console.log("comming to solution")
    console.log(typeof (params));
    tx
        .run("MATCH (s:solution)-[rel]-(c:cause) " +
            "WHERE ID(c) =  "+Number(params)+
            " RETURN s.name ", {
                causeID: Number(params)
            }).then(function(result) {
            callback(true, 200, "Success", result.records);
        }).catch(function(err,result) {
            callback(false, 300, "Error : " + err, {});
        });
    tx.commit();
}

exports.getDropDownData = function(params, session, callback) {
    console.log("coming into getDri=opdown");
    var tx = session.beginTransaction();
    console.log(params);
    tx
        .run("MATCH (n) WHERE n:status_code return n.name , ID(n) , labels(n)" +
            "UNION " +
            "MATCH (n) where n:observation RETURN n.name , ID(n) , labels(n)" +
            "UNION " +
            "MATCH (n) where n:system RETURN n.name , ID(n) , labels(n)" +
            "UNION " +
            "MATCH (n) where n:sub_system RETURN n.name , ID(n) , labels(n)"
        ).then(function(result) {
            callback(true, 200, "Success", result.records);
        }).catch(function(err) {
            console.log(err);
            console.log("some error");
            callback(false, 300, "Error : " + err, {});
        });
    tx.commit();
}


exports.getObservationsFromStausCodes = function(status_code, session, callback) {
    var tx = session.beginTransaction();
    console.log(status_code);
    tx
        .run("MATCH (sc:status_code {name: {status_code_name}})-[rel1]-(c:cause)-[rel2]-(o:observation) RETURN o.name ", {
            status_code_name: status_code.toString()
        }).then(function(result) {
            callback(true, 200, "Success", result.records);
            console.log(result);
        }).catch(function(err) {
            callback(false, 300, "Error : " + err, {});
        });
    tx.commit();
}

//used to get the related observation to a cause using its causeID
exports.getObservationFromCauseId = function(params, session, callback) {
    console.log(params)
    var tx = session.beginTransaction();
    tx
        .run("MATCH (c:cause)-[rel]-(o:observation) WHERE ID(c) in {causeID} RETURN ID(o) , o.name", {
            causeID: params
        }).then(function(result) {
            console.log(result.records[0])
            callback(true, 200, "Success", result.records);
        }).catch(function(err) {
            callback(false, 300, "Error : " + err, {});
        });
    tx.commit();
}

exports.getCauseFromCauseId = function(params, session, callback) {
    console.log(params)
    var tx = session.beginTransaction();
    tx
        .run("MATCH (c:cause) WHERE ID(c) in {causeID} RETURN ID(c) , c.name", {
            causeID: params
        }).then(function(result) {
            console.log(result.records[0])
            callback(true, 200, "Success", result.records);
        }).catch(function(err) {
            callback(false, 300, "Error : " + err, {});
        });
    tx.commit();
}
/*
//Edit data in neo4j
//Get all the causes for editing
exports.getAllcause = function(params, session, callback) {
  console.log(params);
  var tx = session.beginTransaction();
  tx
      .run("MATCH (c:cause) RETURN c"
    ).then(function(result) {
      callback(true, 200, "Success", result.records);
    }).catch(function(err) {
      callback(false, 300, "Error :" +err, {});
    });
}

//Get all the attributes related to that cause for editing
exports.getAllFromCauseId = function(params, session, callback) {
  console.log(params);
  var tx = session.beginTransaction();
  tx
      .run("MATCH (n:cause{name: {cause}})-[rel]-(node) RETURN n,rel"
    ).then(function(result) {
      callback(true, 200, "Success", result.records);
    }).catch(function(err) {
      callback(true, 300, "Error : "+err, {})
    });
}

//set the new value to any node after change
exports.getAllFromCauseId = function(params, session, callback) {
  console.log(params);
  var tx = session.beginTransaction();
  tx
      .run("MATCH (n:+"type"+) WHERE ID(n) = {id}  SET n.name={value}",{
        id: params.id,
        value: params.value
    }).then(function(result) {
      callback(true, 200, "Success", result.records);
    }).catch(function(err) {
      callback(true, 300, "Error : "+err, {})
    });
}
*/
