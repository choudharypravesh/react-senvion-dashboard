import weatherForecast from '../controllers/weatherForecast';

exports.getWeatherForecast = function(req, res) {
     console.log(req.query.data);
    var params = JSON.parse(req.query.data);
    switch(params.vendor) {
        case 'aries':
        weatherForecast.getHourlyForecast(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
        break;
        
        default :
        weatherForecast.getHourlyForecast(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: d
            }));
        })
    }
    
}