

var env = "development"
var CONFIG = {};


// var prod = "aaf507fdb93be8881acb6b59420cd9ef90a6df761fc85f744013e8b7acf8ed805d857951e6b9540375f9b4a6b9249e9d6d805026521feb28dc107c457ebd6c2bac47fca80171626a8ee7486041f520c41a00ffaaa23f6258ddaa6ca9bc687b53052f76ff0a06189ac75619d52cf2225c1f25f2acd19a81e5f68f0975811e6eece94431ed4c1054ecf49d937e68c9f2aa7f487f8618b9c179668e282442a1b38a146d9500bdb5ff49";

// var dev = "aaf507fdb93be8881acb6b59420cd9ef90a6df761fc85f744013e8b7acf8ed805d857951e6b9540375f9b4a6b9249e9d6d805026521feb28dc107c457ebd6c2bac47fca80171626a8ee7486041f520c41a00ffaaa23f6258d2a66ca9bc687b53052f76ff0a06189ac75619d52cf2225c1f25f2acd19a81e5f68f0975811e6eece94431ed4c1054ecf49d937e68c9f2aa7f487f8618b9c179668e282442a1b38a146d9500bdb5ff49";

// var stage = "aaf507fdb93be8881acb6b59420cd9ef90a6df761fc85f744013e8b7acf8ed805d857951e6b9540375f9b4a6b9249e9d6d805026521feb28dc107c457ebd6c2bac47fca80171626a8ee7486041f520c41a00ffaaa23f6258d2a66ca9bc687b53052f76ff0a06189ac75619d52cf2225c1f25f2acd19a81e5f68f0975811e6eece94431ed4c1054ecf49d937e68c9f2aa7f487f8618b9c179668e282442a1b38a146d9500bdb5ff49";


var prod = {
    'username': 'postgres',
    'password': 'hilbert@123',
    'database': 'hilbert',
    'host': '172.20.104.78',
    'dialect': 'postgres',
    'logging': false,
    'pool': {
    'max': 10,
        'min': 1,
        'idle': 10000
    }
}

var dev = {
    'username': 'postgres',
    'password': 'hilbert@123',
    'database': 'hilbert',
    'host': '172.20.104.79',
    'dialect': 'postgres',
    'logging': false,
    'pool': {
        'max': 10,
        'min': 1,
        'idle': 10000
    }
};


var stage = {
    'username': 'postgres',
    'password': 'hilbert@123',
    'database': 'hilbert',
    'host': '172.20.104.78',
    'dialect': 'postgres',
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
    'postgres_conf' : CONFIG
}