var lvs_db = require('../lvs_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');

exports.getDayLevel = function(params, callback) {
    console.log(params.turbines);
  let query_string = "select unix_timestamp(measuring_date)*1000 as time, wind_turbine_serial_id_fk, variable_id_fk,"+
       "((COALESCE(measuring_value_interval_1,0)+" +
			"COALESCE(measuring_value_interval_2	,0)+" +
			"COALESCE(measuring_value_interval_3	,0)+" +
			"COALESCE(measuring_value_interval_4	,0)+" +
			"COALESCE(measuring_value_interval_5	,0)+" +
			"COALESCE(measuring_value_interval_6	,0)+" +
			"COALESCE(measuring_value_interval_7	,0)+" +
			"COALESCE(measuring_value_interval_8	,0)+" +
			"COALESCE(measuring_value_interval_9	,0)+" +
			"COALESCE(measuring_value_interval_10	,0)+" +
			"COALESCE(measuring_value_interval_11	,0)+" +
			"COALESCE(measuring_value_interval_12	,0)+" +
			"COALESCE(measuring_value_interval_13	,0)+" +
			"COALESCE(measuring_value_interval_14	,0)+" +
			"COALESCE(measuring_value_interval_15	,0)+" +
			"COALESCE(measuring_value_interval_16	,0)+" +
			"COALESCE(measuring_value_interval_17	,0)+" +
			"COALESCE(measuring_value_interval_18	,0)+" +
			"COALESCE(measuring_value_interval_19	,0)+" +
			"COALESCE(measuring_value_interval_20	,0)+" +
			"COALESCE(measuring_value_interval_21	,0)+" +
			"COALESCE(measuring_value_interval_22	,0)+" +
			"COALESCE(measuring_value_interval_23	,0)+" +
			"COALESCE(measuring_value_interval_24	,0)+" +
			"COALESCE(measuring_value_interval_25	,0)+" +
			"COALESCE(measuring_value_interval_26	,0)+" +
			"COALESCE(measuring_value_interval_27	,0)+" +
			"COALESCE(measuring_value_interval_28	,0)+" +
			"COALESCE(measuring_value_interval_29	,0)+" +
			"COALESCE(measuring_value_interval_30	,0)+" +
			"COALESCE(measuring_value_interval_31	,0)+" +
			"COALESCE(measuring_value_interval_32	,0)+" +
			"COALESCE(measuring_value_interval_33	,0)+" +
			"COALESCE(measuring_value_interval_34	,0)+" +
			"COALESCE(measuring_value_interval_35	,0)+" +
			"COALESCE(measuring_value_interval_36	,0)+" +
			"COALESCE(measuring_value_interval_37	,0)+" +
			"COALESCE(measuring_value_interval_38	,0)+" +
			"COALESCE(measuring_value_interval_39	,0)+" +
			"COALESCE(measuring_value_interval_40	,0)+" +
			"COALESCE(measuring_value_interval_41	,0)+" +
			"COALESCE(measuring_value_interval_42	,0)+" +
			"COALESCE(measuring_value_interval_43	,0)+" +
			"COALESCE(measuring_value_interval_44	,0)+" +
			"COALESCE(measuring_value_interval_45	,0)+" +
			"COALESCE(measuring_value_interval_46	,0)+" +
			"COALESCE(measuring_value_interval_47	,0)+" +
			"COALESCE(measuring_value_interval_48	,0)+" +
			"COALESCE(measuring_value_interval_49	,0)+" +
			"COALESCE(measuring_value_interval_50	,0)+" +
			"COALESCE(measuring_value_interval_51	,0)+" +
			"COALESCE(measuring_value_interval_52	,0)+" +
			"COALESCE(measuring_value_interval_53	,0)+" +
			"COALESCE(measuring_value_interval_54	,0)+" +
			"COALESCE(measuring_value_interval_55	,0)+" +
			"COALESCE(measuring_value_interval_56	,0)+" +
			"COALESCE(measuring_value_interval_57	,0)+" +
			"COALESCE(measuring_value_interval_58	,0)+" +
			"COALESCE(measuring_value_interval_59	,0)+" +
			"COALESCE(measuring_value_interval_60	,0)+" +
			"COALESCE(measuring_value_interval_61	,0)+" +
			"COALESCE(measuring_value_interval_62	,0)+" +
			"COALESCE(measuring_value_interval_63	,0)+" +
			"COALESCE(measuring_value_interval_64	,0)+" +
			"COALESCE(measuring_value_interval_65	,0)+" +
			"COALESCE(measuring_value_interval_66	,0)+" +
			"COALESCE(measuring_value_interval_67	,0)+" +
			"COALESCE(measuring_value_interval_68	,0)+" +
			"COALESCE(measuring_value_interval_69	,0)+" +
			"COALESCE(measuring_value_interval_70	,0)+" +
			"COALESCE(measuring_value_interval_71	,0)+" +
			"COALESCE(measuring_value_interval_72	,0)+" +
			"COALESCE(measuring_value_interval_73	,0)+" +
			"COALESCE(measuring_value_interval_74	,0)+" +
			"COALESCE(measuring_value_interval_75	,0)+" +
			"COALESCE(measuring_value_interval_76	,0)+" +
			"COALESCE(measuring_value_interval_77	,0)+" +
			"COALESCE(measuring_value_interval_78	,0)+" +
			"COALESCE(measuring_value_interval_79	,0)+" +
			"COALESCE(measuring_value_interval_80	,0)+" +
			"COALESCE(measuring_value_interval_81	,0)+" +
			"COALESCE(measuring_value_interval_82	,0)+" +
			"COALESCE(measuring_value_interval_83	,0)+" +
			"COALESCE(measuring_value_interval_84	,0)+" +
			"COALESCE(measuring_value_interval_85	,0)+" +
			"COALESCE(measuring_value_interval_86	,0)+" +
			"COALESCE(measuring_value_interval_87	,0)+" +
			"COALESCE(measuring_value_interval_88	,0)+" +
			"COALESCE(measuring_value_interval_89	,0)+" +
			"COALESCE(measuring_value_interval_90	,0)+" +
			"COALESCE(measuring_value_interval_91	,0)+" +
			"COALESCE(measuring_value_interval_92	,0)+" +
			"COALESCE(measuring_value_interval_93	,0)+" +
			"COALESCE(measuring_value_interval_94	,0)+" +
			"COALESCE(measuring_value_interval_95	,0)+" +
			"COALESCE(measuring_value_interval_96	,0)+" +
			"COALESCE(measuring_value_interval_97	,0)+" +
			"COALESCE(measuring_value_interval_98	,0)+" +
			"COALESCE(measuring_value_interval_99	,0)+" +
			"COALESCE(measuring_value_interval_100	,0)+" +
			"COALESCE(measuring_value_interval_101	,0)+" +
			"COALESCE(measuring_value_interval_102	,0)+" +
			"COALESCE(measuring_value_interval_103	,0)+" +
			"COALESCE(measuring_value_interval_104	,0)+" +
			"COALESCE(measuring_value_interval_105	,0)+" +
			"COALESCE(measuring_value_interval_106	,0)+" +
			"COALESCE(measuring_value_interval_107	,0)+" +
			"COALESCE(measuring_value_interval_108	,0)+" +
			"COALESCE(measuring_value_interval_109	,0)+" +
			"COALESCE(measuring_value_interval_110	,0)+" +
			"COALESCE(measuring_value_interval_111	,0)+" +
			"COALESCE(measuring_value_interval_112	,0)+" +
			"COALESCE(measuring_value_interval_113	,0)+" +
			"COALESCE(measuring_value_interval_114	,0)+" +
			"COALESCE(measuring_value_interval_115	,0)+" +
			"COALESCE(measuring_value_interval_116	,0)+" +
			"COALESCE(measuring_value_interval_117	,0)+" +
			"COALESCE(measuring_value_interval_118	,0)+" +
			"COALESCE(measuring_value_interval_119	,0)+" +
			"COALESCE(measuring_value_interval_120	,0)+" +
			"COALESCE(measuring_value_interval_121	,0)+" +
			"COALESCE(measuring_value_interval_122	,0)+" +
			"COALESCE(measuring_value_interval_123	,0)+" +
			"COALESCE(measuring_value_interval_124	,0)+" +
			"COALESCE(measuring_value_interval_125	,0)+" +
			"COALESCE(measuring_value_interval_126	,0)+" +
			"COALESCE(measuring_value_interval_127	,0)+" +
			"COALESCE(measuring_value_interval_128	,0)+" +
			"COALESCE(measuring_value_interval_129	,0)+" +
			"COALESCE(measuring_value_interval_130	,0)+" +
			"COALESCE(measuring_value_interval_131	,0)+" +
			"COALESCE(measuring_value_interval_132	,0)+" +
			"COALESCE(measuring_value_interval_133	,0)+" +
			"COALESCE(measuring_value_interval_134	,0)+" +
			"COALESCE(measuring_value_interval_135	,0)+" +
			"COALESCE(measuring_value_interval_136	,0)+" +
			"COALESCE(measuring_value_interval_137	,0)+" +
			"COALESCE(measuring_value_interval_138	,0)+" +
			"COALESCE(measuring_value_interval_139	,0)+" +
			"COALESCE(measuring_value_interval_140	,0)+" +
			"COALESCE(measuring_value_interval_141	,0)+" +
			"COALESCE(measuring_value_interval_142	,0)+" +
			"COALESCE(measuring_value_interval_143	,0)+" +
			"COALESCE(measuring_value_interval_144,0)" +
			")/(IF(measuring_value_interval_1	is null, 0, 1) + "+
			"IF(measuring_value_interval_2	is null, 0, 1) + "+
			"IF(measuring_value_interval_3	is null, 0, 1) + "+
			"IF(measuring_value_interval_4	is null, 0, 1) + "+
			"IF(measuring_value_interval_5	is null, 0, 1) + "+
			"IF(measuring_value_interval_6	is null, 0, 1) + "+
			"IF(measuring_value_interval_7	is null, 0, 1) + "+
			"IF(measuring_value_interval_8	is null, 0, 1) + "+
			"IF(measuring_value_interval_9	is null, 0, 1) + "+
			"IF(measuring_value_interval_10	is null, 0, 1) + "+
			"IF(measuring_value_interval_11	is null, 0, 1) + "+
			"IF(measuring_value_interval_12	is null, 0, 1) + "+
			"IF(measuring_value_interval_13	is null, 0, 1) + "+
			"IF(measuring_value_interval_14	is null, 0, 1) + "+
			"IF(measuring_value_interval_15	is null, 0, 1) + "+
			"IF(measuring_value_interval_16	is null, 0, 1) + "+
			"IF(measuring_value_interval_17	is null, 0, 1) + "+
			"IF(measuring_value_interval_18	is null, 0, 1) + "+
			"IF(measuring_value_interval_19	is null, 0, 1) + "+
			"IF(measuring_value_interval_20	is null, 0, 1) + "+
			"IF(measuring_value_interval_21	is null, 0, 1) + "+
			"IF(measuring_value_interval_22	is null, 0, 1) + "+
			"IF(measuring_value_interval_23	is null, 0, 1) + "+
			"IF(measuring_value_interval_24	is null, 0, 1) + "+
			"IF(measuring_value_interval_25	is null, 0, 1) + "+
			"IF(measuring_value_interval_26	is null, 0, 1) + "+
			"IF(measuring_value_interval_27	is null, 0, 1) + "+
			"IF(measuring_value_interval_28	is null, 0, 1) + "+
			"IF(measuring_value_interval_29	is null, 0, 1) + "+
			"IF(measuring_value_interval_30	is null, 0, 1) + "+
			"IF(measuring_value_interval_31	is null, 0, 1) + "+
			"IF(measuring_value_interval_32	is null, 0, 1) + "+
			"IF(measuring_value_interval_33	is null, 0, 1) + "+
			"IF(measuring_value_interval_34	is null, 0, 1) + "+
			"IF(measuring_value_interval_35	is null, 0, 1) + "+
			"IF(measuring_value_interval_36	is null, 0, 1) + "+
			"IF(measuring_value_interval_37	is null, 0, 1) + "+
			"IF(measuring_value_interval_38	is null, 0, 1) + "+
			"IF(measuring_value_interval_39	is null, 0, 1) + "+
			"IF(measuring_value_interval_40	is null, 0, 1) + "+
			"IF(measuring_value_interval_41	is null, 0, 1) + "+
			"IF(measuring_value_interval_42	is null, 0, 1) + "+
			"IF(measuring_value_interval_43	is null, 0, 1) + "+
			"IF(measuring_value_interval_44	is null, 0, 1) + "+
			"IF(measuring_value_interval_45	is null, 0, 1) + "+
			"IF(measuring_value_interval_46	is null, 0, 1) + "+
			"IF(measuring_value_interval_47	is null, 0, 1) + "+
			"IF(measuring_value_interval_48	is null, 0, 1) + "+
			"IF(measuring_value_interval_49	is null, 0, 1) + "+
			"IF(measuring_value_interval_50	is null, 0, 1) + "+
			"IF(measuring_value_interval_51	is null, 0, 1) + "+
			"IF(measuring_value_interval_52	is null, 0, 1) + "+
			"IF(measuring_value_interval_53	is null, 0, 1) + "+
			"IF(measuring_value_interval_54	is null, 0, 1) + "+
			"IF(measuring_value_interval_55	is null, 0, 1) + "+
			"IF(measuring_value_interval_56	is null, 0, 1) + "+
			"IF(measuring_value_interval_57	is null, 0, 1) + "+
			"IF(measuring_value_interval_58	is null, 0, 1) + "+
			"IF(measuring_value_interval_59	is null, 0, 1) + "+
			"IF(measuring_value_interval_60	is null, 0, 1) + "+
			"IF(measuring_value_interval_61	is null, 0, 1) + "+
			"IF(measuring_value_interval_62	is null, 0, 1) + "+
			"IF(measuring_value_interval_63	is null, 0, 1) + "+
			"IF(measuring_value_interval_64	is null, 0, 1) + "+
			"IF(measuring_value_interval_65	is null, 0, 1) + "+
			"IF(measuring_value_interval_66	is null, 0, 1) + "+
			"IF(measuring_value_interval_67	is null, 0, 1) + "+
			"IF(measuring_value_interval_68	is null, 0, 1) + "+
			"IF(measuring_value_interval_69	is null, 0, 1) + "+
			"IF(measuring_value_interval_70	is null, 0, 1) + "+
			"IF(measuring_value_interval_71	is null, 0, 1) + "+
			"IF(measuring_value_interval_72	is null, 0, 1) + "+
			"IF(measuring_value_interval_73	is null, 0, 1) + "+
			"IF(measuring_value_interval_74	is null, 0, 1) + "+
			"IF(measuring_value_interval_75	is null, 0, 1) + "+
			"IF(measuring_value_interval_76	is null, 0, 1) + "+
			"IF(measuring_value_interval_77	is null, 0, 1) + "+
			"IF(measuring_value_interval_78	is null, 0, 1) + "+
			"IF(measuring_value_interval_79	is null, 0, 1) + "+
			"IF(measuring_value_interval_80	is null, 0, 1) + "+
			"IF(measuring_value_interval_81	is null, 0, 1) + "+
			"IF(measuring_value_interval_82	is null, 0, 1) + "+
			"IF(measuring_value_interval_83	is null, 0, 1) + "+
			"IF(measuring_value_interval_84	is null, 0, 1) + "+
			"IF(measuring_value_interval_85	is null, 0, 1) + "+
			"IF(measuring_value_interval_86	is null, 0, 1) + "+
			"IF(measuring_value_interval_87	is null, 0, 1) + "+
			"IF(measuring_value_interval_88	is null, 0, 1) + "+
			"IF(measuring_value_interval_89	is null, 0, 1) + "+
			"IF(measuring_value_interval_90	is null, 0, 1) + "+
			"IF(measuring_value_interval_91	is null, 0, 1) + "+
			"IF(measuring_value_interval_92	is null, 0, 1) + "+
			"IF(measuring_value_interval_93	is null, 0, 1) + "+
			"IF(measuring_value_interval_94	is null, 0, 1) + "+
			"IF(measuring_value_interval_95	is null, 0, 1) + "+
			"IF(measuring_value_interval_96	is null, 0, 1) + "+
			"IF(measuring_value_interval_97	is null, 0, 1) + "+
			"IF(measuring_value_interval_98	is null, 0, 1) + "+
			"IF(measuring_value_interval_99	is null, 0, 1) + "+
			"IF(measuring_value_interval_100	is null, 0, 1) + "+
			"IF(measuring_value_interval_101	is null, 0, 1) + "+
			"IF(measuring_value_interval_102	is null, 0, 1) + "+
			"IF(measuring_value_interval_103	is null, 0, 1) + "+
			"IF(measuring_value_interval_104	is null, 0, 1) + "+
			"IF(measuring_value_interval_105	is null, 0, 1) + "+
			"IF(measuring_value_interval_106	is null, 0, 1) + "+
			"IF(measuring_value_interval_107	is null, 0, 1) + "+
			"IF(measuring_value_interval_108	is null, 0, 1) + "+
			"IF(measuring_value_interval_109	is null, 0, 1) + "+
			"IF(measuring_value_interval_110	is null, 0, 1) + "+
			"IF(measuring_value_interval_111	is null, 0, 1) + "+
			"IF(measuring_value_interval_112	is null, 0, 1) + "+
			"IF(measuring_value_interval_113	is null, 0, 1) + "+
			"IF(measuring_value_interval_114	is null, 0, 1) + "+
			"IF(measuring_value_interval_115	is null, 0, 1) + "+
			"IF(measuring_value_interval_116	is null, 0, 1) + "+
			"IF(measuring_value_interval_117	is null, 0, 1) + "+
			"IF(measuring_value_interval_118	is null, 0, 1) + "+
			"IF(measuring_value_interval_119	is null, 0, 1) + "+
			"IF(measuring_value_interval_120	is null, 0, 1) + "+
			"IF(measuring_value_interval_121	is null, 0, 1) + "+
			"IF(measuring_value_interval_122	is null, 0, 1) + "+
			"IF(measuring_value_interval_123	is null, 0, 1) + "+
			"IF(measuring_value_interval_124	is null, 0, 1) + "+
			"IF(measuring_value_interval_125	is null, 0, 1) + "+
			"IF(measuring_value_interval_126	is null, 0, 1) + "+
			"IF(measuring_value_interval_127	is null, 0, 1) + "+
			"IF(measuring_value_interval_128	is null, 0, 1) + "+
			"IF(measuring_value_interval_129	is null, 0, 1) + "+
			"IF(measuring_value_interval_130	is null, 0, 1) + "+
			"IF(measuring_value_interval_131	is null, 0, 1) + "+
			"IF(measuring_value_interval_132	is null, 0, 1) + "+
			"IF(measuring_value_interval_133	is null, 0, 1) + "+
			"IF(measuring_value_interval_134	is null, 0, 1) + "+
			"IF(measuring_value_interval_135	is null, 0, 1) + "+
			"IF(measuring_value_interval_136	is null, 0, 1) + "+
			"IF(measuring_value_interval_137	is null, 0, 1) + "+
			"IF(measuring_value_interval_138	is null, 0, 1) + "+
			"IF(measuring_value_interval_139	is null, 0, 1) + "+
			"IF(measuring_value_interval_140	is null, 0, 1) + "+
			"IF(measuring_value_interval_141	is null, 0, 1) + "+
			"IF(measuring_value_interval_142	is null, 0, 1) + "+
			"IF(measuring_value_interval_143	is null, 0, 1) + "+
			"IF(measuring_value_interval_144 is null, 0, 1))) AS value "+
        "from lvs_measuring_data.wind_turbine_unit_measuring_data_daily "+
        "where  wind_turbine_serial_id_fk in ("+params.turbines+") "+
        " and variable_id_fk in ("+params.variable+")  "+
        " and measuring_date >= :start_date "+
        " and measuring_date <= :end_date "+
        " and value_type_id_fk = :type "+
		" ORDER BY time";

    lvs_db.sequelize.query(query_string, {
      replacements:{
        //params.turbines: params.turbines,
        //variable:params.variable ,
        start_date: params.start_date ,
        end_date: params.end_date ,
        type:params.type
      },
      type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " +  err, {});
    });
}

