import csv
import io
from pathlib import Path
from typing import Dict, List
import pandas as pd


class FileParser:
    SUPPORTED_EXTENSIONS = {'.csv', '.xlsx', '.xls', '.txt'}

    @classmethod
    def is_supported(cls, filename: str) -> bool:
        return Path(filename).suffix.lower() in cls.SUPPORTED_EXTENSIONS

    @classmethod
    def parse(cls, file_stream: io.BytesIO, filename: str) -> List[Dict[str, str]]:
        ext = Path(filename).suffix.lower()
        if ext == '.csv':
            return cls._parse_csv(file_stream)
        elif ext in {'.xlsx', '.xls'}:
            return cls._parse_excel(file_stream)
        raise ValueError(f'Unsupported format: {ext}')

    @staticmethod
    def _parse_csv(file_stream: io.BytesIO) -> List[Dict[str, str]]:
        content = file_stream.read().decode('utf-8')
        reader = csv.DictReader(io.StringIO(content))
        return [dict(row) for row in reader]

    @staticmethod
    def _parse_excel(file_stream: io.BytesIO) -> List[Dict[str, str]]:
        df = pd.read_excel(file_stream)
        return df.fillna('').to_dict('records')