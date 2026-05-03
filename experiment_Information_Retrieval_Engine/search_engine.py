from collections import defaultdict
import math
import io
from file_parser import FileParser


class InvertedIndex:
    def __init__(self):
        self.index = defaultdict(lambda: defaultdict(list))
        self.doc_count = 0
        self.documents = {}
        self.doc_lengths = {}
        self.avg_doc_length = 0.0
        self.term_doc_freq = defaultdict(int)
        self.term_freq = defaultdict(lambda: defaultdict(int))

    def build_from_records(self, records):
        for row in records:
            self.doc_count += 1
            doc_id = self.doc_count
            self.documents[doc_id] = row
            doc_terms = []
            for field, value in row.items():
                tokens = str(value).lower().split()
                doc_terms.extend(tokens)
                for pos, term in enumerate(tokens):
                    self.index[term][field].append(
                        {'doc_id': doc_id, 'position': pos}
                    )
                    self.term_freq[term][doc_id] += 1
            self.doc_lengths[doc_id] = len(doc_terms)
        for term in self.index:
            self.term_doc_freq[term] = len(self.index[term])
        if self.doc_count > 0:
            self.avg_doc_length = sum(self.doc_lengths.values()) / self.doc_count

    def get_term_frequency(self, term, doc_id):
        return self.term_freq.get(term, {}).get(doc_id, 0)

    def get_postings(self, term):
        return list(self.index.get(term, {}).keys())


class BM25Model:
    def __init__(self, index, k1=1.5, b=0.75):
        self.index = index
        self.k1 = k1
        self.b = b

    def calculate_bm25(self, term, doc_id):
        tf = self.index.get_term_frequency(term, doc_id)
        if tf == 0:
            return 0.0
        df = self.index.term_doc_freq.get(term, 0)
        N = self.index.doc_count
        idf = math.log((N - df + 0.5) / (df + 0.5) + 1.0)
        doc_len = self.index.doc_lengths.get(doc_id, 0)
        avg_len = self.index.avg_doc_length or 1.0
        denom = tf + self.k1 * (1 - self.b + self.b * (doc_len / avg_len))
        return idf * (tf * (self.k1 + 1) / denom)

    def search(self, query, top_k=10):
        terms = query.lower().split()
        scores = defaultdict(float)
        for term in terms:
            if term in self.index.index:
                for doc_id in self.index.get_postings(term):
                    scores[doc_id] += self.calculate_bm25(term, doc_id)
        return sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_k]


class TFIDFModel:
    def __init__(self, index):
        self.index = index

    def calculate_tf(self, term, doc_id):
        tf = self.index.get_term_frequency(term, doc_id)
        return math.log(1 + tf) if tf > 0 else 0

    def calculate_idf(self, term):
        df = self.index.term_doc_freq.get(term, 0)
        N = self.index.doc_count
        if df == 0:
            return 0.0
        return math.log(N / df)

    def calculate_tfidf(self, term, doc_id):
        return self.calculate_tf(term, doc_id) * self.calculate_idf(term)

    def search(self, query, top_k=10):
        terms = query.lower().split()
        scores = defaultdict(float)
        for term in terms:
            if term in self.index.index:
                for doc_id in self.index.get_postings(term):
                    scores[doc_id] += self.calculate_tfidf(term, doc_id)
        return sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_k]


class BooleanModel:
    def __init__(self, index):
        self.index = index

    def search(self, query, top_k=10):
        query = query.lower().strip()
        if ' and ' in query:
            terms = query.split(' and ')
            return self._and_search(terms)
        elif ' or ' in query:
            terms = query.split(' or ')
            return self._or_search(terms)
        elif ' not ' in query:
            parts = query.split(' not ')
            main_term = parts[0].strip()
            exclude_terms = [t.strip() for t in parts[1:]]
            return self._not_search(main_term, exclude_terms)
        else:
            return self._and_search([query])

    def _and_search(self, terms):
        doc_sets = []
        for term in terms:
            term = term.strip()
            if term in self.index.index:
                doc_sets.append(set(self.index.get_postings(term)))
            else:
                return []
        if not doc_sets:
            return []
        common = doc_sets[0]
        for s in doc_sets[1:]:
            common = common.intersection(s)
        return [(doc_id, 1.0) for doc_id in common][:top_k]

    def _or_search(self, terms):
        result_set = set()
        for term in terms:
            term = term.strip()
            if term in self.index.index:
                result_set.update(self.index.get_postings(term))
        return [(doc_id, 1.0) for doc_id in result_set][:top_k]

    def _not_search(self, main_term, exclude_terms):
        if main_term not in self.index.index:
            return []
        main_docs = set(self.index.get_postings(main_term))
        exclude_docs = set()
        for term in exclude_terms:
            if term in self.index.index:
                exclude_docs.update(self.index.get_postings(term))
        result = main_docs - exclude_docs
        return [(doc_id, 1.0) for doc_id in result][:top_k]


class SearchEngine:
    def __init__(self, csv_path=None, records=None):
        self.index = InvertedIndex()
        if csv_path:
            with open(csv_path, 'rb') as f:
                self.records = FileParser.parse(f, csv_path)
        elif records:
            self.records = records
        else:
            self.records = []
        if self.records:
            self.index.build_from_records(self.records)
        self.bm25 = BM25Model(self.index)
        self.tfidf = TFIDFModel(self.index)
        self.boolean = BooleanModel(self.index)

    def search(self, query, model='bm25', top_k=10):
        if model == 'bm25':
            doc_scores = self.bm25.search(query, top_k)
        elif model == 'tfidf':
            doc_scores = self.tfidf.search(query, top_k)
        elif model == 'boolean':
            doc_scores = self.boolean.search(query, top_k)
        else:
            doc_scores = self.bm25.search(query, top_k)

        results = []
        for doc_id, score in doc_scores:
            results.append({
                'doc_id': doc_id,
                'score': score,
                'document': self.index.documents.get(doc_id, {})
            })
        return results

    def get_suggested_queries(self, count=10):
        top_terms = sorted(
            self.index.term_doc_freq.items(),
            key=lambda x: x[1],
            reverse=True
        )[:count]
        return [term for term, _ in top_terms]

    def initialize_search_engine(self):
        pass