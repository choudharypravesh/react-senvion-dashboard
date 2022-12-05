var lvs_db = require('../lvs_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');
var turbineMasterDatas = require('../controllers/turbineMasterDatas');

exports.getDailyWeatherAverage = function( farm, params, callback){
    let turbines= [];
    console.log(farm);
    turbineMasterDatas.getTurbinesFromFarm(farm, function (s,c,m,d) {
        turbines = _.map(d, function(item) {
                return item.serial_number
            });
        console.log(turbines);
        let query_string= "SELECT measuring_date AS time,  variable_id_fk, AVG(daily_avg) AS value, :farm AS wind_farm  FROM \
        (SELECT first_measuring_timestamp, measuring_date, wind_turbine_serial_id_fk, variable_id_fk,   value_type_id_fk, \
        ((COALESCE(measuring_value_interval_1, 0) + COALESCE(measuring_value_interval_2, 0) + COALESCE(measuring_value_interval_3, 0) + COALESCE(measuring_value_interval_4, 0) + COALESCE(measuring_value_interval_5, 0) + COALESCE(measuring_value_interval_6, 0) + COALESCE(measuring_value_interval_7, 0) + COALESCE(measuring_value_interval_8, 0) + COALESCE(measuring_value_interval_9, 0) + COALESCE(measuring_value_interval_10, 0) + COALESCE(measuring_value_interval_11, 0) + COALESCE(measuring_value_interval_12, 0) + COALESCE(measuring_value_interval_13, 0) + COALESCE(measuring_value_interval_14, 0) + COALESCE(measuring_value_interval_15, 0) + COALESCE(measuring_value_interval_16, 0) + COALESCE(measuring_value_interval_17, 0) + COALESCE(measuring_value_interval_18, 0) + COALESCE(measuring_value_interval_19, 0) + COALESCE(measuring_value_interval_20, 0) + COALESCE(measuring_value_interval_21, 0) + COALESCE(measuring_value_interval_22, 0) + COALESCE(measuring_value_interval_23, 0) + COALESCE(measuring_value_interval_24, 0) + COALESCE(measuring_value_interval_25, 0) + COALESCE(measuring_value_interval_26, 0) + COALESCE(measuring_value_interval_27, 0) + COALESCE(measuring_value_interval_28, 0) + COALESCE(measuring_value_interval_29, 0) + COALESCE(measuring_value_interval_30, 0) + COALESCE(measuring_value_interval_31, 0) + COALESCE(measuring_value_interval_32, 0) + COALESCE(measuring_value_interval_33, 0) + COALESCE(measuring_value_interval_34, 0) + COALESCE(measuring_value_interval_35, 0) + COALESCE(measuring_value_interval_36, 0) + COALESCE(measuring_value_interval_37, 0) + COALESCE(measuring_value_interval_38, 0) + COALESCE(measuring_value_interval_39, 0) + COALESCE(measuring_value_interval_40, 0) + COALESCE(measuring_value_interval_41, 0) + COALESCE(measuring_value_interval_42, 0) + COALESCE(measuring_value_interval_43, 0) + COALESCE(measuring_value_interval_44, 0) + COALESCE(measuring_value_interval_45, 0) + COALESCE(measuring_value_interval_46, 0) + COALESCE(measuring_value_interval_47, 0) + COALESCE(measuring_value_interval_48, 0) + COALESCE(measuring_value_interval_49, 0) + COALESCE(measuring_value_interval_50, 0) + COALESCE(measuring_value_interval_51, 0) + COALESCE(measuring_value_interval_52, 0) + COALESCE(measuring_value_interval_53, 0) + COALESCE(measuring_value_interval_54, 0) + COALESCE(measuring_value_interval_55, 0) + COALESCE(measuring_value_interval_56, 0) + COALESCE(measuring_value_interval_57, 0) + COALESCE(measuring_value_interval_58, 0) + COALESCE(measuring_value_interval_59, 0) + COALESCE(measuring_value_interval_60, 0) + COALESCE(measuring_value_interval_61, 0) + COALESCE(measuring_value_interval_62, 0) + COALESCE(measuring_value_interval_63, 0) + COALESCE(measuring_value_interval_64, 0) + COALESCE(measuring_value_interval_65, 0) + COALESCE(measuring_value_interval_66, 0) + COALESCE(measuring_value_interval_67, 0) + COALESCE(measuring_value_interval_68, 0) + COALESCE(measuring_value_interval_69, 0) + COALESCE(measuring_value_interval_70, 0) + COALESCE(measuring_value_interval_71, 0) + COALESCE(measuring_value_interval_72, 0) + COALESCE(measuring_value_interval_73, 0) + COALESCE(measuring_value_interval_74, 0) + COALESCE(measuring_value_interval_75, 0) + COALESCE(measuring_value_interval_76, 0) + COALESCE(measuring_value_interval_77, 0) + COALESCE(measuring_value_interval_78, 0) + COALESCE(measuring_value_interval_79, 0) + COALESCE(measuring_value_interval_80, 0) + COALESCE(measuring_value_interval_81, 0) + COALESCE(measuring_value_interval_82, 0) + COALESCE(measuring_value_interval_83, 0) + COALESCE(measuring_value_interval_84, 0) + COALESCE(measuring_value_interval_85, 0) + COALESCE(measuring_value_interval_86, 0) + COALESCE(measuring_value_interval_87, 0) + COALESCE(measuring_value_interval_88, 0) + COALESCE(measuring_value_interval_89, 0) + COALESCE(measuring_value_interval_90, 0) + COALESCE(measuring_value_interval_91, 0) + COALESCE(measuring_value_interval_92, 0) + COALESCE(measuring_value_interval_93, 0) + COALESCE(measuring_value_interval_94, 0) + COALESCE(measuring_value_interval_95, 0) + COALESCE(measuring_value_interval_96, 0) + COALESCE(measuring_value_interval_97, 0) + COALESCE(measuring_value_interval_98, 0) + COALESCE(measuring_value_interval_99, 0) + COALESCE(measuring_value_interval_100, 0) + COALESCE(measuring_value_interval_101, 0) + COALESCE(measuring_value_interval_102, 0) + COALESCE(measuring_value_interval_103, 0) + COALESCE(measuring_value_interval_104, 0) + COALESCE(measuring_value_interval_105, 0) + COALESCE(measuring_value_interval_106, 0) + COALESCE(measuring_value_interval_107, 0) + COALESCE(measuring_value_interval_108, 0) + COALESCE(measuring_value_interval_109, 0) + COALESCE(measuring_value_interval_110, 0) + COALESCE(measuring_value_interval_111, 0) + COALESCE(measuring_value_interval_112, 0) + COALESCE(measuring_value_interval_113, 0) + COALESCE(measuring_value_interval_114, 0) + COALESCE(measuring_value_interval_115, 0) + COALESCE(measuring_value_interval_116, 0) + COALESCE(measuring_value_interval_117, 0) + COALESCE(measuring_value_interval_118, 0) + COALESCE(measuring_value_interval_119, 0) + COALESCE(measuring_value_interval_120, 0) + COALESCE(measuring_value_interval_121, 0) + COALESCE(measuring_value_interval_122, 0) + COALESCE(measuring_value_interval_123, 0) + COALESCE(measuring_value_interval_124, 0) + COALESCE(measuring_value_interval_125, 0) + COALESCE(measuring_value_interval_126, 0) + COALESCE(measuring_value_interval_127, 0) + COALESCE(measuring_value_interval_128, 0) + COALESCE(measuring_value_interval_129, 0) + COALESCE(measuring_value_interval_130, 0) + COALESCE(measuring_value_interval_131, 0) + COALESCE(measuring_value_interval_132, 0) + COALESCE(measuring_value_interval_133, 0) + COALESCE(measuring_value_interval_134, 0) + COALESCE(measuring_value_interval_135, 0) + COALESCE(measuring_value_interval_136, 0) + COALESCE(measuring_value_interval_137, 0) + COALESCE(measuring_value_interval_138, 0) + COALESCE(measuring_value_interval_139, 0) + COALESCE(measuring_value_interval_140, 0) + COALESCE(measuring_value_interval_141, 0) + COALESCE(measuring_value_interval_142, 0) + COALESCE(measuring_value_interval_143, 0) + COALESCE(measuring_value_interval_144, 0)) / \
        ((IF(measuring_value_interval_1 IS NULL,0,1) + IF(measuring_value_interval_2 IS NULL,0,1) + IF(measuring_value_interval_3 IS NULL,0,1) + IF(measuring_value_interval_4 IS NULL,0,1) + IF(measuring_value_interval_5 IS NULL,0,1) + IF(measuring_value_interval_6 IS NULL,0,1) + IF(measuring_value_interval_7 IS NULL,0,1) + IF(measuring_value_interval_8 IS NULL,0,1) + IF(measuring_value_interval_9 IS NULL,0,1) + IF(measuring_value_interval_10 IS NULL, 0,1) + IF(measuring_value_interval_11 IS NULL,0,1) + IF(measuring_value_interval_12 IS NULL,0,1) + IF(measuring_value_interval_13 IS NULL,0,1) + IF(measuring_value_interval_14 IS NULL,0,1) + IF(measuring_value_interval_15 IS NULL,0,1) + IF(measuring_value_interval_16 IS NULL,0,1) + IF(measuring_value_interval_17 IS NULL,0,1) + IF(measuring_value_interval_18 IS NULL,0,1) + IF(measuring_value_interval_19 IS NULL,0,1) + IF(measuring_value_interval_20 IS NULL,0,1) + IF(measuring_value_interval_21 IS NULL,0,1) + IF(measuring_value_interval_22 IS NULL,0,1) + IF(measuring_value_interval_23 IS NULL,0, 1) + IF(measuring_value_interval_24 IS NULL,0,1) + IF(measuring_value_interval_25 IS NULL, 0,1) + IF(measuring_value_interval_26 IS NULL,0,1) + IF(measuring_value_interval_27 IS NULL,0,1) + IF(measuring_value_interval_28 IS NULL,0,1) + IF(measuring_value_interval_29 IS NULL,0,1) + IF(measuring_value_interval_30 IS NULL,0,1) + IF(measuring_value_interval_31 IS NULL,0,1) + IF(measuring_value_interval_32 IS NULL,0,1) + IF(measuring_value_interval_33 IS NULL,0,1) + IF(measuring_value_interval_34 IS NULL,0,1) + IF(measuring_value_interval_35 IS NULL,0,1) + IF(measuring_value_interval_36 IS NULL,0,1) + IF(measuring_value_interval_37 IS NULL,0,1) + IF(measuring_value_interval_38 IS NULL,0,1) + IF(measuring_value_interval_39 IS NULL,0,1) + IF(measuring_value_interval_40 IS NULL,0,1) + IF(measuring_value_interval_41 IS NULL,0,1) + IF(measuring_value_interval_42 IS NULL,0,1) + IF(measuring_value_interval_43 IS NULL,0,1) + IF(measuring_value_interval_44 IS NULL,0,1) + IF(measuring_value_interval_45 IS NULL, 0,1) + IF(measuring_value_interval_46 IS NULL,0,1) + IF(measuring_value_interval_47 IS NULL,0,1) + IF(measuring_value_interval_48 IS NULL,0,1) + IF(measuring_value_interval_49 IS NULL,0,1) + IF(measuring_value_interval_50 IS NULL,0,1) + IF(measuring_value_interval_51 IS NULL,0,1) + IF(measuring_value_interval_52 IS NULL,0,1) + IF(measuring_value_interval_53 IS NULL,0,1) + IF(measuring_value_interval_54 IS NULL,0,1) + IF(measuring_value_interval_55 IS NULL,0,1) + IF(measuring_value_interval_56 IS NULL,0,1) + IF(measuring_value_interval_57 IS NULL,0,1) + IF(measuring_value_interval_58 IS NULL,0,1) + IF(measuring_value_interval_59 IS NULL,0,1) + IF(measuring_value_interval_60 IS NULL,0,1) + IF(measuring_value_interval_61 IS NULL,0,1) + IF(measuring_value_interval_62 IS NULL,0,1) + IF(measuring_value_interval_63 IS NULL,0,1) + IF(measuring_value_interval_64 IS NULL,0,1) + IF(measuring_value_interval_65 IS NULL,0,1) + IF(measuring_value_interval_66 IS NULL,0,1) + IF(measuring_value_interval_67 IS NULL,0,1) + IF(measuring_value_interval_68 IS NULL,0,1) + IF(measuring_value_interval_69 IS NULL,0,1) + IF(measuring_value_interval_70 IS NULL,0,1) + IF(measuring_value_interval_71 IS NULL,0,1) + IF(measuring_value_interval_72 IS NULL,0,1) + IF(measuring_value_interval_73 IS NULL,0,1) + IF(measuring_value_interval_74 IS NULL,0,1) + IF(measuring_value_interval_75 IS NULL,0,1) + IF(measuring_value_interval_76 IS NULL,0,1) + IF(measuring_value_interval_77 IS NULL,0,1) + IF(measuring_value_interval_78 IS NULL,0,1) + IF(measuring_value_interval_79 IS NULL,0,1) + IF(measuring_value_interval_80 IS NULL,0,1) + IF(measuring_value_interval_81 IS NULL,0,1) + IF(measuring_value_interval_82 IS NULL,0,1) + IF(measuring_value_interval_83 IS NULL,0,1) + IF(measuring_value_interval_84 IS NULL,0,1) + IF(measuring_value_interval_85 IS NULL,0,1) + IF(measuring_value_interval_86 IS NULL,0,1) + IF(measuring_value_interval_87 IS NULL,0,1) + IF(measuring_value_interval_88 IS NULL,0,1) + IF(measuring_value_interval_89 IS NULL,0,1) + IF(measuring_value_interval_90 IS NULL,0,1) + IF(measuring_value_interval_91 IS NULL,0,1) + IF(measuring_value_interval_92 IS NULL,0,1) + IF(measuring_value_interval_93 IS NULL,0,1) + IF(measuring_value_interval_94 IS NULL,0,1) + IF(measuring_value_interval_95 IS NULL,0,1) + IF(measuring_value_interval_96 IS NULL,0,1) + IF(measuring_value_interval_97 IS NULL,0,1) + IF(measuring_value_interval_98 IS NULL,0,1) + IF(measuring_value_interval_99 IS NULL,0,1) + IF(measuring_value_interval_100 IS NULL,0,1) + IF(measuring_value_interval_101 IS NULL,0,1) + IF(measuring_value_interval_102 IS NULL,0,1) + IF(measuring_value_interval_103 IS NULL,0,1) + IF(measuring_value_interval_104 IS NULL,0,1) + IF(measuring_value_interval_105 IS NULL,0,1) + IF(measuring_value_interval_106 IS NULL,0,1) + IF(measuring_value_interval_107 IS NULL,0,1) + IF(measuring_value_interval_108 IS NULL,0,1) + IF(measuring_value_interval_109 IS NULL,0,1) + IF(measuring_value_interval_110 IS NULL,0,1) + IF(measuring_value_interval_111 IS NULL,0,1) + IF(measuring_value_interval_112 IS NULL,0,1) + IF(measuring_value_interval_113 IS NULL,0,1) + IF(measuring_value_interval_114 IS NULL,0,1) + IF(measuring_value_interval_115 IS NULL,0,1) + IF(measuring_value_interval_116 IS NULL,0,1) + IF(measuring_value_interval_117 IS NULL,0,1) + IF(measuring_value_interval_118 IS NULL,0,1) + IF(measuring_value_interval_119 IS NULL,0,1) + IF(measuring_value_interval_120 IS NULL,0,1) + IF(measuring_value_interval_121 IS NULL,0,1) + IF(measuring_value_interval_122 IS NULL,0,1) + IF(measuring_value_interval_123 IS NULL,0,1) + IF(measuring_value_interval_124 IS NULL,0,1) + IF(measuring_value_interval_125 IS NULL,0,1) + IF(measuring_value_interval_126 IS NULL,0,1) + IF(measuring_value_interval_127 IS NULL,0,1) + IF(measuring_value_interval_128 IS NULL,0,1) + IF(measuring_value_interval_129 IS NULL,0,1) + IF(measuring_value_interval_130 IS NULL,0,1) + IF(measuring_value_interval_131 IS NULL,0,1) + IF(measuring_value_interval_132 IS NULL,0,1) + IF(measuring_value_interval_133 IS NULL,0,1) + IF(measuring_value_interval_134 IS NULL,0,1) + IF(measuring_value_interval_135 IS NULL,0,1) + IF(measuring_value_interval_136 IS NULL,0,1) + IF(measuring_value_interval_137 IS NULL,0,1) + IF(measuring_value_interval_138 IS NULL,0,1) + IF(measuring_value_interval_139 IS NULL,0,1) + IF(measuring_value_interval_140 IS NULL,0,1) + IF(measuring_value_interval_141 IS NULL,0,1) + IF(measuring_value_interval_142 IS NULL,0,1) + IF(measuring_value_interval_143 IS NULL,0,1) + IF(measuring_value_interval_144 IS NULL,0,1)))) AS daily_avg  \
        FROM  lvs_measuring_data.wind_turbine_unit_measuring_data_daily WHERE wind_turbine_serial_id_fk IN (:turbines)  AND variable_id_fk IN (:variable_id_fk) AND value_type_id_fk IN (:value_type_id_fk) AND measuring_date >= :start_date AND measuring_date <= :end_date ) t1 \
        GROUP BY measuring_date, variable_id_fk ORDER BY measuring_date, variable_id_fk" ;
        lvs_db.sequelize.query(query_string, {
            replacements: {
                turbines: turbines,
                farm : farm,
                start_date: params.start_date,
                end_date: params.end_date,
                variable_id_fk: params.variables,
                value_type_id_fk: params.type
            },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
            callback(true, 200, "Success", data);
        }).catch(function(err) {
            console.log(err)
            callback(false, 300, "Error : " +  err, {});
        });
    });
}


