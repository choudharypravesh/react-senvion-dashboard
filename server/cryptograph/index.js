var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '28780v28m+e213v9=%d0=0n1ydqozwkmvuog8@aa($!8gs#a^o';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.decrypt = function(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return JSON.parse(dec);
}