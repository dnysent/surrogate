from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from .routes import router as api_router

app = FastAPI()

# API einbinden
app.include_router(api_router, prefix="/api")

# Frontend (statische Dateien) einbinden
static_dir = Path(__file__).parent.parent / "static"
print(static_dir)

app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
