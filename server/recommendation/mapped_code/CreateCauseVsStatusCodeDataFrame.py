from neo4j.v1 import GraphDatabase, basic_auth
import pandas as pd

driver = GraphDatabase.driver("bolt://172.20.104.86:7687", auth=basic_auth("neo4j", "root"))
session = driver.session()

causes = []
status_codes = []
dataframe_list = []
column_list = []

result = session.run("MATCH (n:cause) RETURN ID(n)")
for key in result.keys():
    for record in result:
        causes.append(record[key])

#print causes

result = session.run("MATCH (n:status_code) RETURN ID(n)")
for key in result.keys():
    for record in result:
        status_codes.append(record[key])

#print status_codes

for cause in causes:
    dataframe_row = []
    #dataframe_row.append(cause)
    for status_code in status_codes:
        result = session.run("MATCH (c:cause)-[rel]-(o:status_code) WHERE ID(c)={cause} and ID(o)={status_code} RETURN count(rel) ",{
            "cause": cause,
            "status_code": status_code
                })
        for key in result.keys():
            for record in result:
                #print (cause, status_code, record[key])
                #print record[key]
                dataframe_row.append(record[key])
    dataframe_list.append(dataframe_row)

#column_list = ['cause_id']
column_list.extend(status_codes)
df = pd.DataFrame(dataframe_list,index = causes)
df.columns = column_list
#df.set_index(['cause_id'])
#print df
df.to_csv('./server/MetaData/cause_vs_status_code_mapping.csv',header = True)
print "cause_vs_status_code_mapping completed"

session.close()
