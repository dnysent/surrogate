from fastapi import APIRouter, UploadFile, File
from .embeddings import EmbeddingManager
from typing import List
from fastapi.responses import JSONResponse
from fastapi import UploadFile, File, Form
from pydantic import BaseModel

router = APIRouter()
embedding_manager = EmbeddingManager()


class ModelSelectRequest(BaseModel):
    model_name: str


@router.post("/upload_images")
async def upload_images(files: List[UploadFile] = File(...)):
    embeddings = await embedding_manager.store_embeddings(files)
    return JSONResponse({"embeddings": embeddings})


@router.post("/query_image")
async def query_image(
    file: UploadFile = File(...),
    top_k: int = Form(...),
):
    closest_images = await embedding_manager.query_similar_images_with_scores(
        file,
        top_k=top_k,
    )
    return JSONResponse({"closest_images": closest_images})
