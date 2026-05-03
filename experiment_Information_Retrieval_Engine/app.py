from flask import Flask, jsonify, render_template, request
from search_engine import SearchEngine
import time
import os

app = Flask(__name__)

csv_path = 'ObesityDataSet_raw_and_data_sinthetic.csv'
search_engine = None

if os.path.exists(csv_path):
    search_engine = SearchEngine(csv_path=csv_path)
else:
    search_engine = SearchEngine(records=[])


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/search', methods=['POST'])
def api_search():
    data = request.get_json() or {}
    query = data.get('query', '')
    model = data.get('model', 'bm25')
    top_k = min(data.get('top_k', 10), 500)

    start = time.time()
    results = search_engine.search(query, model=model, top_k=top_k)
    elapsed = (time.time() - start) * 1000

    return jsonify({
        'query': query,
        'model': model,
        'results': results,
        'total_results': len(results),
        'search_time_ms': round(elapsed, 2)
    })


@app.route('/api/statistics', methods=['GET'])
def api_statistics():
    return jsonify({
        'total_documents': search_engine.index.doc_count,
        'unique_terms': len(search_engine.index.index),
        'average_document_length': round(search_engine.index.avg_doc_length, 2)
    })


@app.route('/api/suggestions', methods=['GET'])
def api_suggestions():
    suggestions = search_engine.get_suggested_queries(count=10)
    return jsonify(suggestions)


if __name__ == '__main__':
    if os.path.exists(csv_path):
        print(f"Loaded {search_engine.index.doc_count} documents from {csv_path}")
    app.run(host='0.0.0.0', port=5000, debug=True)