var lvs_db = require('../lvs_db/schema');
var sequelize = require('sequelize');
var _ = require('underscore');
var moment = require('moment-timezone');

exports.getDayLevel = function(params, callback) {
    // console.log(params);
  let query_string = "select wind_turbine_serial_id_fk, variable_id_fk, t2.type, t2.nominal_power,"+
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
			"IF(measuring_value_interval_144 is null, 0, 1))) AS value, "+
			"CASE  WHEN variable_id_fk=1372 THEN "+
			"(COALESCE(measuring_value_interval_1,0)+" +
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
			")/6000  ELSE '0' END AS energy "+
			
        "from lvs_measuring_data.wind_turbine_unit_measuring_data_daily t1 "+
		'LEFT OUTER JOIN (SELECT wind_turbine_serial_id, wtu.nominal_power , concat(wtgd.description, if(ct.additional_information is null or wtu.wind_turbine_group_id_fk < 6 or wtu.wind_turbine_group_id_fk > 7, "", ct.additional_information)) as type '+
			"FROM lvs_server_database.wind_farms wf \
			LEFT JOIN lvs_server_database.wind_turbine_units wtu \
			ON wtu.wind_farm_id_fk = wf.wind_farm_id \
			LEFT JOIN lvs_server_database.value_map_wind_turbine_units_wind_turbine_coordinate_types vmct \
			ON vmct.wind_turbine_serial_id_fk = wtu.wind_turbine_serial_id \
				AND vmct.wind_turbine_coordinate_type_id_fk = 0 \
			LEFT JOIN lvs_server_database.value_map_wind_turbine_units_component_groups wtucg \
				on wtu.wind_turbine_serial_id = wtucg.wind_turbine_serial_id_fk \
			and wtucg.component_group_id_fk = 53 \
			LEFT JOIN lvs_server_database.component_types ct \
				on ct.component_type_id = wtucg.component_type_id_fk \
			JOIN lvs_server_database.wind_turbine_groups wtg \
				on wtg.wind_turbine_group_id = wtu.wind_turbine_group_id_fk \
			JOIN lvs_server_database.description_localisation_default wtgd \
				on wtgd.description_localisation_id = wtg.name_fk \
			JOIN lvs_server_database.map_wind_turbine_units_wind_turbine_access_groups mag \
				on mag.wind_turbine_serial_id_fk = wtu.wind_turbine_serial_id \
			and mag.wind_turbine_access_group_id_fk = 0 "+
			'WHERE "auch die ungepflegten ausgeben" != "ja" OR '+
					"(vmct.coordinate_height is not null) \
				AND (vmct.coordinate_longitude is not null and vmct.coordinate_longitude > 0) \
				AND (vmct.coordinate_latitude is not null and vmct.coordinate_latitude > 0) \
			order by wf.name, wind_farm_plant_number) t2 \
			ON t1.wind_turbine_serial_id_fk = t2.wind_turbine_serial_id \
		where  wind_turbine_serial_id_fk in (:turbines) \
			 and variable_id_fk in (:variable)  \
			 and measuring_date = :date \
			 and value_type_id_fk = :type \
			 ORDER BY  wind_turbine_serial_id_fk, variable_id_fk";
    
    let date =   moment().add(-1, 'days').tz("Europe/London").format("YYYY-MM-DD");
    // console.log(date);
    lvs_db.sequelize.query(query_string, {
      replacements:{
        turbines: params,
        variable: [1372,569] ,
        date: date ,
        type:2
      },
      type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " +  err, {});
    });
}

