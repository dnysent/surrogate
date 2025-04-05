from fastapi import APIRouter, UploadFile, File
from .embeddings import EmbeddingManager
from typing import List
from fastapi.responses import JSONResponse

router = APIRouter()
embedding_manager = EmbeddingManager()


@router.post("/upload_images")
async def upload_images(files: List[UploadFile] = File(...)):
    embeddings = await embedding_manager.store_embeddings(files)
    return JSONResponse({"embeddings": embeddings})


@router.post("/query_image")
async def query_image(file: UploadFile, top_k: int = 3):
    closest_images = await embedding_manager.query_similar_images(file, top_k=top_k)
    return JSONResponse({"closest_images": closest_images})
