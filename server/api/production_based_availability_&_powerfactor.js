import pba_lpf from '../controllers/production_based_availability_&_powerfactor'
import turbine_master_datas from '../controllers/turbineMasterDatas';
import hubs from '../controllers/hubs';
var _ = require('underscore');

// USE THE BELOW ID TO QUERY IN HUB
// ID            HUB
// 1              america
// 3              eu_central
// 4              eu_north
// 5              eu_south_east
// 6              eu_south_west
// 2              australia
// 7              onshore
// 8              offshore
// 9              all

//SAMPLE QUERY STRING (Analyze->Farm->Availability)
//http://localhost/api/get/productionBasedData?data={%22ranking%22:false,%22level%22:%22farm%22,%22variable%22:%22pba%22,%22start_date%22:%222015-01-01%22,%22end_date%22:%222018-01-01%22,%22wind_farm%22:%22Chemin%20des%20Haguenets%20II%22}

exports.get = function(req, res) {
    var params = JSON.parse(req.query.data);
    let ranking = params.ranking ? params.ranking : false
    if (ranking === true) {
        switch(params.level) {
            case "turbine":
                switch (params.variable) {
                    case "pba":
                        pba_lpf.getRankingPba(params, function(s, c, m, d) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: d
                            }));
                        });
                        break
                    case "lpf":
                        pba_lpf.getRankingLpf(params, function(s, c, m, d) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: d
                            }));
                        });
                        break
                    default:
                        params.variable = 'lost_production_factor'
                        pba_lpf.getRankingPba(params, function(s, c, m, d) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: d
                            }));
                        });
                }                
                break;                
            default :
                pba_lpf.getTurbine(params, function(s, c, m, d) {
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    }));
                });
        }
    }else {
        switch(params.level) {
            case "turbine":
                switch (params.variable) {
                    case "pba":
                        pba_lpf.getTurbinePba(params, function(s, c, m, d) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: d
                            }));
                        });
                        break
                    case "lpf":
                        pba_lpf.getTurbineLpf(params, function(s, c, m, d) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: d
                            }));
                        });
                        break
                    default:
                        pba_lpf.getTurbineLpf(params, function(s, c, m, d) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: d
                            }));
                        });
                }                
                break;
            case "farm" :
                switch (params.variable) {
                    case "pba":
                        turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
                                params.turbines = _.map(d, function(item) {
                                        return item.serial_number
                                    });
                            console.log(params.turbines);
                            pba_lpf.getFarmPba(params, function(s, c, m, d) {
                                res.send(JSON.stringify({
                                    status: s,
                                    code: c,
                                    message: m,
                                    data: d
                                }));
                            });
                        });
                        break;
                    case "lpf":
                        turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
                            params.turbines = _.map(d, function(item) {
                                    return item.serial_number
                                });
                            pba_lpf.getFarmLpf(params, function(s, c, m, d) {
                                res.send(JSON.stringify({
                                    status: s,
                                    code: c,
                                    message: m,
                                    data: d
                                }));
                            });
                        });
                        break;
                    default:
                        turbine_master_datas.getTurbinesFromFarm(params.wind_farm, function (s,c,m,d) {
                            params.turbines = _.map(d, function(item) {
                                    return item.serial_number
                                });
                            pba_lpf.getFarmLpf(params, function(s, c, m, d) {
                                res.send(JSON.stringify({
                                    status: s,
                                    code: c,
                                    message: m,
                                    data: d
                                }));
                            });
                        });
                }
                break;
            case "hub" :
                if (params.id == 9) {
                    pba_lpf.getAllPba(params, function(s, c, m, d) {
                        res.send(JSON.stringify({
                            status: s,
                            code: c,
                            message: m,
                            data: d
                        }));
                    });
                }else {
                    switch (params.variable) {
                        case "pba":
                            hubs.getTurbines(params, function (s,c,m,d) {
                                    params.turbines = _.map(d, function(item) {
                                        return item.wind_turbine_serial_id_fk
                                    });
                                pba_lpf.getHubPba(params, function(s, c, m, d) {
                                    res.send(JSON.stringify({
                                        status: s,
                                        code: c,
                                        message: m,
                                        data: d
                                    }));
                                });
                            });
                            break;
                        case "lpf":
                            hubs.getTurbines(params, function (s,c,m,d) {
                                params.turbines = _.map(d, function(item) {
                                        return item.wind_turbine_serial_id_fk
                                    });
                                pba_lpf.getHubLpf(params, function(s, c, m, d) {
                                    res.send(JSON.stringify({
                                        status: s,
                                        code: c,
                                        message: m,
                                        data: d
                                    }));
                                });
                            });
                            break;
                        default:
                            hubs.getTurbines(params, function (s,c,m,d) {
                                params.turbines =_.map(d, function(item) {
                                        return item.wind_turbine_serial_id_fk
                                    });
                                pba_lpf.getHubPba(params, function(s, c, m, d) {
                                    res.send(JSON.stringify({
                                        status: s,
                                        code: c,
                                        message: m,
                                        data: d
                                    }));
                                });
                            });
                    }
                }                
                break;                
            case "fleet" :
                switch (params.variable) {
                    case "pba":
                        pba_lpf.getFleetAverageMonthlyPba(params, function(s, c, m, d) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: d
                            }));
                        });
                        break;
                    case "lpf":
                        pba_lpf.getFleetAverageMonthlyLpf(params, function(s, c, m, d) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: d
                            }));
                        });
                        break;
                    default:
                        pba_lpf.getFleetAverageMonthlyPba(params, function(s, c, m, d) {
                            res.send(JSON.stringify({
                                status: s,
                                code: c,
                                message: m,
                                data: d
                            }));
                        });
                }
                break;
            default :
                pba_lpf.getTurbineLpf(params, function(s, c, m, d) {
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    }));
                });
        }
    }
}
