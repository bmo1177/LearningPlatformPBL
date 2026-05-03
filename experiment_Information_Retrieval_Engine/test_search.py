import unittest
import requests
import time
import subprocess
import sys
import os

BASE_URL = 'http://localhost:5000'


class TestSearchEngine(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server_process = subprocess.Popen(
            [sys.executable, 'app.py'],
            cwd=os.path.dirname(os.path.abspath(__file__)) or '.',
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        time.sleep(3)

    @classmethod
    def tearDownClass(cls):
        cls.server_process.terminate()
        cls.server_process.wait()

    def test_health_check(self):
        response = requests.get(f'{BASE_URL}/api/statistics')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('total_documents', data)
        self.assertIn('unique_terms', data)
        print(f"Health check passed: {data}")

    def test_bm25_ranking(self):
        payload = {'query': 'obesity', 'model': 'bm25', 'top_k': 5}
        response = requests.post(f'{BASE_URL}/api/search', json=payload)
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(data['results']), 0)
        self.assertGreater(data['results'][0]['score'], 0)
        print(f"BM25 search results: {len(data['results'])} results found")

    def test_tfidf_ranking(self):
        payload = {'query': 'obesity', 'model': 'tfidf', 'top_k': 5}
        response = requests.post(f'{BASE_URL}/api/search', json=payload)
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(data['results']), 0)
        print(f"TF-IDF search results: {len(data['results'])} results found")

    def test_boolean_ranking(self):
        payload = {'query': 'obesity', 'model': 'boolean', 'top_k': 5}
        response = requests.post(f'{BASE_URL}/api/search', json=payload)
        data = response.json()

        self.assertEqual(response.status_code, 200)
        print(f"Boolean search results: {len(data['results'])} results found")

    def test_suggestions(self):
        response = requests.get(f'{BASE_URL}/api/suggestions')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        print(f"Suggestions: {data[:5]}")


if __name__ == '__main__':
    unittest.main()