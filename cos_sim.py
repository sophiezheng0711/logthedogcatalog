from emb_map_script import get_syn, df, get_sim
import numpy as np
import math

class CosSim():

    """Assumes that query is tokenized and processed before calling any of these methods"""
    def __init__(self, msgs):
        self.msgs = msgs

    def build_inverted_index(self, msgs):
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

    def boolean_search(self, query_word, not_word, inverted_index):
        query_word = query_word.lower()
        not_word = not_word.lower()
        qwl = []
        nwl = []
        M = []
        if query_word not in inverted_index:
            return []
        for t in inverted_index[query_word]:
            qwl.append(t[0])
        if not_word not in inverted_index:
            return qwl
        for t in inverted_index[not_word]:
            nwl.append(t[0])
        qptr = 0
        nptr = 0
        while qptr < len(qwl) and nptr < len(nwl):
            if qwl[qptr] == nwl[nptr]:
                qptr += 1
                nptr += 1
                continue
            if qwl[qptr] < nwl[nptr]:
                M.append(qwl[qptr])
                qptr += 1
            else:
                nptr += 1
        while qptr < len(qwl):
            M.append(qwl[qptr])
            qptr += 1
        return M

    def compute_idf(self, inv_idx, n_docs, min_df=10, max_df_ratio=0.95):
        ans = {}
        for term in inv_idx:
            if len(inv_idx[term]) < min_df:
                continue
            if (len(inv_idx[term]) / n_docs) > max_df_ratio:
                continue
            ans[term] = math.log2(n_docs/(1+len(inv_idx[term])))
        return ans

    def compute_doc_norms(self, index, idf, n_docs):
        norms = np.zeros(n_docs)
        for word in index:
            if word not in idf:
                continue
            for i in index[word]:
                doc, count = i
                norms[doc] += (count*idf[word])**2
        norms = np.sqrt(norms)
        return norms

    def index_search(self, query, index, idf, doc_norms):
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



if __name__ == "__main__":
    msgs = []
    for i, x in enumerate(df["Traits"]):
        for word in x.split(","):
            word = word.strip()
            if " " in word:
                word = word[word.index(' ') + 1:]
            syns = list(get_syn(word))

            if i < len(msgs):
                msgs[i]['toks'] += syns
            else:
                msgs[i] = {}
                msgs[i]['toks'] = []
                msgs[i]['toks'] = syns

    cs = CosSim(msgs)