

var env = "development"
var CONFIG = {};


var prod = {
  'username': 'bigdata',
  'password': 'Ztebfgui7456G',
  'database': 'lvs_server_database',
  'host': 'sv1070ap0045',
  'dialect': 'mysql',
  'logging': false,
  'pool': {
      'max': 10,
      'min': 1,
      'idle': 10000
  }
}

var dev = {
  'username': 'bigdata',
  'password': 'Ztebfgui7456G',
  'database': 'lvs_server_database',
  'host': 'sv1070ap0045.inter.rsag.site',
  'dialect': 'mysql',
  'logging': false,
  'pool': {
      'max': 10,
      'min': 1,
      'idle': 10000
  }
}


var stage = {
    'username': 'bigdata',
    'password': 'Ztebfgui7456G',
    'database': 'lvs_server_database',
    'host': 'sv1070ap0045',
    'dialect': 'mysql',
    'logging': false,
    'pool': {
        'max': 10,
        'min': 1,
        'idle': 10000
    }
}

switch (env) {
    case 'production':
        CONFIG = prod;
        break;
    case 'development':
        CONFIG = dev;
        break;
    case 'testing':
        CONFIG = dev;
        break;
    case 'staging':
        CONFIG = stage;
        break;
    default:
        CONFIG = dev;
        break;
}


module.exports = {
    'mysql_conf' : CONFIG
}
