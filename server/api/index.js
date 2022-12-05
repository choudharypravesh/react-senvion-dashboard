import express from 'express';
var app = express();
var router = express.Router();

import status_code from './status_codes';
import user_session from './user_session';
import solution_graph from './solution_graph';
import recommend from './recommendation';
import troubleshoot_view from './troubleshoot_view';
import searchbar from './searchbar';
import power_forecast from './power_forecast';
import alert_details from './alert_details';
import turbine_master_datas from './turbine_master_datas';
import drop_down from './drop_down';
import availability from './availability';
import pba_lpf from './production_based_availability_&_powerfactor.js';
import lvs_scada_weather from './lvs_scada_weather';
import alert_stage from './alert_stage';
import user_details from './user_details';
import weather_forecast from './weather_forecast';
import contracts from './contracts';

//REAL TIME DATA (SCADA)
//######################//
//******************************** */
import lvs_scada from './lvs_scada';
import lvs_scada_farm_level from './lvs_scada_farm_level';
import lvs_scada_two_axis from './lvs_scada_two_axis';
//******************************** */


//MONITOR REAL TIME
//******************************** */
router.get('/get/RealTime', lvs_scada.getRealTimeScadaDetails);
//******************************** */

//ALL TYPES OF GRAPHS FOR ALERTS
//******************************** */
router.get('/get/scada', lvs_scada.getScadaDetails);
//for 3 variable chart
router.get('/get/ScadaDetails3Variable', lvs_scada.getScadaDetails3Variable);
//for chart type 1
router.get('/get/scada/farmlevel/turbine', lvs_scada_farm_level.turbinePerValiable);
router.get('/get/scada/farmLevelMean/alert', lvs_scada_farm_level.farmMeanPerValiableFromTurbine);
//for chart type 2
router.get('/get/scada/two-axis', lvs_scada_two_axis.get);
//******************************** */

//FARM LEVEL SCADA
//******************************** */
router.get('/get/scada/farmLevelMean', lvs_scada_farm_level.farmMeanPerValiableFromFarm);
router.get('/get/scada/farm/turbineLevel', lvs_scada_farm_level.turbineLevelPerValiableFromFarm);
router.get('/get/scada/farmLevelAverage/per/variable', lvs_scada_farm_level.farmLevelAveragePerVariable);
//******************************** */


//WEATHER DATA
//****************** */
// Forecast
router.get('/get/weather/forecast/farmLevel', weather_forecast.getWeatherForecast);
// Historical
router.get('/get/scada/weather/farmLevel', lvs_scada_weather.getWeatherFarmLevel);
router.get('/get/scada/weather/farmLevel/total', lvs_scada_weather.getWeatherFarmLevelAverage);
//****************** */


//STAGING DB
//#######################//
//DROP DOWNS
//******************* */
router.get('/get/drop_down/all_alerts', alert_details.getAlertDropdown);
router.get('/get/drop_down/all_turbines', drop_down.getAllTurbines);
router.get('/get/drop_down/same_farm_turbines', drop_down.getTurbines);
router.get('/get/drop_down/farms', drop_down.getFarms);
router.get('/get/drop_down/turbinesFromFarms', drop_down.getTurbinesFromFarm);
router.get('/get/variables', drop_down.getVariables);
router.get('/get/country', drop_down.getCountry);
router.get('/get/farmFromCountry', drop_down.getFarmFromCountry);
router.get('/get/drop_down/places', drop_down.getPlaces);
//******************* */


//CONTRACTS DATA
//******************* */
//Get
router.get('/get/contracts/overview', contracts.getContractsOverView);
router.get('/get/contracts', contracts.getContracts);
router.get('/get/contracts/details', contracts.getContractsDetails);
router.get('/get/contracts/turbines', contracts.getContractsTurbineDetails);
router.get('/get/contracts/dropdown', contracts.getContractDropDownData);
//Update And Create
router.post('/update/contracts/details', contracts.updateContractDetails);
router.post('/update/contracts/turbines', contracts.updateContractTurbineDetails);
router.post('/create/contracts/details', contracts.createContractDetails);
router.post('/create/contracts/turbines', contracts.createContractTurbineDetails);
//******************* */


