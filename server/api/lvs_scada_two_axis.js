import windTurbineAlertVsComponent from '../controllers/windTurbineAlertVsComponent';
import scada_turbine from '../controllers/lvs_scada';

exports.get = function(req, res) {
    console.log(params);
    let params = JSON.parse(req.query.data);
    //let params = req.query;
    let one_day=1000*60*60*24;
    let start = Date.parse(params.start_date, "Y-m-d");
    let end = Date.parse(params.end_date, "Y-m-d");
    let date1 = new Date(start)
    let date2 = new Date(end)
    let difference_day = Math.round((date2 - date1)/one_day);
    let days = difference_day+1
    console.log('difference_day: '+difference_day)

    console.log(params);
    if (difference_day <= 90) {
        console.log("get 10 min level");
        windTurbineAlertVsComponent.get(params.alert_name, function(s, c, m,d) {
            params.variable = d;
            scada_turbine.get10MinLevel(params, function (s,c,m,d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            })
        });
    }else if (90 < difference_day) {
        console.log("get day level");
        windTurbineAlertVsComponent.get(params.alert_name, function(s, c, m,d) {
            params.variable = d;
            scada_turbine.getDayLevel(params, function (s,c,m,d) {
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: d
                }));
            })
        });
    }
    
}