import sys
from neo4j.v1 import GraphDatabase, basic_auth
import pandas as pd
from scipy.spatial.distance import cosine
import warnings

warnings.filterwarnings("ignore")

driver = GraphDatabase.driver("bolt://172.20.104.86:7687", auth=basic_auth("neo4j", "root"))
session = driver.session()
df = pd.read_csv('./server/MetaData/cause_vs_status_code_mapping.csv',index_col=0)


#status_code_taken_keys = [2055 , 2049]
arg_parse = sys.argv[1:][0].split(',')
status_code_taken_values =map(int , arg_parse)

status_code_taken_keys = []
status_code_vector = []
causes = []
status_codes = []
dataframe_list = []
column_list = []


for status_code_value in status_code_taken_values:
    result = session.run("MATCH (n:status_code) WHERE n.name={value} RETURN ID(n)", {
        "value": str(status_code_value)
        })
    for key in result.keys():
        for record in result:
            status_code_taken_keys.append(record[key])
#print status_code_taken_keys

causes = df.index.tolist()
status_codes = map(int, df.columns.tolist())

for i in status_codes:
    if i in status_code_taken_keys:
        status_code_vector.append(1)
    else:
        status_code_vector.append(0)

#print (status_code_vector)
#print df

df['cosine_similarity'] = df.apply(lambda x: (1 - cosine(x, status_code_vector))*100 , axis=1)
df['status_codes'] = df.apply(lambda x: status_code_taken_values , axis=1)

df = df.fillna(0)

session.close()
print (df[df['cosine_similarity'] != 0][['cosine_similarity','status_codes']].sort(columns=['cosine_similarity'], ascending=False, inplace=False, kind='quicksort', na_position='last')).reset_index().to_json(orient='records')