exports.get10MinLevel = function(params, callback) {
  let query_string_10_min = "SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*10 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_1   AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t2  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*20 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_2  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t3  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*30 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_3  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t4  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*40 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_4  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t5  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*50 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_5  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t6  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*60 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_6  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t7  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*70 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_7  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t8  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*80 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_8  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t9  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*90 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_9  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t10  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*100 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_10  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t11  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*110 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_11  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t12  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*120 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_12  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t13  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*130 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_13  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t14  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*140 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_14  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t15  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*150 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_15  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t16  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*160 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_16  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t17  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*170 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_17  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t18  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*180 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_18  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t19  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*190 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_19  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t20  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*200 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_20  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t21  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*210 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_21  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t22  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*220 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_22  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t23  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*230 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_23  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t24  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*240 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_24  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t25  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*250 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_25  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t26  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*260 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_26  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t27  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*270 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_27  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t28  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*280 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_28  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t29  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*290 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_29  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t30  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*300 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_30  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t31  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*310 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_31  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t32  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*320 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_32  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t33  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*330 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_33  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t34  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*340 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_34  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t35  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*350 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_35  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t36  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*360 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_36  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t37  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*370 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_37  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t38  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*380 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_38  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t39  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*390 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_39  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t40  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*400 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_40  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t41  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*410 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_41  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t42  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*420 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_42  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t43  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*430 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_43  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t44  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*440 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_44  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t45  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*450 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_45  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t46  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*460 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_46  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t47  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*470 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_47  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t48  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*480 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_48  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t49  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*490 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_49  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t50  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*500 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_50  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t51  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*510 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_51  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t52  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*520 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_52  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t53  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*530 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_53  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t54  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*540 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_54  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t55  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*550 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_55  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t56  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*560 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_56  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t57  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*570 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_57  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t58  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*580 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_58  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t59  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*590 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_59  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t60  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*600 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_60  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t61  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*610 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_61  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t62  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*620 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_62  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t63  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*630 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_63  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t64  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*640 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_64  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t65  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*650 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_65  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t66  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*660 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_66  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t67  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*670 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_67  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t68  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*680 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_68  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t69  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*690 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_69  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t70  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*700 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_70  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t71  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*710 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_71  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t72  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*720 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_72  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t73  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*730 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_73  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t74  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*740 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_74  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t75  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*750 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_75  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t76  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*760 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_76  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t77  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*770 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_77  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t78  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*780 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_78  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t79  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*790 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_79  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t80  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*800 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_80  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t81  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*810 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_81  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t82  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*820 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_82  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t83  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*830 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_83  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t84  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*840 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_84  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t85  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*850 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_85  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t86  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*860 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_86  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t87  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*870 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_87  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t88  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*880 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_88  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t89  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*890 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_89  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t90  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*900 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_90  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t91  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*910 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_91  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t92  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*920 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_92  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t93  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*930 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_93  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t94  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*940 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_94  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t95  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*950 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_95  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t96  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*960 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_96  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t97  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*970 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_97  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t98  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*980 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_98  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t99  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*990 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_99  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date  and measuring_date <= :end_date    and value_type_id_fk = :type) t100  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1000 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_100  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t101  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1010 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_101  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t102  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1020 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_102  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t103  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1030 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_103  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t104  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1040 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_104  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t105  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1050 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_105  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t106  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1060 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_106  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t107  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1070 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_107  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t108  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1080 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_108  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t109  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1090 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_109  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t110  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1100 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_110  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t111  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1110 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_111  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t112  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1120 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_112  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t113  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1130 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_113  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t114  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1140 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_114  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t115  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1150 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_115  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t116  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1160 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_116  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t117  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1170 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_117  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t118  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1180 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_118  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t119  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1190 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_119  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t120  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1200 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_120  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t121  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1210 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_121  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t122  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1220 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_122  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t123  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1230 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_123  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t124  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1240 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_124  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t125  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1250 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_125  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t126  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1260 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_126  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t127  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1270 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_127  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date  and measuring_date <= :end_date    and value_type_id_fk = :type) t128  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1280 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_128  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t129  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1290 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_129  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t130  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1300 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_130  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t131  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1310 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_131  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t132  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1320 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_132  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t133  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1330 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_133  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t134  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1340 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_134  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t135  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1350 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_135  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t136  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1360 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_136  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t137  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1370 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_137  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t138  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1380 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_138  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t139  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1390 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_139  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t140  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1400 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_140  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t141  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1410 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_141  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t142  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1420 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_142  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t143  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1430 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_143  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t144  "+
                " UNION ALL SELECT measuring_date,(UNIX_TIMESTAMP(measuring_date)*1000)+(60000*1440 ) AS time, wind_turbine_serial_id_fk , variable_id_fk, measuring_value_interval_144  AS value FROM (SELECT * FROM lvs_measuring_data.wind_turbine_unit_measuring_data_daily where  wind_turbine_serial_id_fk in ("+params.turbines+")  and variable_id_fk in ("+params.variable+") and measuring_date >= :start_date and measuring_date <= :end_date    and value_type_id_fk = :type) t145  "+
                " ORDER BY time"

 lvs_db.sequelize.query(query_string_10_min, {
         replacements:{
            // params.turbines: [params.turbines],
            // variables:[params.variable] ,
            start_date: params.start_date ,
            end_date: params.end_date ,
            type:params.type
         },
         type: sequelize.QueryTypes.SELECT
     }).then(function(data) {
      callback(true, 200, "Success", data);
  }).catch(function(err) {
      console.log(err)
      callback(false, 300, "Error : " +  err, {});
  });

}
