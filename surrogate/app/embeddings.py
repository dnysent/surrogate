import numpy as np
import open_clip
import torch
from scipy.spatial.distance import cdist
from .models import ImageEmbedding
from typing import List
from fastapi import UploadFile


class EmbeddingManager:
    def __init__(self):
        self.model, _, self.preprocess = open_clip.create_model_and_transforms(
            "ViT-B-32", pretrained="laion400m_e32"
        )
        self.embeddings: List[ImageEmbedding] = []

    async def store_embeddings(self, files: List[UploadFile]) -> List[str]:
        embeddings = []
        for file in files:
            img_tensor = self.preprocess_image(await file.read())
            embedding = self.get_embedding(img_tensor)
            image_id = file.filename
            self.embeddings.append(ImageEmbedding(id=image_id, embedding=embedding))
            embeddings.append(image_id)
        return embeddings

    async def query_similar_images_with_scores(
        self, file: UploadFile, top_k: int
    ) -> List[dict]:
        query_tensor = self.preprocess_image(await file.read())
        query_embedding = self.get_embedding(query_tensor)

        embedding_vectors = np.array([e.embedding for e in self.embeddings])

        # Cosine-Distanzen berechnen
        distances = cdist([query_embedding], embedding_vectors, metric="cosine")[0]

        # Sortieren und Top-K wählen
        sorted_indices = np.argsort(distances)[:top_k]

        results = []
        for idx in sorted_indices:
            similarity = 1 - distances[idx]
            image_id = self.embeddings[idx].id
            results.append({"id": image_id, "similarity": float(similarity)})

        return results

    def preprocess_image(self, file_bytes: bytes) -> torch.Tensor:
        from PIL import Image
        import io

        image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
        return self.preprocess(image).unsqueeze(0)

    def get_embedding(self, image_tensor: torch.Tensor) -> np.ndarray:
        with torch.no_grad():
            embedding = self.model.encode_image(image_tensor)
            embedding /= embedding.norm(dim=-1, keepdim=True)
        return embedding.cpu().numpy().flatten()
