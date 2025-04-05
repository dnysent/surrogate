from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from embeddings import EmbeddingManager
from routes import router as api_router

app = FastAPI()

# API Routes
app.include_router(api_router)

# Frontend Static Files
static_dir = Path(__file__).parent.parent / "static"
app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
