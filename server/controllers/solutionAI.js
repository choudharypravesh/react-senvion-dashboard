var PythonShell = require('python-shell');

//var params = [2055, 2056, 2057]

exports.causeAI = function(params, callback) {
    var options = {
        scriptPath: './server/recommendation',
        args: params
    };
    console.log(typeof params);
    PythonShell.run('recommend_solution_using_cosine_similarity.py', options, function(err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        callback(true, 200, "Success", results);
    });
}

exports.observationAI = function(params, callback) {
    var options = {
        scriptPath: './server/recommendation',
        args: params
    };
    console.log(params);
    PythonShell.run('recommend_observation_using_cosine_similarity.py', options, function(err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        callback(true, 200, "Success", results);
    });
}

//create csv file for recomendation
exports.createStagingFile = function (params, callback) {
    var options = {
        scriptPath: './server/recommendation/mapped_code',
        args: params
    };
    PythonShell.run('CreateCauseVsObservationDataFrame.py', options, function (err, results) {
        if (err) throw err;
        PythonShell.run('CreateCauseVsStatusCodeDataFrame.py', options, function (err, results) {
            callback(true, 200, "Success", results);
        })
    }) 
}