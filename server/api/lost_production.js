import lost_production from '../controllers/lost_production'
import turbine_master_datas from '../controllers/turbineMasterDatas';

exports.get = function(req, res) {
    var params = JSON.parse(req.query.data);
    switch(params.level) {
        case "turbine":
            lost_production.getTurbine(params, function(s, c, m, d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            });
            break;
        case "farm" :
            scada_farm.getSameFarmTurbines(params, function (s,c,m,d) {
                params.turbines = d.split(',');
                lost_production.getFarm(params, function(s, c, m, d) {
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    }));
                });
            });
            break;
        default :
            lost_production.getTurbine(params, function(s, c, m, d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            });
    }
    
}
