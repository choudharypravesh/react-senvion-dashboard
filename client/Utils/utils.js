import _ from 'underscore';
import axios from 'axios';
import lodash from 'lodash'
import React from 'react';
import {Map, List} from 'immutable'
const convertArrayOfObjectsToCSV = function(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    data = args.data || null;
    if (!data) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.values(data.header);
    delete data.header;
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    if(args.type === 'chart'){
        _.each(data,function(item, k) {
                ctr = 0;
                result += k + columnDelimiter;
                _.each(item, function(v, k) {
                    v = item[k] ? item[k] : '';
                    result += v + columnDelimiter;
                    ctr++;
                });
                result += lineDelimiter;
            });
    }else if(args.type === 'table'){
        _.each(data,function(item, k) {
                ctr = 0;
                _.each(item, function(v, k) {
                    if(keys.indexOf(k) > -1){
                        v = item[k] || item[k] == 0 ? item[k] : '';
                        result += v + columnDelimiter;
                        ctr++;
                    }
                });
                result += lineDelimiter;
            });
    }

    return result;
}
const downloadCSV = function(args, type) {
    var data, filename, link;
    filename = args.filename+".csv" || 'export.csv';
    delete args.filename;
    var csv = convertArrayOfObjectsToCSV({
        data: args,
        type: type
    });
    if (csv == null) return;
    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);
    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
};
let GetData = {
    getFarmsListOfCountry: function(country){
        let data = {
            country_id: country
        }
        return axios.get("/api/get/farmFromCountry?data=" + JSON.stringify(data))
            .then((res) => {
                let data = res.data.data;
                let farms = _.map(data, (farm) => {
                    farm.value = farm.wind_farm;
                    farm.label = farm.wind_farm;
                    return farm;
                });
                return farms;
            });
    },
    getCountriesList: function(){
        return axios.get("api/get/country")
            .then((response) => {
                let countries = response.data.data;
                countries = _.map(countries, (con) => {
                    con.value = con.country_id;
                    con.label = con.country_name;
                    return con;
                })

                return countries;
            })
    },
    getAlertCount: function(){
        return axios.get('/api/predictive_analysis/alerts/count')
            .then(function(response) {
                var data = response.data.data;
                let ignoredAlerts = Number(_.filter(data, function (item) {
                    return item.status == 1;
                })[0].count)
                let closedAlerts = Number(_.filter(data, function (item) {
                    return item.status == 2;
                })[0].count)
                let openAlerts = Number(_.filter(data, function (item) {
                    return item.status == 0;
                })[0].count);
                return {
                    responseData: data,
                    data: {ignoredAlerts: ignoredAlerts, closedAlerts: closedAlerts, openAlerts: openAlerts}
                }
            })
    },
    getAlertsDataByTime: function () {
        return axios.get('/api/get/dashboard/alerts/fleet/monthly')
            .then(function (response) {
                console.log("here is respones");
                console.log(response.data.data);
                let x = _.map(response.data.data, function (item) {
                    console.log(item.time);
                    let date = new Date(item.time);
                    return date
                });

                let y = _.map(response.data.data, function (item) {
                    return item.count;
                });
                let data = {responseData: response.data.data, data: {x: x, y: y}}
                return data;
            })
    },
    getFleetData: function (data, selectedTab) {//selected tab represents availability by time or gen
        let url = (selectedTab == 1) ? '/api/get/fleet/availability?data=' : "/api/get/productionBasedData?data=";
        let reqData = data;
        return axios.get(url + JSON.stringify(reqData))
            .then(function (response) {
                console.log(response.data.data);
                let output = response.data.data;
                let group = _.groupBy(output, "type_broad");
                let data = {response: output, id: reqData.id}
                if (!_.isEmpty(group)) {
                    console.log(group);
                    let allChartData = {};
                    allChartData.Y1 = group['MD'] && group['MD'].map((obj) => {
                            return obj.value
                        });
                    allChartData.Y2 = group['MM'] && group['MM'].map((obj) => {
                            return obj.value
                        });
                    allChartData.Y3 = group['3.XM'] && group['3.XM'].map((obj) => {
                            return obj.value
                        });
                    allChartData.Y4 = group['6M'] && group['6M'].map((obj) => {
                            return obj.value
                        });
                    allChartData.Y5 = group['5M'] && group['5M'].map((obj) => {
                            return obj.value
                        });
                    let xGroup = group['5M'] || group['6M'] || group['3.XM'] || group['MM'] || group['MD'];
                    allChartData.X = xGroup && xGroup.map((obj) => {
                            return obj.date
                        });
                    allChartData.name = "plot1"
                    allChartData.width = window.innerWidth - 100
                    allChartData.height = 300
                    allChartData.count = 5

                    allChartData.name1 = "MD"
                    allChartData.name2 = "MM"
                    allChartData.name3 = "3.XM"
                    allChartData.name4 = "6M"
                    allChartData.name5 = "5M"
                    data.allChartData = allChartData;
                }
                return data;
            });
    },
    getPowerAndWind(data, farms){
        if(farms){
            data.wind_farm = farms[0].value || farms;
        }
        data = encodeURIComponent(JSON.stringify(data));
        return axios.get("/api/get/scada/farmLevelAverage/per/variable?data="+data)
            .then((response) => {
                let res = response.data.data;
                res = _.groupBy(res, "variable_id_fk");
                let isEmpty = _.isEmpty(res);
                let power = !isEmpty ? res[1372][0].value.toFixed(2) : "--";
                let windSpeed = !isEmpty ? res[569][0].value.toFixed(2) : "--";
                return {
                    power: power,
                    windSpeed: windSpeed
                }
            });
    },
    getAvailabilityCount(data, farms){
        if(farms){
            data.wind_farm = farms[0].value || farms;
        }
        data = encodeURIComponent(JSON.stringify(data));
        return axios.get("api/get/farm/average/availability?data="+data)
            .then((response) => {
                let data = response.data.data[0];
                let availTime = data.value ? data.value.toFixed(2) : "--";
                let availGen = data.value ? (availTime - 4).toFixed(2) : "--";
                let lpf = data.value ? (100 - availTime).toFixed(2) : "--";
                return {
                    availTime: availTime,
                    availGen: availGen,
                    lpf: lpf
                };
            });
    },
    getAlertsCount(data, farms){
        if(farms){
            data.wind_farm = farms[0].value || farms;
        }
        data = encodeURIComponent(JSON.stringify(data));
        return axios.get("/api/get/alerts/farmLevel?data="+data)
            .then((response) => {
                let numberOfAlerts = response.data.data[0] && response.data.data[0].value;
                return{
                    numberOfAlerts: numberOfAlerts
                };
            });
    },
    getTurbinesList(farm) {
        var self = this;
        var turbinesFromFarms = {
            wind_farm: farm
        }
        console.log(turbinesFromFarms);

        let data = encodeURIComponent(JSON.stringify(turbinesFromFarms));
        return axios.get('/api/get/drop_down/turbinesFromFarms?data=' + data)
            .then(function (response) {
                let turbines = _.map(response.data.data, function (item) {
                    item.value = item.serial_number;
                    item.label = item.serial_number;
                    return item;
                });
                return turbines;
            });
    },

    getFarmLevelData(data) {
        var self = this;

        return axios.get('/api/get/nearestTurbine/farmVsTurbine?data=' + JSON.stringify(data))
            .then(function (response) {
                    console.log("response");
                    console.log(response.data.data);
                    let farmX = _.map(response.data.data, function (item) {
                        let date = new Date(item.measuring_date);
                        return date;
                    })

                    let farmY = _.map(response.data.data, function (item) {
                        return item.Temp__Rotorbearing_2;
                    })

                    console.log(farmX, farmY);
                    return {farmX, farmY}
                }
            )
    },

    getVariables() {
        var self = this;
        return axios.get('/api/get/variables')
            .then(function (response) {
                let variablesData = _.map(response.data.data, function (item) {
                    item.value = item.id;
                    item.label = item.name;
                    return item;
                })
                return variablesData
            });
    },

    getXandY(group, turbine){
        return group ? group.filter((catData) => { return catData.wind_turbine_serial_id_fk == turbine })
            .map((obj) => { return {y: obj.value, x: new Date(obj.time)} }) : {};
    },

    getTurbineScadaData(data){
        let self = this;
        return axios.get('/api/get/scada?data='+JSON.stringify(data))
            .then(function(response) {
                console.log(response);
                var coordinates = {
                    x1: [],
                    y1: [],
                    x2: [],
                    y2: []
                }
                let data1 = response.data.data;
                let group = _.groupBy(data1, "variable_id_fk");
                let turbines = data.turbines;
                let turbinelist= turbines.split(",");
                let plot11 = self.getXandY(group[Object.keys(group)[0]], turbinelist[0]);
                let plot12 = self.getXandY(group[Object.keys(group)[0]], turbinelist[1]);
                coordinates.x1 = _.pluck(plot11, 'x');
                coordinates.y1 = _.pluck(plot11, 'y');
                coordinates.x2 =  _.pluck(plot12, 'x');
                coordinates.y2 =  _.pluck(plot12, 'y');
                return coordinates;
                }
            )
        },
    getFarmAvailabilityData(data, farms){
        if(farms){
            data.wind_farm = farms[0].value || farms;
        }
        data = encodeURIComponent(JSON.stringify(data));
        return axios.get("/api/get/farm/availability?data="+data)
            .then((response) => {
                let resData = response.data.data;
                let x = _.map(resData, (obj) => { return obj.date });
                let y = _.map(resData, (obj) => { return obj.value });
                return({
                    availabilityX: x,
                    availabilityY: y
                });
            })
    },
    getFarmPbaData(data, farms){
        if(farms){
            data.wind_farm = farms[0].value || farms;
        }
        data = encodeURIComponent(JSON.stringify(data));
        return axios.get("/api/get/productionBasedData?data="+data)
            .then((response) => {
                let resData = response.data.data;
                let x = _.map(resData, (obj) => { return obj.date });
                let y = _.map(resData, (obj) => { return obj.value });
                return {
                    farmPbaX: x,
                    farmPbaY: y
                };
            })
    },
    getWindDataOfFarm(data, farms){
        let self = this;
        if(farms){
            data.wind_farm = farms[0].value || farms;
        }
        data = encodeURIComponent(JSON.stringify(data));
        return axios.get("/api/get/scada/farmLevelMean?data="+data)
            .then((response) => {
                let resData = response.data.data;
                resData = _.groupBy(resData, "variable_id_fk");
                let windSpeedData = resData[569];
                let windDirectionData = resData[606];
                return({
                    wsX: _.map(windSpeedData, (obj) => { return new Date(obj.time)}),
                    wsY: _.map(windSpeedData, (obj) => { return obj.value }),
                    wdX: _.map(windDirectionData, (obj) => { return new Date(obj.time) }),
                    wdY: _.map(windDirectionData, (obj) => { return obj.value })
                });

            });
    },
    getVariablesForFarmsHeatMap(){
        return axios.get('/api/get/variables')
            .then(function(response) {
                var variablesData = _.map(response.data.data, function(item) {
                    item.value = item.id;
                    item.label = item.name;
                    return item;
                })
                return({
                    variablesList: variablesData
                })
            })
    },
    getTurbineLevelHeatMapData(data, farms){
        if(data.farms){
            data.wind_farm = farms[0].value || farms;
            delete data.farms
        }
        if(data.SelectedVariable){
            data.variable = data.SelectedVariable
            delete data.SelectedVariable;
        }
        delete data.chart;
        data = encodeURIComponent(JSON.stringify(data));
        return axios.get('/api/get/scada/farm/turbineLevel?data='+data)
            .then(function(response) {
                console.log(response.data.data);

                let yValues = _.map(response.data.data, function(item) {
                    return item.wind_turbine_serial_id_fk.toString();
                });
                yValues = _.uniq(yValues);
                let yValuess =  _.map(yValues, function(item) {
                    return item+"&nbsp;";
                });


                let x_values = _.map(response.data.data, function(item) {
                    if(item.wind_turbine_serial_id_fk == yValues[0]) {
                        let date = item.time
                        return date;
                    }
                });

                let xValues = _.reject(x_values, function(item) {
                    return item == undefined;
                });

                let z_group = _.groupBy(response.data.data, 'wind_turbine_serial_id_fk');
                let zValues = _.map(z_group, (zArr) => {
                    let row = [];
                    _.map(zArr, (zObj, i)=> {
                        row[xValues.indexOf(zObj.time)] = zObj.value;
                    })
                    return row;
                });
                let xvalues=xValues.map(date => new Date(date));

                return ({x:xvalues,y:yValuess,z:zValues});

            })
    },

    getAlertsByComponentTurbine(data){
        var coordinates = {
            x1: [],
            y1: [],
        }
        return axios.get('/api/get/monitor/alerts/alertsHistory/alertsByComponent?turbine_id='+data)
            .then(function(response) {
                console.log(JSON.stringify(response.data.data));
                if(!_.isEmpty(response.data.data)) {
                    coordinates.x1.push(response.data.data[0].count)
                    coordinates.y1.push(response.data.data[0].component_name)
                    return(coordinates);
                }else
                    return coordinates;
            })
    },

    getTotalAlertsByMonth(data){
        var coordinates = {
            x1: [],
            y1: []
        }
        return axios.get('/api/get/monitor/alerts/alertsHistory/totalAlertsByMonth?turbine_id='+data)
            .then(function(response) {
                    if(response.data.length<1){
                        return coordinates;
                    }
                else{
                    coordinates.x1 = _.map(response.data.data, function (item) {
                        return new Date(item.month);
                    });


                    coordinates.y1 = _.map(response.data.data, function (item) {
                        return item.count;
                    });
                    return coordinates;
                }
            })
    },

    getTurbineAvailabilityData(data){
        var coordinates = {
            x1: [],
            y1: []
        }
        return axios.get('/api/get/fleet/availability?data='+JSON.stringify(data))
            .then(function(response) {

                coordinates.x1 = _.map(response.data.data, function(item) {

                    let date = new Date(item.date);
                    return date
                });

                coordinates.y1 = _.map(response.data.data, function(item) {
                    return item.value;
                });
                return coordinates
            })
    },

    getTurbinePbaData(data){
        var coordinates = {
            x1: [],
            y1: []
        }
        return axios.get('/api/get/productionBasedData?data='+JSON.stringify(data))
            .then(function(response) {
                coordinates.x2 = _.map(response.data.data, function(item) {
                    let date = new Date(item.date);
                    return date
                });

                coordinates.y2 = _.map(response.data.data, function(item) {
                    return item.value;
                });

                return coordinates;
            })
    },
    getAlertHistoryForTurbine(data){
        return axios.get('/api/predictive_analysis/alerts/history?data='+JSON.stringify(data))
            .then(function(response) {
                return (response.data.data);
            });
    },

    getTurbineAvailabilityData(data){
        var coordinates = {
            x1: [],
            y1: []
        }
        return axios.get('/api/get/fleet/availability?data='+JSON.stringify(data))
            .then(function(response) {

                coordinates.x1 = _.map(response.data.data, function(item) {

                    let date = new Date(item.date);
                    return date
                });

                coordinates.y1 = _.map(response.data.data, function(item) {
                    return item.value;
                });
                return coordinates
            })
    },

    getTurbinePbaData(data){
        var coordinates = {
            x1: [],
            y1: []
        }
        return axios.get('/api/get/productionBasedData?data='+JSON.stringify(data))
            .then(function(response) {
                coordinates.x1 = _.map(response.data.data, function(item) {
                    let date = new Date(item.date);
                    return date
                });

                coordinates.y1 = _.map(response.data.data, function(item) {
                    return item.value;
                });

                return coordinates;
            })
    },
    getPowerForecastData(data){
        return axios.get('/api/powerForecast/graph?data='+JSON.stringify(data))
                   .then(function(response) {
                       if(response.data.data.length > 0) {
                           var body = response.data.data
                           console.log(body)
                           let fullData = {Xaxis: [], forecast1y: [],forecast2y: [], windspeed1y: [], windspeed2y: [], winddirection1y: [], scheduledtime1y: []}
                           for(let i=0; i<body.length; i++) {
                               var date = new Date(body[i].time_interval)
                               fullData.Xaxis[i] = date;
                               fullData.forecast1y[i] = body[i].active_power_actual;
                               fullData.forecast2y[i] = body[i].active_power_predicted;
                               fullData.windspeed1y[i]= body[i].wind_speed;
                               fullData.windspeed2y[i]= body[i].windspeed_predicted;
                               fullData.winddirection1y[i]= body[i].abs_wind_direction;
                               fullData.scheduledtime1y[i]= body[i].downtime;
                           }

                           console.log("fullData");
                           console.log(fullData);

                           return({
                               Xaxis: fullData.Xaxis,
                               forecast1y: fullData.forecast1y,
                               forecast2y: fullData.forecast2y,
                               windspeed1y: fullData.windspeed1y,
                               windspeed2y: fullData.windspeed2y,
                               winddirection1y: fullData.winddirection1y,
                               scheduledtime1y: fullData.scheduledtime1y
                           })
                       }
                   })
    },

    /*----------------------------SETTINGS PAGE---------------------------*/
    getUserDetails(data){
        return axios.get('/api/get/user/setting?data=' + JSON.stringify(data))
            .then(function (response) {
                console.log(response.data.data);
                let userDetails = response.data.data[0]

                return ({
                    first_name: userDetails.first_name,
                    last_name: userDetails.last_name,
                    username: userDetails.username,
                    email_id: userDetails.email_id,
                    language: userDetails.language,
                    country: userDetails.country,
                    picture_link: userDetails.picture_link
                })

            }).catch(function (err) {
                console.log(err);
                window.alert("Faliure " + err);
            });
    },

    validatePassword(data) {
        if(data.current == "") {
            return {error: 1, message: "Current password field is empty"}
        } else if(data.newPass == "" || data.newPass.length < 7) {
            return {error: 2, message: "Please provide with appropriate password (Length greater than 7)"}
        } else if(data.newRepeat == "") {
            return {error: 3, message: "Verify password field is empty"}
        } else if(data.newPass !== data.newRepeat) {
            return {error: 3, message: "Passwords do not match. Please try again."}
        } else {
            return {error: 0, message: ""}
        }

        if(this.props.newPassword1.length < 7 || this.props.newPassword2.length < 7){
           return({message: "Password should have at least 8 character", error: 2});
        }
        if(this.props.newPassword1 !== this.props.newPassword2){
            return({message: "Second Password does not match the first", error: 3});
        }
    },

    getCountries() {
        return axios.get('/api/get/country')
                .then(function(response) {
                    let variablesData = _.map(response.data.data, function(item) {
                        item.value = item.country_id;
                        item.label = item.country_name;
                        return item;
                    })

                    return({variablesData});

                    }).catch(function(err) {
                    console.log(err);
                    window.alert("Faliure "+err);
                    return err
                });
    },

    changePassword(data) {
        return axios.post('/api/post/user/setting/password', 'data='+JSON.stringify(data))
            .then(function(response) {
              if(response.data.status == true) {
                return({passwordErrorMessage: response.data.message, passwordErrorId: 5});
            } else {
                return({passwordErrorMessage: response.data.message, passwordErrorId: 6});
            }

                /*setTimeout(function() {
                    return({passwordMessage: "Password updated successfully", messageSuccessBox: false});
                }, 3000)*/
            }).catch(function(err) {
                console.log(err);
                window.alert("Faliure "+err);
            });
    },

    submitSettingsData(data) {
        return axios.post('/api/post/user/setting', data)
                .then(function(response) {
                    return({message: "Details updated successfully", messageSuccessBox: true});

                    /*setTimeout(function() {
                        self.setState({message: "Details updated successfully", messageSuccessBox: false});
                    }, 3000)*/
                }).catch(function(err) {
                    console.log(err);
                    window.alert("Faliure "+err);
                });
    },


    /*--------------------------SERVICE ASSIST -> ORDERS------------------------------*/
    getOrdersForTechnician() {
        return axios.get('/api/troubleshoot/getAll')
            .then(function(response) {
                console.log(response);
                var data = _.filter(response.data.data, function(item) {
                    return item.order_status !== 2
                })
                return({orders: data});
            }).catch(function(err) {
            console.log(err);
            console.log("Some error occured");
        });
    },

    updateOrdersForTechnician(data) {
        return axios.post('/api/technician/troubleshoot/update', 'data='+JSON.stringify(data))
            .then(function(response) {
                var data = _.filter(response.data.data, function(item) {
                    return item.order_status !== 2
                })
                return({orders: data});
            }).catch(function(err) {
                console.log(err);
                window.alert("Faliure "+err);
            });
    },



    /*--------------------------SCADA MONITOR------------------------------*/
    getScadaData(farm, allowedRows) {
        //this.setState({loader: true});
        let data = {
            wind_farm: farm, //Barlockhart Moor
            variable: '568, 569'
        }

        return axios.get('/api/get/RealTime?data='+JSON.stringify(data))
            .then(function(response) {
                if(response.data.data.length > 0) {
                    let turbinesData = _.groupBy(response.data.data, function(item) {
                        return item.wind_turbine_serial_id_fk;
                    })
                    console.log(turbinesData);
                    let finalData = _.map(Object.values(turbinesData), function(item) {
                        return {
                            time: item[0].time,
                            type: item[0].type,
                            wind_speed: item[0].value,
                            power: item[1].value,
                            turbine_id: item[0].wind_turbine_serial_id_fk,
                            nominal_power: item[1].nominal_power,
                            energy: item[1].energy
                        }
                    })

                    let chunks = lodash.chunk(finalData, allowedRows);
                    return({tableData: response.data.data, loader: false, noDataMessage:"", totalChunks: chunks});
                } else {
                    return({loader: false, tableData: [], tableData1: [], tableData2: [], noDataMessage: "No data available for this farm"});
                }
            }).catch(function(err) {
            console.log(err);
            /*window.alert("Faliure "+err);*/
        });
    },



    /*--------------------------ALERTS OVERVIEW------------------------------*/

    getAlertsOverviewData(data) {
      return axios.get('/api/monitor/alerts/overview/table?data='+JSON.stringify(data))
              .then(function(response) {

                  return(response.data.data);

                  /*setTimeout(function() {
                   self.setState({message: "Details updated successfully", messageSuccessBox: false});
                   }, 3000)*/
              }).catch(function(err) {
                  console.log(err);
                  window.alert("Faliure "+err);
              });
    },

    getAlertsOverviewSummary() {
        return axios.get('/api/monitor/alerts/overview/summary')
            .then(function(response) {
                return(response.data.data);
                /*setTimeout(function() {
                 self.setState({message: "Details updated successfully", messageSuccessBox: false});
                 }, 3000)*/
            }).catch(function(err) {
                console.log(err);
                window.alert("Faliure "+err);
            });
    },


    /*----------------Admin Contracts page --------------------------------*/
    getContractsOverView(){
        return axios.get("/api/get/contracts/overview")
            .then(res => res.data.data);
    },
    getSelectedContractData(cno){
        let data = {cno: cno}
        return axios.get("/api/get/contracts/details?data="+JSON.stringify(data)).then(details => {
            return (details.data.data[0]);
            }
        )
    },

    getContractYearData(wpac){
        let data = {wpac}
        return axios.get("/api/get/contracts?data="+JSON.stringify(data))
            .then(details => details.data.data);
    },
    getTurbineContractDetails(cno,wpac){
        let data = {wpac,cno}
        return axios.get("/api/get/contracts/turbines?data="+JSON.stringify(data)).then(details => {
            details.data.data =_.map(details.data.data , function(item){
                item.operating_from = new Date(item.operating_from).toLocaleDateString("id");
                item.commissioning = new Date(item.commissioning).toLocaleDateString("id");
                item.contract_end= new Date(item.contract_end).toLocaleDateString("id");
                item.contract_start = new Date(item.contract_start).toLocaleDateString("id");
                item.contractduration_in_years = item.contractduration_in_years;
                return item
            });
            return (details.data);
        })
    },

    postContractDetails(details1,details2, mode){
        details1 = details1.toObject();
        details1.tab="General";
        details2 = _.map(details2,function(item) {
            item.windparc=details1.windparc;
            return item;
        })
        details2.push(details1);
        let url = mode === 'create' ? "/api/create/contracts/details" : "/api/update/contracts/details"
        return axios.post(url,{data : JSON.stringify(details2)});
    },

    postTurbineDetails(details, mode){
        let url = mode === 'edit' ? "/api/update/contracts/turbines" : "/api/create/contracts/turbines";
        return axios.post(url,{data: JSON.stringify(details)})
    },



    /*-----------------------------CREATE SERVICE ORDER------------------------------*/


    searchInputChanged() {

        /*this.setState({searchItemsLoading: true})*/

        var query = ' ';
        return axios.get('/api/technician/recommend/searchbar?q='+query)
            .then(function(response) {
                var data = response.data.data;
                var dataObject = [];
                for(let i=0; i<data.length; i++) {
                    dataObject.push({
                        value: data[i]['value'],
                        label: data[i]['label']
                        //label: data[i]._fields[0]
                    })
                }
                return ({searchItems: dataObject, searchItemsLoading: false})
            }).catch(function (err) {
                window.alert("Faliure " + err);
            });
    },

    statusCodeSearchInputChanged() {
        //this.setState({statusCodesLoading: true})
        let query = ' ';
        return axios.get('/api/technician/recommend/searchbar/statuscode?q='+query)
            .then(function(response) {
                var data = response.data.data;
                var dataObject = [];
                for(let i=0; i<data.length; i++) {
                    dataObject.push({
                        value: data[i]['value'],
                        label: data[i]['label']
                        //label: data[i]._fields[0]
                    })
                }
                return({statusCodes: dataObject, statusCodesLoading: false})
            }).catch(function(err) {
            window.alert("Faliure "+err);
        });
    },
    /*-------------------Alerts List ------------------*/

    getSameFarmTurbines(turbine_id){
        return axios.get('/api/get/drop_down/same_farm_turbines?data='+JSON.stringify({turbine_id}))
            .then(function(response) {
                console.log("dropdown turbines");
                console.log(response.data.data);
                var variablesData = _.map(response.data.data, function(item) {
                    item.value = item.serial_number;
                    item.label = item.serial_number;
                    return item;
                })
                return({turbinesList: variablesData})
            })
    },
    getScadaDetails(data){
        let variable1 = data.variable1.value;
        let variable2 = data.variable2.value;
        let variable3 = data.variable3.value;
        data.variable = [data.variable1.label, data.variable2.label, data.variable3.label].join(',');
        delete data.variable1;
        delete data.variable2;
        delete data.variable3;
        let data1=Object.assign({},data)
        delete data1.variable4;
        delete data1.variable5;
        delete data1.variable6;
         return axios.get('/api/get/ScadaDetails3Variable?data='+JSON.stringify(data1))
            .then(function(response) {
                console.log(response.data.data);

                var coordinates = {
                    x: [],
                    y1: [],
                    y2: [],
                    y3: []
                }


                var varGroups = _.groupBy(response.data.data, function(item){
                    return item.variable_id_fk;
                });

                coordinates.y1 = _.map(varGroups[variable1], function(item) {
                    return item.value;
                })

                coordinates.x = _.map(varGroups[variable1], function(item) {
                    let date = new Date(Number(item.time))
                    return date;
                })

                coordinates.y2 = _.map(varGroups[variable2], function(item) {
                    return item.value;
                })

                coordinates.y3 = _.map(varGroups[variable3], function(item) {
                    return item.value;
                })
                return coordinates;
            })
    },
    getAlertTypes(){
        return axios.get('/api/get/drop_down/all_alerts').then(response =>{
            let alerts = _.map(response.data.data,function(item){return {label: item.alert_name, value: item.alert_name}})
            return alerts;
        })
    },
    getFarmsList(){
        return axios.get('/api/get/drop_down/farms').then(response =>{
            let farms = _.map(response.data.data,function(item){return {label:item.wind_farm,value:item.wind_farm}})
            return farms
        } )
    },
    //---------------------------DashBoard-------------------------------//

    getBestFarms(){
       return axios.get('/api/get/dashboard/availability?type=bestFarm')
    },

    getBestTurbines(){
        return axios.get('/api/get/dashboard/availability?type=bestTurbine');
    },

    getWorstFarms(){
        return axios.get('/api/get/dashboard/availability?type=worstFarm')
    },

    getWorstTurbine(){
        return axios.get('/api/get/dashboard/availability?type=worstTurbine')
    },

    getDashboardAvailabilityData(){
        return axios.get('/api/get/dashboard/availability/fleet/monthly')
            .then(function(response) {
                //x value is same for y1 and y1
                let x = _.map(response.data.data, item => new Date(item.date).getTime());
                x= x.map(time => new Date(time))
                let y1 = _.map(response.data.data, function(item) {
                    return item.value;
                });
                let data = {ranking: false,
                    level:"fleet",
                    variable:"pba"
                };


                return {x,y1}
            })
    },
    getDashboardPbaData(data){
        let y2 = [];
        let x=[];
        return axios.get('/api/get/dashboard/availability/fleet/monthly').then(response => {
            x = _.map(response.data.data, item => new Date(item.date).getTime());
            console.log("x");
            console.log(x)
        }).then(function() {
            return axios.get('/api/get/productionBasedData?data='+JSON.stringify(data)).then((response1) => {
                _.map(response1.data.data, function (item) {
                    y2[x.indexOf(new Date(item.date).getTime())] = item.value;
                });
                console.log('y2')
                console.log(y2);
                return y2
            }
            )
        })
    },
    getScadaDataForVar(data){
        let self = this;
        let turbines = data.turbines.split(',')
        return axios("/api/get/scada?data="+JSON.stringify(data))
                   .then(response => {
                       var list = response.data.data;
                       let group = _.groupBy(list, "variable_id_fk");
                       let plot11 = self.getXandY(group[Object.keys(group)[0]], turbines[0]);
                       let plot12 = self.getXandY(group[Object.keys(group)[0]], turbines[1]);
                       return ({
                           x1: _.pluck(plot11, 'x'),
                           y1: _.pluck(plot11, 'y'),
                           x2: _.pluck(plot12, 'x'),
                           y2: _.pluck(plot12, 'y')
                       });
                   });
    },
    getLPFDataForAnomaly(data){
        return axios.get('/api/get/scada/two-axis?data='+JSON.stringify(data))
            .then(function(response) {
                var varGroups = _.groupBy(response.data.data, function(item){
                    return item.variable_id_fk;
                });
                let Y1Value = _.map(varGroups[self.state.selectedAlert.variable_id.split(",")[1]], function(item) {
                    return item.value;
                })
                let X1Value = _.map(varGroups[self.state.selectedAlert.variable_id.split(",")[1]], function(item) {
                    let date = new Date(Number(item.time))
                    return date;
                })
                let X2Value = _.map(varGroups[self.state.selectedAlert.variable_id.split(",")[0]], function(item) {
                    let date = new Date(Number(item.time))
                    return date;
                })

                let Y2Value = _.map(varGroups[self.state.selectedAlert.variable_id.split(",")[0]], function(item) {
                    return item.value;
                })
                let markUrl = "api/get/alert/detection/timestamp?data=";
                let markX = []
                let markY = [];
                return axios.get(markUrl+JSON.stringify(data))
                    .then((response) => {
                        let data = response.data.data;
                        markX = _.map(data,(obj) => { return Number(obj.time_interval)+600000});
                        let towerOscillationList = varGroups[self.state.selectedAlert.variable_id.split(",")[0]];

                        markY = _.map(data, obj => obj.Toweroszillation_X_2);
                        return({farmY2: Y2Value, farmX2: X1Value, farmX: X1Value, farmY: Y1Value, markX: markX, markY: markY});
                    })
            })
    },
    getFarmLevelTurbineDataForAnomaly(data){
        return axios.get('/api/get/scada/farmLevel/turbine?data='+JSON.stringify(data))
           .then(function(response) {
               let farmX = _.map(response.data.data, function(item) {
                   let date = new Date(item.time);
                   return date;
               })

               let farmY = _.map(response.data.data, function(item) {
                   return item.value;
               })
               return  axios.get('/api/get/scada/farmLevelMean/alert?data='+JSON.stringify(data))
                   .then(function(response) {
                       let farmY2 = _.map(response.data.data, function(item) {
                           return item.value;
                       })
                       return({farmX: farmX, farmY: farmY,farmY2: farmY2});
                   })
           })
    },
    getAlertsListData(data){
        return axios.get('/api/predictive_analysis/alerts/details?data='+JSON.stringify(data))
            .then(function(response) {
                console.log(response.data.data);
                let sortedData = !_.isEmpty(response.data.data.data) ? response.data.data.data : [];
                let resultCount = response.data.data.length ? response.data.data.length[0].count : 0;
                let alerts = sortedData.map(alert => {return {label:alert.alerts, value: alert.alerts}})

                return({tableData: sortedData, resultCount: resultCount});
            })
    },
    getAllTurbines(){
        return axios.get('/api/get/drop_down/all_turbines')
            .then(function(response) {
                let turbines = response.data.data.map(turbine => {return {value: turbine.serial_number, label: turbine.serial_number}})
                return({turbines: turbines})
            })
    },
    updateAlertsStatus(data){
        return axios.post('/api/predictive_analysis/alerts/update', "data="+JSON.stringify(data))
            .then(function(response) {
                console.log(response.data.data);
                let sortedData = !_.isEmpty(response.data.data) ? response.data.data.data : [];
                let resultCount = response.data.data.length ? response.data.data.length[0].count : 0;
                return ({tableData: sortedData, permanentTableData: sortedData, resultCount: resultCount, selectedTypeOfAlertCount: resultCount});
            })
    },
    getContractDropDownData(){
        return axios.get('/api/get/contracts/dropdown')
            .then(response => response.data.data);
    },

    /*WEATHER*/
    getShortForecast() {
        let data = {
            vendor: 'aries',
            resolution: 'hourly',
            wind_farm: 'Ahlen',
            date: '2017-07-24'
        }
        return axios.post('/api/get/weather/forecast/farmLevel', "data="+JSON.stringify(data))
            .then(function(response) {
                console.log("aa gaya");
                console.log(response.data.data);
                //return ({tableData: sortedData, permanentTableData: sortedData, resultCount: resultCount, selectedTypeOfAlertCount: resultCount});
            })
    },
    getLongForecast() {
        let data = {
            vendor: 'aries',
            resolution: 'hourly',
            wind_farm: 'Ahlen',
            date: '2017-07-24'
        }
        return axios.post('/api/get/weather/forecast/farmLevel', "data="+JSON.stringify(data))
            .then(function(response) {
                console.log("aa gaya");
                console.log(response.data.data);
                //return ({tableData: sortedData, permanentTableData: sortedData, resultCount: resultCount, selectedTypeOfAlertCount: resultCount});
            })
    },
    getWeatherOverviewChartData(params) {
        let variable = params.selectedChart == 3 ? "614" : "569";
        let data={
            duration: params.duration,
            start_date: params.start,
            end_date: params.end,
            wind_farm: params.selectedFarm,
            type: params.selectedChart,
            variables: variable
        };
        let yValues = [], xValues = [], zValues = [];
        let colorScale = params.selectedChart == 3 ? "YIOrRd" : "Viridis";
        let title = params.selectedChart == 1 ? "Wind Speed" : params.selectedChart == 2 ?  "Turbulence" : "Outdoor Temperature";

        //params.chart && params.chart.renderLoader(true);
        data = encodeURIComponent(JSON.stringify(data));
        return axios.get("/api/get/scada/weather/farmLevel?data="+data)
            .then(response => {
                let resData = response.data.data;
                let group = _.groupBy(resData, 'time');
                xValues = Object.keys(group).map(x => (new Date(x)).getTime()).sort((a,b) => a - b);

                group = _.groupBy(resData, 'wind_farm');
                yValues = Object.keys(group);
                yValues = _.map(yValues, (item) => {
                    if(item.length > 18) {
                        let str1 = item.substr(0,item.length/2)
                        let str2 = item.substr(item.length/2, item.length);
                        return str1+'-<br>'+str2
                       /* return item.replace('/', '<br>');*/
                    } else {
                        return item
                    }
                })
                zValues = _.map(group, (data) => {
                    let result =  [];
                    _.map(data, varData => {
                        result[xValues.indexOf(new Date(varData.time).getTime())] = varData.value;
                    });
                    return result
                })
                xValues = xValues.map(time => new Date(time));
                if(params.dropdown == 1) {
                    return({xaxis:xValues, yaxis:yValues, colorScale:colorScale,title:title, zaxis1:zValues });
                } else {
                    return({xaxis2:xValues, yaxis2:yValues, colorScale2:colorScale,title2:title, zaxis2:zValues });
                }

                //params.chart && params.chart.renderLoader(false);

            })
    },
    getFarmSummary(params){
        let self = this;
        let data = {
            duration: "all",
            start_date: params.start,
            end_date: params.end,
            wind_farm: params.selectedFarm,
            type: "2,3",
            variables: "569,614"
        };
        return axios("/api/get/scada/weather/farmLevel/total?data=" + JSON.stringify(data))
            .then(response => {
                ;
                let redData = response.data.data;
                console.log(redData);
                let summary = {
                    all: {
                        ws: redData.total.length ? redData.total.filter(total => total.variable_id_fk === 569 && total.value_type_id_fk === 2)[0].value.toFixed(1) : "--",
                        tb: redData.total.length ? redData.total.filter(total => total.variable_id_fk === 569 && total.value_type_id_fk === 3)[0].value.toFixed(1) : "--",
                        ot: redData.total.length ? redData.total.filter(total => total.variable_id_fk === 614 && total.value_type_id_fk === 2)[0].value.toFixed(1) : "--"
                    },
                    day: {
                        ws: redData.day.length ? redData.day.filter(total => total.variable_id_fk === 569 && total.value_type_id_fk === 2)[0].value.toFixed(1) : "--",
                        tb: redData.day.length ? redData.day.filter(total => total.variable_id_fk === 569 && total.value_type_id_fk === 3)[0].value.toFixed(1) : "--",
                        ot: redData.day.length ? redData.day.filter(total => total.variable_id_fk === 614 && total.value_type_id_fk === 2)[0].value.toFixed(1) : "--"
                    },
                    night: {
                        ws: redData.night.length ? redData.night.filter(total => total.variable_id_fk === 569 && total.value_type_id_fk === 2)[0].value.toFixed(1) : "--",
                        tb: redData.night.length ? redData.night.filter(total => total.variable_id_fk === 569 && total.value_type_id_fk === 3)[0].value.toFixed(1) : "--",
                        ot: redData.night.length ? redData.night.filter(total => total.variable_id_fk === 614 && total.value_type_id_fk === 2)[0].value.toFixed(1) : "--"
                    }
                }
                console.log("summary data");
                console.log(summary)
                return ({summary: summary});
            });
    },
    getCountryFarmsList() {
        return axios.get('/api/get/drop_down/places?data={"type":1}').then(response => {
            let farmlist = _.map(response.data.data,(item)=>{
                return ({label:item.place_farm,value:item.place_farm})
            })
            return farmlist
        })
    },
    getFarmsAndTurbinesList() {
        return axios.get('/api/get/drop_down/places?data={"type":0}').then(response => {
            let farmlist = _.map(response.data.data,(item)=>{
                return ({value:item.place,label:item.place})
            })
            return farmlist
        })
    },
    getWeatherForecastData(params) {
        //let url = 'http://172.20.104.78:5000/get/weather/forecast/?data='+JSON.stringify(params)' // Sending data object in request
        let url = 'http://172.20.104.78:5000/get/weather/forecast/?vendor='+params.vendor+'&resolution='+params.resolution+'&wind_farm='+params.wind_farm+'&date='+params.date;
        let isLimit = !!params.limit
        if(isLimit){
            url += '&limit='+params.limit+'&offset='+params.offset;
        }
        return axios.get(url).then(response => {
            if(!isLimit){
                return {
                    wGust: response.data.windGust80mKPH,
                    wsAvg: response.data.windSpeed80mKPH,
                    wsMin: response.data.windSpeedMax80mKPH,
                    wsMax: response.data.windSpeedMin80mKPH,
                    date: response.data.dateTimeISO
                }
            }
            return response.data;
        })
    },

    getCompareChartData(data) {
        let addMarkerValueInCompare = false;
        return axios.get('http://172.20.104.78:5000/get/particle_counter/cumulative/?turbines='+data.turbines +
            '&start_date='+data.start_date +
            '&end_date='+data.end_date + '&full_life='+data.full_life).then(response => {
            let output = response.data;
            let allChartData = {};
            let turbines = data.turbines.split(",");
            turbines.forEach(function (item,index) {
                allChartData["x"+index]=output[item+"_date"]
                allChartData["y"+index]=output[item+"_value"]
                allChartData["z"+index] = _.map(output[item+"_failed"],(value)=> {
                        if(value === "0"){
                            return undefined;
                        }else{
                            addMarkerValueInCompare = true;
                            return value;
                        }
                    })
            })

            return {allChartData, addMarkerValueInCompare}
        })
    }
}


export {downloadCSV, GetData};