exports.getDayWeatherAverage = function( farm, params, callback){
    let turbines= [];
    turbineMasterDatas.getTurbinesFromFarm(farm, function (s,c,m,d) {
        turbines = _.map(d, function(item) {
                return item.serial_number
            });
    
        let query_string= "SELECT measuring_date AS time,  variable_id_fk, AVG(day_avg) AS value, :farm AS wind_farm  FROM \
        (SELECT first_measuring_timestamp, measuring_date, wind_turbine_serial_id_fk, variable_id_fk,   value_type_id_fk, \
        ((COALESCE(measuring_value_interval_43, 0) + COALESCE(measuring_value_interval_44, 0) + COALESCE(measuring_value_interval_45, 0) + COALESCE(measuring_value_interval_46, 0) + COALESCE(measuring_value_interval_47, 0) + COALESCE(measuring_value_interval_48, 0) + COALESCE(measuring_value_interval_49, 0) + COALESCE(measuring_value_interval_50, 0) + COALESCE(measuring_value_interval_51, 0) + COALESCE(measuring_value_interval_52, 0) + COALESCE(measuring_value_interval_53, 0) + COALESCE(measuring_value_interval_54, 0) + COALESCE(measuring_value_interval_55, 0) + COALESCE(measuring_value_interval_56, 0) + COALESCE(measuring_value_interval_57, 0) + COALESCE(measuring_value_interval_58, 0) + COALESCE(measuring_value_interval_59, 0) + COALESCE(measuring_value_interval_60, 0) + COALESCE(measuring_value_interval_61, 0) + COALESCE(measuring_value_interval_62, 0) + COALESCE(measuring_value_interval_63, 0) + COALESCE(measuring_value_interval_64, 0) + COALESCE(measuring_value_interval_65, 0) + COALESCE(measuring_value_interval_66, 0) + COALESCE(measuring_value_interval_67, 0) + COALESCE(measuring_value_interval_68, 0) + COALESCE(measuring_value_interval_69, 0) + COALESCE(measuring_value_interval_70, 0) + COALESCE(measuring_value_interval_71, 0) + COALESCE(measuring_value_interval_72, 0) + COALESCE(measuring_value_interval_73, 0) + COALESCE(measuring_value_interval_74, 0) + COALESCE(measuring_value_interval_75, 0) + COALESCE(measuring_value_interval_76, 0) + COALESCE(measuring_value_interval_77, 0) + COALESCE(measuring_value_interval_78, 0) + COALESCE(measuring_value_interval_79, 0) + COALESCE(measuring_value_interval_80, 0) + COALESCE(measuring_value_interval_81, 0) + COALESCE(measuring_value_interval_82, 0) + COALESCE(measuring_value_interval_83, 0) + COALESCE(measuring_value_interval_84, 0) + COALESCE(measuring_value_interval_85, 0) + COALESCE(measuring_value_interval_86, 0) + COALESCE(measuring_value_interval_87, 0) + COALESCE(measuring_value_interval_88, 0) + COALESCE(measuring_value_interval_89, 0) + COALESCE(measuring_value_interval_90, 0) + COALESCE(measuring_value_interval_91, 0) + COALESCE(measuring_value_interval_92, 0) + COALESCE(measuring_value_interval_93, 0) + COALESCE(measuring_value_interval_94, 0) + COALESCE(measuring_value_interval_95, 0) + COALESCE(measuring_value_interval_96, 0) + COALESCE(measuring_value_interval_97, 0) + COALESCE(measuring_value_interval_98, 0) + COALESCE(measuring_value_interval_99, 0) + COALESCE(measuring_value_interval_100, 0) + COALESCE(measuring_value_interval_101, 0) + COALESCE(measuring_value_interval_102, 0) + COALESCE(measuring_value_interval_103, 0) + COALESCE(measuring_value_interval_104, 0) + COALESCE(measuring_value_interval_105, 0) + COALESCE(measuring_value_interval_106, 0) + COALESCE(measuring_value_interval_107, 0) + COALESCE(measuring_value_interval_108, 0) + COALESCE(measuring_value_interval_109, 0) + COALESCE(measuring_value_interval_110, 0) + COALESCE(measuring_value_interval_111, 0) + COALESCE(measuring_value_interval_112, 0) + COALESCE(measuring_value_interval_113, 0) + COALESCE(measuring_value_interval_114, 0)) / (IF(measuring_value_interval_43 IS NULL,0,1) + IF(measuring_value_interval_44 IS NULL,0,1) + IF(measuring_value_interval_45 IS NULL,0,1) + IF(measuring_value_interval_46 IS NULL,0,1) + IF(measuring_value_interval_47 IS NULL,0,1) + IF(measuring_value_interval_48 IS NULL,0,1) + IF(measuring_value_interval_49 IS NULL,0,1) + IF(measuring_value_interval_50 IS NULL,0,1) + IF(measuring_value_interval_51 IS NULL,0,1) + IF(measuring_value_interval_52 IS NULL,0,1) + IF(measuring_value_interval_53 IS NULL,0,1) + IF(measuring_value_interval_54 IS NULL,0,1) + IF(measuring_value_interval_55 IS NULL,0,1) + IF(measuring_value_interval_56 IS NULL,0,1) + IF(measuring_value_interval_57 IS NULL,0,1) + IF(measuring_value_interval_58 IS NULL,0,1) + IF(measuring_value_interval_59 IS NULL,0,1) + IF(measuring_value_interval_60 IS NULL,0,1) + IF(measuring_value_interval_61 IS NULL,0,1) + IF(measuring_value_interval_62 IS NULL,0,1) + IF(measuring_value_interval_63 IS NULL,0,1) + IF(measuring_value_interval_64 IS NULL,0,1) + IF(measuring_value_interval_65 IS NULL,0,1) + IF(measuring_value_interval_66 IS NULL,0,1) + IF(measuring_value_interval_67 IS NULL,0,1) + IF(measuring_value_interval_68 IS NULL,0,1) + IF(measuring_value_interval_69 IS NULL,0,1) + IF(measuring_value_interval_70 IS NULL,0,1) + IF(measuring_value_interval_71 IS NULL,0,1) + IF(measuring_value_interval_72 IS NULL,0,1) + IF(measuring_value_interval_73 IS NULL,0,1) + IF(measuring_value_interval_74 IS NULL,0,1) + IF(measuring_value_interval_75 IS NULL,0,1) + IF(measuring_value_interval_76 IS NULL,0,1) + IF(measuring_value_interval_77 IS NULL,0,1) + IF(measuring_value_interval_78 IS NULL,0,1) + IF(measuring_value_interval_79 IS NULL,0,1) + IF(measuring_value_interval_80 IS NULL,0,1) + IF(measuring_value_interval_81 IS NULL,0,    1) + IF(measuring_value_interval_82 IS NULL,0,1) + IF(measuring_value_interval_83 IS NULL,0,1) + IF(measuring_value_interval_84 IS NULL,0,1) + IF(measuring_value_interval_85 IS NULL,0,1) + IF(measuring_value_interval_86 IS NULL,0,1) + IF(measuring_value_interval_87 IS NULL,0,1) + IF(measuring_value_interval_88 IS NULL,0,1) + IF(measuring_value_interval_89 IS NULL,0,1) + IF(measuring_value_interval_90 IS NULL,0,1) + IF(measuring_value_interval_91 IS NULL,0,1) + IF(measuring_value_interval_92 IS NULL,0,1) + IF(measuring_value_interval_93 IS NULL,0,1) + IF(measuring_value_interval_94 IS NULL,0,1) + IF(measuring_value_interval_95 IS NULL,0,1) + IF(measuring_value_interval_96 IS NULL,0,1) + IF(measuring_value_interval_97 IS NULL,0,1) + IF(measuring_value_interval_98 IS NULL,0,1) + IF(measuring_value_interval_99 IS NULL,0,1) + IF(measuring_value_interval_100 IS NULL,0,1) + IF(measuring_value_interval_101 IS NULL,0,1) + IF(measuring_value_interval_102 IS NULL,0,1) + IF(measuring_value_interval_103 IS NULL,0,1) + IF(measuring_value_interval_104 IS NULL,0,1) + IF(measuring_value_interval_105 IS NULL,0,1) + IF(measuring_value_interval_106 IS NULL,0,1) + IF(measuring_value_interval_107 IS NULL,0,1) + IF(measuring_value_interval_108 IS NULL,0,1) + IF(measuring_value_interval_109 IS NULL,0,1) + IF(measuring_value_interval_110 IS NULL,0,1) + IF(measuring_value_interval_111 IS NULL,0,1) + IF(measuring_value_interval_112 IS NULL,0,1) + IF(measuring_value_interval_113 IS NULL,0,1) + IF(measuring_value_interval_114 IS NULL,0,1))) AS day_avg  \
        FROM  lvs_measuring_data.wind_turbine_unit_measuring_data_daily WHERE wind_turbine_serial_id_fk IN (:turbines)  AND variable_id_fk IN (:variable_id_fk) AND value_type_id_fk IN (:value_type_id_fk) AND measuring_date >= :start_date AND measuring_date <= :end_date ) t1 \
        GROUP BY measuring_date, variable_id_fk ORDER BY measuring_date, variable_id_fk" ;
        lvs_db.sequelize.query(query_string, {
            replacements: {
                turbines: turbines,
                farm : farm,
                start_date: params.start_date,
                end_date: params.end_date,
                variable_id_fk: params.variables,
                value_type_id_fk: params.type
            },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
            callback(true, 200, "Success", data);
        }).catch(function(err) {
            console.log(err)
            callback(false, 300, "Error : " +  err, {});
        });
    });
}



