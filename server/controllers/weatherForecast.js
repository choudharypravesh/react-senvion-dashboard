var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');

exports.getHourlyForecast = function(params, callback) {
    let query_string = ""
    if(params.resolution == "hourly") {
        query_string = 'select "avgTempC", "cloudsCoded", "dateTimeISO", "humidity", "iceaccum", "isDay", last_updated_time_stamp, lat, long, location_id, "maxTempC", \
                        "minTempC", pop, "precipIN", "pressureMB", "snowCM", "tempC", tz, weather, "weatherPrimary", "windDir80mDEG", "windDirMin80m", "windGust80mKPH",  \
                        "windGustKPH", "windSpeed80mKPH", "windSpeedKPH", "windSpeedMax80mKPH", "windSpeedMaxKPH", "windSpeedMin80mKPH", "windSpeedMinKPH", wind_farm from forecast_data \
                        WHERE to_timestamp(last_updated_time_stamp)::DATE = $date  \
                        AND wind_farm = $wind_farm'
    } else if (params.resolution == "daily") {
        console.log("comming here")
        query_string = 'SELECT "avgTempC", "cloudsCoded", "dateTimeISO", "humidity", "iceaccum", "isDay", last_updated_time_stamp, lat, long, location_id, \
                        "maxTempC", "minTempC", pop, "precipIN", "pressureMB", "snowCM", "tempC", tz, weather, "weatherPrimary", "windDir80mDEG", \
                        "windDirMin80m", "windGust80mKPH", "windGustKPH", "windSpeed80mKPH", "windSpeedKPH", "windSpeedMax80mKPH", "windSpeedMaxKPH", \
                        "windSpeedMin80mKPH", "windSpeedMinKPH", wind_farm \
                        FROM forecast_data_daily \
                        WHERE to_timestamp(last_updated_time_stamp)::DATE = $date \
                        AND wind_farm =  $wind_farm'
    } else {
        query_string = 'select "avgTempC", "cloudsCoded", "dateTimeISO", "humidity", "iceaccum", "isDay", last_updated_time_stamp, lat, long, location_id, "maxTempC", \
                        "minTempC", pop, "precipIN", "pressureMB", "snowCM", "tempC", tz, weather, "weatherPrimary", "windDir80mDEG", "windDirMin80m", "windGust80mKPH",  \
                        "windGustKPH", "windSpeed80mKPH", "windSpeedKPH", "windSpeedMax80mKPH", "windSpeedMaxKPH", "windSpeedMin80mKPH", "windSpeedMinKPH", wind_farm from forecast_data \
                        WHERE to_timestamp(last_updated_time_stamp)::DATE = $date  \
                        AND wind_farm = $wind_farm'
    }
 
    postgres.sequelize.query(query_string, {
        bind: {
            wind_farm : params.wind_farm,
            date: params.date
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}