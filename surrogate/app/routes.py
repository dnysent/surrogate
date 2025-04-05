from fastapi import APIRouter, UploadFile, File
from .embeddings import EmbeddingManager
from typing import List
from fastapi.responses import JSONResponse
from fastapi import UploadFile, File, Form

router = APIRouter()
embedding_manager = EmbeddingManager()


@router.post("/upload_images")
async def upload_images(files: List[UploadFile] = File(...)):
    embeddings = await embedding_manager.store_embeddings(files)
    return JSONResponse({"embeddings": embeddings})


@router.post("/query_image")
async def query_image(
    file: UploadFile = File(...),
    top_k: int = Form(...),
    selected_model: str = Form(...),
    similarity_threshold: float = Form(...),
):
    closest_images = await embedding_manager.query_similar_images_with_scores(
        file,
        top_k=top_k,
        model=selected_model,
        similarity_threshold=similarity_threshold,
    )
    return JSONResponse({"closest_images": closest_images})
