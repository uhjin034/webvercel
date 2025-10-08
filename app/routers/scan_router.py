import os

from fastapi import APIRouter, UploadFile, File 
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

router = APIRouter(
    prefix = "/scan"
)

templates = Jinja2Templates(directory="templates")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPLOAD_DIR = os.path.join(BASE_DIR, "static", "file")

@router.post("/ms")
async def scan_ms(requset: Request, file: UploadFile = File(...)):

    save_path = os.path.join(UPLOAD_DIR, file.filename)
    content = await file.read()
    
    with open(save_path, "wb") as f:
        f.write(content)