exports.getNightWeatherAverage = function( farm, params, callback){
    let turbines= [];
    turbineMasterDatas.getTurbinesFromFarm(farm, function (s,c,m,d) {
        turbines = _.map(d, function(item) {
                return item.serial_number
            });
        let query_string= "SELECT measuring_date AS time,  variable_id_fk, AVG(night_avg) AS value, :farm AS wind_farm  FROM \
        (SELECT first_measuring_timestamp, measuring_date, wind_turbine_serial_id_fk, variable_id_fk,   value_type_id_fk, \
        ((COALESCE(measuring_value_interval_1, 0) + COALESCE(measuring_value_interval_2, 0) + COALESCE(measuring_value_interval_3, 0) + COALESCE(measuring_value_interval_4, 0) + COALESCE(measuring_value_interval_5, 0) + COALESCE(measuring_value_interval_6, 0) + COALESCE(measuring_value_interval_7, 0) + COALESCE(measuring_value_interval_8, 0) + COALESCE(measuring_value_interval_9, 0) + COALESCE(measuring_value_interval_10, 0) + COALESCE(measuring_value_interval_11, 0) + COALESCE(measuring_value_interval_12, 0) + COALESCE(measuring_value_interval_13, 0) + COALESCE(measuring_value_interval_14, 0) + COALESCE(measuring_value_interval_15, 0) + COALESCE(measuring_value_interval_16, 0) + COALESCE(measuring_value_interval_17, 0) + COALESCE(measuring_value_interval_18, 0) + COALESCE(measuring_value_interval_19, 0) + COALESCE(measuring_value_interval_20, 0) + COALESCE(measuring_value_interval_21, 0) + COALESCE(measuring_value_interval_22, 0) + COALESCE(measuring_value_interval_23, 0) + COALESCE(measuring_value_interval_24, 0) + COALESCE(measuring_value_interval_25, 0) + COALESCE(measuring_value_interval_26, 0) + COALESCE(measuring_value_interval_27, 0) + COALESCE(measuring_value_interval_28, 0) + COALESCE(measuring_value_interval_29, 0) + COALESCE(measuring_value_interval_30, 0) + COALESCE(measuring_value_interval_31, 0) + COALESCE(measuring_value_interval_32, 0) + COALESCE(measuring_value_interval_33, 0) + COALESCE(measuring_value_interval_34, 0) + COALESCE(measuring_value_interval_35, 0) + COALESCE(measuring_value_interval_36, 0) + COALESCE(measuring_value_interval_37, 0) + COALESCE(measuring_value_interval_38, 0) + COALESCE(measuring_value_interval_39, 0) + COALESCE(measuring_value_interval_40, 0) + COALESCE(measuring_value_interval_41, 0) + COALESCE(measuring_value_interval_42, 0) + COALESCE(measuring_value_interval_115, 0) + COALESCE(measuring_value_interval_116, 0) + COALESCE(measuring_value_interval_117, 0) + COALESCE(measuring_value_interval_118, 0) + COALESCE(measuring_value_interval_119, 0) + COALESCE(measuring_value_interval_120, 0) + COALESCE(measuring_value_interval_121, 0) + COALESCE(measuring_value_interval_122, 0) + COALESCE(measuring_value_interval_123, 0) + COALESCE(measuring_value_interval_124, 0) + COALESCE(measuring_value_interval_125, 0) + COALESCE(measuring_value_interval_126, 0) + COALESCE(measuring_value_interval_127, 0) + COALESCE(measuring_value_interval_128, 0) + COALESCE(measuring_value_interval_129, 0) + COALESCE(measuring_value_interval_130, 0) + COALESCE(measuring_value_interval_131, 0) + COALESCE(measuring_value_interval_132, 0) + COALESCE(measuring_value_interval_133, 0) + COALESCE(measuring_value_interval_134, 0) + COALESCE(measuring_value_interval_135, 0) + COALESCE(measuring_value_interval_136, 0) + COALESCE(measuring_value_interval_137, 0) + COALESCE(measuring_value_interval_138, 0) + COALESCE(measuring_value_interval_139, 0) + COALESCE(measuring_value_interval_140, 0) + COALESCE(measuring_value_interval_141, 0) + COALESCE(measuring_value_interval_142, 0) + COALESCE(measuring_value_interval_143, 0) + COALESCE(measuring_value_interval_144, 0)) / ((IF(measuring_value_interval_1 IS NULL,0,1) + IF(measuring_value_interval_2 IS NULL,0,1) + IF(measuring_value_interval_3 IS NULL,0,1) + IF(measuring_value_interval_4 IS NULL,0,1) + IF(measuring_value_interval_5 IS NULL,0,1) + IF(measuring_value_interval_6 IS NULL,0,1) + IF(measuring_value_interval_7 IS NULL,0,1) + IF(measuring_value_interval_8 IS NULL,0,1) + IF(measuring_value_interval_9 IS NULL,0,1) + IF(measuring_value_interval_10 IS NULL,0,1) + IF(measuring_value_interval_11 IS NULL,0,1) + IF(measuring_value_interval_12 IS NULL,0,1) + IF(measuring_value_interval_13 IS NULL,0,1) + IF(measuring_value_interval_14 IS NULL,0,1) + IF(measuring_value_interval_15 IS NULL,0,1) + IF(measuring_value_interval_16 IS NULL,0,1) + IF(measuring_value_interval_17 IS NULL,0,1) + IF(measuring_value_interval_18 IS NULL,0,1) + IF(measuring_value_interval_19 IS NULL,0,1) + IF(measuring_value_interval_20 IS NULL,0,1) + IF(measuring_value_interval_21 IS NULL,0,1) + IF(measuring_value_interval_22 IS NULL,0,1) + IF(measuring_value_interval_23 IS NULL,0,1) + IF(measuring_value_interval_24 IS NULL,0,1) + IF(measuring_value_interval_25 IS NULL,0,1) + IF(measuring_value_interval_26 IS NULL,0,1) + IF(measuring_value_interval_27 IS NULL,0,1) + IF(measuring_value_interval_28 IS NULL,0,1) + IF(measuring_value_interval_29 IS NULL,0,1) + IF(measuring_value_interval_30 IS NULL,0,1) + IF(measuring_value_interval_31 IS NULL,0,1) + IF(measuring_value_interval_32 IS NULL,0,1) + IF(measuring_value_interval_33 IS NULL,0,1) + IF(measuring_value_interval_34 IS NULL,0,1) + IF(measuring_value_interval_35 IS NULL,0,1) + IF(measuring_value_interval_36 IS NULL,0,1) + IF(measuring_value_interval_37 IS NULL,0,1) + IF(measuring_value_interval_38 IS NULL,0,1) + IF(measuring_value_interval_39 IS NULL,0,1) + IF(measuring_value_interval_40 IS NULL,0,1) + IF(measuring_value_interval_41 IS NULL,0,1) + IF(measuring_value_interval_42 IS NULL,0,1) + IF(measuring_value_interval_115 IS NULL,0,1) + IF(measuring_value_interval_116 IS NULL,0,1) + IF(measuring_value_interval_117 IS NULL,0,1) + IF(measuring_value_interval_118 IS NULL,0,1) + IF(measuring_value_interval_119 IS NULL,0,1) + IF(measuring_value_interval_120 IS NULL,0,1) + IF(measuring_value_interval_121 IS NULL,0,1) + IF(measuring_value_interval_122 IS NULL,0,1) + IF(measuring_value_interval_123 IS NULL,0,1) + IF(measuring_value_interval_124 IS NULL,0,1) + IF(measuring_value_interval_125 IS NULL,0,1) + IF(measuring_value_interval_126 IS NULL,0,1) + IF(measuring_value_interval_127 IS NULL,0,1) + IF(measuring_value_interval_128 IS NULL,0,1) + IF(measuring_value_interval_129 IS NULL,0,1) + IF(measuring_value_interval_130 IS NULL,0,1) + IF(measuring_value_interval_131 IS NULL,0,1) + IF(measuring_value_interval_132 IS NULL,0,1) + IF(measuring_value_interval_133 IS NULL,0,1) + IF(measuring_value_interval_134 IS NULL,0,1) + IF(measuring_value_interval_135 IS NULL,0,1) + IF(measuring_value_interval_136 IS NULL,0,1) + IF(measuring_value_interval_137 IS NULL,0,1) + IF(measuring_value_interval_138 IS NULL,0,1) + IF(measuring_value_interval_139 IS NULL,0,1) + IF(measuring_value_interval_140 IS NULL,0,1) + IF(measuring_value_interval_141 IS NULL,0,1) + IF(measuring_value_interval_142 IS NULL,0,1) + IF(measuring_value_interval_143 IS NULL,0,1) + IF(measuring_value_interval_144 IS NULL,0,1)))) AS night_avg  \
        FROM  lvs_measuring_data.wind_turbine_unit_measuring_data_daily WHERE wind_turbine_serial_id_fk IN (:turbines)  AND variable_id_fk IN (:variable_id_fk) AND value_type_id_fk IN (:value_type_id_fk) AND measuring_date >= :start_date AND measuring_date <= :end_date ) t1 \
        GROUP BY measuring_date, variable_id_fk ORDER BY measuring_date, variable_id_fk" ;
        lvs_db.sequelize.query(query_string, {
            replacements: {
                turbines: turbines,
                farm : farm,
                start_date: params.start_date,
                end_date: params.end_date,
                variable_id_fk: params.variables,
                value_type_id_fk: params.type
            },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
            callback(true, 200, "Success", data);
        }).catch(function(err) {
            console.log(err)
            callback(false, 300, "Error : " +  err, {});
        });
    });
}