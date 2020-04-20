import re
import pandas as pd
import numpy as np
df = pd.read_excel("data.xlsx")

heights = []
for i, x in enumerate(df["Height"]):
    temp = re.findall(r'\d*\.?\d+', x)
    res = list(map(float, temp))
    heights += [np.average(res)]

df['avgHeight'] = heights

weights = []
for i, x in enumerate(df["Weight"]):
    temp = re.findall(r'\d*\.?\d+', x)
    res = list(map(float, temp))
    weights += [np.average(res)]

df['avgWeight'] = weights

df.to_excel('data.xlsx')
