from dataclasses import dataclass
import numpy as np


@dataclass
class ImageEmbedding:
    id: str
    embedding: np.ndarray
