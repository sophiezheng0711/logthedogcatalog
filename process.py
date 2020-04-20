import re
import pandas as pd

df = pd.read_excel("data.xlsx")

def parse(col):
    """
    Parses the dataframe and gets a list of minimum and maximums
    for the column. Only looks for floats with digits
    """
    minLst = []
    maxLst = []
    for index, row in df.iterrows():
        string = row[col]
        lst = re.findall(r'[0-9]+\.[0-9]+|[0-9]+', string)
        lst = list(map(float, lst))
        minLst.append(min(lst))
        maxLst.append(max(lst))
    return (minLst, maxLst)

height = parse('Height')
df['minHeight'] = height[0]
df['maxHeight'] = height[1]

weight = parse('Weight')
df['minWeight'] = weight[0]
df['maxWeight'] = weight[1]

df.to_excel('data.xlsx')


    