//Alerts
//*********** */
//Alerts Overview
router.get('/monitor/alerts/overview/summary', alert_details.getAlertOverviewSummary);
router.get('/monitor/alerts/overview/table', alert_details.getAlertOverviewTable);
//Alerts Table
router.get('/predictive_analysis/alerts/details', alert_details.get);
//router.get('/predictive_analysis/alerts/details/length', alert_details.getLength);
router.get('/predictive_analysis/alerts/details/dropdown', alert_details.getDropDown);
router.get('/predictive_analysis/alerts/history', alert_details.getAlertHistory);
router.post('/predictive_analysis/alerts/update', alert_details.update);
router.get('/predictive_analysis/alerts/count', alert_details.totalAlertsCount);
router.get('/get/predictive_analysis/alerts/comments', alert_details.getAlertComment);
router.post('/post/predictive_analysis/alerts/comments', alert_details.postAlertComment);
router.get('/get/alerts/farmLevel', alert_details.getAlertFarmLevel);
//*********** */

//ALERT DETECTION TIMESTAMPS
//****************** */
router.get('/get/alert/detection/timestamp', alert_stage.timestamp);
//****************** */

//MAP
//****************** */
router.get('/map/turbine_data', turbine_master_datas.getMap);
router.get('/map/turbine_data_details', turbine_master_datas.getMapData);
//****************** */

//LPF
//****************** */
router.get('/get/productionBasedData', pba_lpf.get);
//***************** */

router.get('/powerForecast/graph', power_forecast.getGraphDetails);
router.get('/turbine/master/data', turbine_master_datas.get);

//AVAILABILITY
//***************** */
router.get('/get/fleet/availability', availability.get);
router.get('/get/farm/availability', availability.getFarmLevel);
router.get('/get/farm/average/availability', availability.getFarmLevelAverage);
//***************** */

//DASHBOARD
//****************** */
router.get('/get/dashboard/availability', availability.getBestAndWorst);
router.get('/get/dashboard/alertByLocation', alert_details.totalAlertsCountByLocation);
router.get('/get/dashboard/availability/fleet/monthly', availability.getFleetAverageMonthly);
router.get('/get/dashboard/alerts/fleet/monthly', alert_details.getFleetAverageMonthly);
//****************** */

//USER SETTING
//****************** */
router.get('/get/user/setting', user_details.get);
router.post('/post/user/setting', user_details.update);
router.post('/post/user/setting/password', user_details.updatePassword);
router.get('/get/user/setting/currentPassword', user_details.getPassword);
//****************** */


router.get('/get/monitor/alerts/alertsHistory/alertsByComponent', alert_details.alertsByComponent);
router.get('/get/monitor/alerts/alertsHistory/totalAlertsByMonth', alert_details.totalAlertsByMonth);

router.get('/chat/messages', status_code.chatSessionGetSolution);

router.get('/admin/troubleshoot/getAll', troubleshoot_view.getAdminTroubleshootView);
router.get('/troubleshoot/getAll', troubleshoot_view.getTroubleshootView);
router.post('/service_order/create', troubleshoot_view.createServiceRequest);
router.post('/technician/troubleshoot/update', troubleshoot_view.updateUserTroubleshootApprovalReject);
router.get('/technician/recommend/observation', recommend.getObservation);
router.get('/technician/recommend/observationToken', recommend.getObservationToken);
router.get('/technician/recommend/cause', recommend.getCause);
router.get('/technician/recommend/searchbar', searchbar.observationSearch);
router.get('/technician/recommend/searchbar/statuscode', searchbar.statusCodeSearch);
router.get('/technician/recommend/solution', solution_graph.getSolutionFromCause);

router.post('/admin/troubleshoot/update', troubleshoot_view.updateAdminTroubleshootApprovalReject);
router.post('/admin/createSolution', solution_graph.createNodesGraphsSolutions);
router.get('/admin/solution/getNodeRecommendation', solution_graph.getDropDownRecommendation);
router.post('/admin/solution/solutions/create', status_code.createSolution);
router.get('/admin/solution/getAll', status_code.getCreatedSolutionsUser);
router.get('/admin/get/serviceOrderApprovals', troubleshoot_view.getAdminTroubleshootView);
router.post('/admin/updateStatus/serviceOrderApprovals', troubleshoot_view.updateAdminTroubleshootApprovalReject);

router.post('/tcc/solution/approval', status_code.approveRejectSolution);
router.get('/tcc/solution/getAll', status_code.getCreatedSolutionsSuperAdmin);


//used in farms
//*************** */
router.get('/get/forecast/weather/map', turbine_master_datas.getPositionFromFarm);
//******************* */

//Avialability by turbine number
router.get('/get/availability/turbine', availability.get);

router.post('/login', user_session.login);

router.use(function(req, res, next) {
    next();
});

module.exports = router;