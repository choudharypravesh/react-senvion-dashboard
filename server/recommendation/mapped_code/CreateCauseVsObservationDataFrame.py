from neo4j.v1 import GraphDatabase, basic_auth
import pandas as pd

driver = GraphDatabase.driver("bolt://172.20.104.86:7687", auth=basic_auth("neo4j", "root"))
session = driver.session()

causes = []
observations = []
dataframe_list = []
column_list = []

result = session.run("MATCH (n:cause) RETURN ID(n)")
for key in result.keys():
    for record in result:
        causes.append(record[key])

print causes

result = session.run("MATCH (n:observation) RETURN ID(n)")
for key in result.keys():
    for record in result:
        observations.append(record[key])

print observations

for cause in causes:
    dataframe_row = []
    #dataframe_row.append(cause)
    for observation in observations:
        result = session.run("MATCH (c:cause)-[rel]-(o:observation) WHERE ID(c)={cause} and ID(o)={observation} RETURN count(rel) ",{
            "cause": cause,
            "observation": observation
                })
        for key in result.keys():
            for record in result:
                #print (cause, observation, record[key])
                #print record[key]
                dataframe_row.append(record[key])
    dataframe_list.append(dataframe_row)

#column_list = ['cause_id']
column_list.extend(observations)
df = pd.DataFrame(dataframe_list,index = causes)
df.columns = column_list
#df.set_index(['cause_id'])
#print df
df.to_csv('./server/MetaData/cause_vs_observation_mapping.csv',header = True)

session.close()
