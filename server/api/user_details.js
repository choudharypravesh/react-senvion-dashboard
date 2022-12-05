import UserCredentials from '../controllers/userCredentials';
import UserDetails from '../controllers/userDetails';
import fs from 'fs'

var multer  = require('multer')

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log("inside destination");
        console.log(__dirname.substring(0, __dirname.lastIndexOf('/'))+'/files');
        callback(null, './files/');
    },
    filename: function(req, file, callback) {
        console.log("inside filename");
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).single('photo')


exports.login = function(req, res) {
    var params = JSON.parse(req.body.data);
    var username = params.username.toLowerCase().trim();
    var password = params.password;

    if(username && password) {
        UserCredentials.login(params, function(s,c,m,d) {
            console.log(s,c,m,JSON.stringify(d));
            if(s) {
                res.send(JSON.stringify({
                    status: true,
                    code: 200,
                    message: "Logged In Successfully",
                    data: d
                }));
            } else {
                res.send(JSON.stringify({
                    status: false,
                    code: 400,
                    message: "Username & Password do not match",
                    data: null
                }));
            }
        })
    } else {
        res.send(false, 400, "Error", "Username OR Password not there!");
    }
}

exports.get = function(req, res) {
    console.log("alert by count");
    // var params = req.query;
    var params = JSON.parse(req.query.data);
  UserDetails.get(params, function(s, c, m, d) {
      res.send(JSON.stringify({
          status: s,
          code: c,
          message: m,
          data: d
      }));
  })
}


exports.update = function(req, res) {

    upload(req,res,function(err) {
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        let params = req.body;
        if(req.file) params.picture_link = 'files/'+req.file.filename;
        else params.picture_link = 'files/default.jpg';
        UserDetails.updateDetails(req.body, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));

        })
    });
}


exports.updatePassword = function(req, res) {
    console.log("updatePassword: "+ req.body.data);
   // var params = req.body;
    var params = JSON.parse(req.body.data);
    console.log(params);
    UserCredentials.get(params, function(s1,c1,m1,d1) {
        console.log("&&&&&&&&&*****************"+JSON.stringify(d1));
        if(d1[0] == undefined) {
          res.send(JSON.stringify({
              status:false,
              code: 400,
              message: "Current password entered is incorrect. Please check again.",
              data: null
          }));
        } else {
          if(params.old_password == d1[0].password && params.username == d1[0].username) {
              UserCredentials.update(params, function(s, c, m, d) {
                  res.send(JSON.stringify({
                      status: s,
                      code: c,
                      message: m,
                      data: d
                  }));
              })
          } else {
              res.send(JSON.stringify({
                  status: false,
                  code: 400,
                  message: "Please check the credentials entered again.",
                  data: null
              }))
          }
        }
    })
}


exports.getPassword = function(req, res) {
    var params = JSON.parse(req.query.data);
    UserCredentials.getById(params, function(s,c,m,d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}
