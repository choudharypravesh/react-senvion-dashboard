import sys
from neo4j.v1 import GraphDatabase, basic_auth
import numpy as np
import pandas as pd
from scipy.spatial.distance import cosine
import warnings

warnings.filterwarnings("ignore")

driver = GraphDatabase.driver("bolt://172.20.104.86:7687", auth=basic_auth("neo4j", "root"))
session = driver.session()
df = pd.read_csv('./server/MetaData/cause_vs_observation_mapping.csv',index_col=0)


#observation_taken_keys = [2055 , 2056 , 2057]
arg_parse = [x for x in (sys.argv[1:][0].split(',')) if x != '']
observation_taken_keys =map(int , arg_parse)

observation_taken_values = []
observation_vector = []
causes = []
observations = []
dataframe_list = []
column_list = []

#print observation_taken_keys

for observation_key in observation_taken_keys:
    result = session.run("MATCH (n:observation) where ID(n)={key} RETURN n.name", {
        "key": observation_key
        })
    for key in result.keys():
        for record in result:
            observation_taken_values.append(record[key])

#print observation_taken_values

auses = df.index.tolist()
observations = map(int, df.columns.tolist())

for i in observations:
    if i in observation_taken_keys:
        observation_vector.append(1)
    else:
        observation_vector.append(0)

#print (observation_vector)
#print df

df['cosine_similarity'] = df.apply(lambda x: (1 - cosine(x, observation_vector))*100 , axis=1)
df['observations'] = df.apply(lambda x: observation_taken_values , axis=1)

df = df.fillna(0)
df['cosine_similarity'] = np.round(df['cosine_similarity'],0)
#df = df.round(2)
df['cosine_similarity'] = np.round(df['cosine_similarity'],0)
session.close()
print (df[df['cosine_similarity'] != 0][['observations','cosine_similarity']].sort(columns=['cosine_similarity'], ascending=False, inplace=False, kind='quicksort', na_position='last')).reset_index().to_json(orient='records')
