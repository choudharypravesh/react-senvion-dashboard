import userSession from '../controllers/userSession';
import UserCredentials from '../controllers/userCredentials';



var createUserSession = exports.createUserSession = function(params, callback) {
    console.log("comming to createUserSessionDetails");

    console.log(params.user_id);

    userSession.create(params, function(s, c, m, d) {
            callback(s,c,m,d);
    })
}


exports.updateUserSessionDetails = function(req, res) {
    console.log("comming to storeUserSessionDetails");

    var params = JSON.parse(req.body.data);
    console.log(params);
    var session_id = "a124";
    userSession.update(session_id, params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


exports.getUSERSessionDEtails = function(req, res) {
    console.log('comming to getUserSessionDetails');

    var params = JSON.parse(req.body.data);
    console.log(params);
    userSession.get(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}



exports.login = function(req, res) {
    let params = JSON.parse(req.body.data);
    let loginData = {
        username: params.username.toLowerCase().trim(),
        password: params.password
    }
    console.log(loginData);
    console.log("session start time "+params.session_start_time);

    if(loginData.username && loginData.password) {
        UserCredentials.login(loginData, function(s,c,m,d) {
            console.log(s,c,m,JSON.stringify(d));
            if(s) {
                let user_id = d[0].user_id;
                console.log("user_id "+user_id);
                console.log("session start time "+params.session_start_time);
                let sessionData  = {
                    user_id: user_id,
                    session_start_time: params.session_start_time,
                    session_end_time: params.session_end_time,
                    is_active: true
                }
                createUserSession(sessionData, function(s1,c1,m1,d1) {
                    if(s1) {
                        var sessionObject = {
                            user_id: d[0].user_id,
                            session_id: d1.session_id,
                            user_type: d[0].user_type,
                            user_name: params.username,
                            name: d[0].name,
                            picture: (d[0].user_pic == null) ? 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png' : d[0].user_pic
                        }
                        console.log(sessionObject);
                        res.send(JSON.stringify({
                            status: true,
                            code: 200,
                            message: "Logged In Successfully",
                            data: sessionObject
                        }));
                    } else {
                        res.send(JSON.stringify({
                            status: false,
                            code: 300,
                            message: "Logged In Successfully but session not created",
                            data: d1
                        }));
                    }
                })
            } else {
                res.send(JSON.stringify({
                    status: false,
                    code: 400,
                    message: "User with these credentials does not exist. Please try again!",
                    data: null
                }));
            }
        })
    } else {
        res.send(false, 400, "Error", "Username OR Password not there!");
    }
}