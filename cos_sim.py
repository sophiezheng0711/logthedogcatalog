import numpy as np
import math
import re
import pandas as pd
from scipy import stats

df = pd.read_excel("data.xlsx")

"""Assumes that query is tokenized and processed before calling any of these methods"""
def build_inverted_index(msgs):
    ans = {}
    for i in range(len(msgs)):
        doc = msgs[i]
        for word in doc['toks']:
            if word not in ans:
                ans[word] = {}
            if i not in ans[word]:
                ans[word][i] = 0
            ans[word][i] += 1
    ans2 = {}
    for i in ans:
        ans2[i] = []
        for t in ans[i]:
            ans2[i].append((t, ans[i][t]))
    return ans2

def compute_idf(inv_idx, n_docs, min_df=10, max_df_ratio=0.95):
    ans = {}
    for term in inv_idx:
        if len(inv_idx[term]) < min_df:
            continue
        if (len(inv_idx[term]) / n_docs) > max_df_ratio:
            continue
        ans[term] = math.log2(n_docs/(1+len(inv_idx[term])))
    return ans

def compute_doc_norms(index, idf, n_docs):
    norms = np.zeros(n_docs)
    for word in index:
        if word not in idf:
            continue
        for i in index[word]:
            doc, count = i
            norms[doc] += (count*idf[word])**2
    norms = np.sqrt(norms)
    return norms

def index_search(query, index, idf, doc_norms):
    dots = {}
    qcount = {}
    for w in query:
        if w not in qcount:
            qcount[w] = 0
        qcount[w] += 1
    normq = 0
    for word in query:
        if word not in idf:
            continue
        normq += (qcount[word]*idf[word])**2
    normq = math.sqrt(normq)
        
    for w in query:
        if w not in idf:
            continue
        for doc, count in index[w]:
            doc_tfidf = count * idf[w]
            q = qcount[w] * idf[w]
            if doc not in dots:
                dots[doc] = 0
            dots[doc] += q * doc_tfidf
    for doc in dots:
        dots[doc] /= (normq * doc_norms[doc])
    ans = []
    for doc in dots:
        ans.append((dots[doc], doc))
    ans.sort(key=lambda x: x[0], reverse=True)
    return ans

def get_description_sim(query):
    msgs = []
    for i, x in enumerate(df["about"]):
        msgs.append({'toks' : list(filter(None, re.sub(r'[^[a-z]]*', ' ', (x + df["Excercise"][i]+df["Training"][i]+df["Apperance"][i]+df["Health"][i]).lower()).split(" ")))})

    inv_idx = build_inverted_index(msgs)
    idf = compute_idf(inv_idx, len(msgs), min_df=10, max_df_ratio=0.1)
    inv_idx = {key: val for key, val in inv_idx.items() if key in idf}
    doc_norms = compute_doc_norms(inv_idx, idf, len(msgs))
    # idx_to_name = df['Name']

    qs = query
    qsp = qs.lower()
    qsp = re.sub(r'[^[a-z]]*', ' ', qsp)
    qspl = list(filter(None, qsp.split(" ")))
    results = index_search(qspl, inv_idx, idf, doc_norms)
    idx_map = {}
    lstscores = [score for score,_ in results]
    for score, idx in results:
        idx_map[idx] = stats.percentileofscore(lstscores, score, 'rank') / 100
    return idx_map, results

if __name__ == "__main__":
    idx_to_name = df['Name']

    dogid = 205
    qs = df['about'][dogid] + df['Excercise'][dogid] + df['Training'][dogid] + df['Apperance'][dogid] + df['Health'][dogid]

    idx_map, results = get_description_sim(qs)
    print(idx_map)
    print("#" * len(qs))
    print(qs)
    print("#" * len(qs))
    for score, idx in results[:10]:
        print("["+ str(idx_map[idx] if idx in idx_map else 0) +"] " + idx_to_name[idx] + ": " + df['about'][idx])