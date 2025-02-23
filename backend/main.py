from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends
from fastapi.responses import JSONResponse
import PyPDF2
from PIL import Image
import pytesseract
import os
import uuid
from groq import Groq  # Assuming Groq has a Python client
from itertools import cycle
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import models, schemas
from database import get_async_db
from fastapi.middleware.cors import CORSMiddleware
# models.Base.metadata.create_all(bind=engine)
from typing import Optional
from PIL import Image
from io import BytesIO
import pdfplumber

app = FastAPI()
# Dependency to get DB session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
        
        
        
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   
        
     
        
@app.get("/")
async def root():
    return {"message": "Welcome to the API"}
        
# Initialize Groq client
GROQ_API_KEYS = os.environ.get("GROQ_API_KEYS_str", "").split(",")
GROQ_API_KEY_CYCLE = cycle(GROQ_API_KEYS)
GROQ_MODEL_NAME = os.environ.get("GROQ_MODEL_NAME", "llama2-70b-4096")  # Use the correct model name


    
chat_contexts = {}
MAX_FILE_TEXT_LENGTH = 500  # Limit extracted text length


def extract_text_from_pdf(file):
    """Extracts text from a PDF file."""
    try:
        reader = PyPDF2.PdfReader(file)
        text = "\n".join([page.extract_text() or "" for page in reader.pages])
        return text[:MAX_FILE_TEXT_LENGTH]  # Limit text length
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""


def extract_text_from_image(file):
    """Extracts text from an image file using OCR."""
    try:
        image = Image.open(file)
        text = pytesseract.image_to_string(image)
        return text[:MAX_FILE_TEXT_LENGTH]  # Limit text length
    except Exception as e:
        print(f"Error extracting text from image: {e}")
        return ""


async def extract_text_from_file(file: UploadFile):
    """Detects file type and extracts text accordingly."""
    try:
        if file.filename.endswith(".pdf"):
            return extract_text_from_pdf(file.file)
        elif file.filename.endswith((".png", ".jpg", ".jpeg")):
            return extract_text_from_image(BytesIO(await file.read()))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")
    except Exception as e:
        print(f"Error processing file: {e}")
        return ""


@app.post("/chat")
async def chat(
    file: UploadFile = File(None),
    question: str = Form(...),
    chat_id: str = Form(None),
):
    try:
        file_text = ""

        if file:
            file_text = await extract_text_from_file(file)

        # print("Extracted File Text:", file_text)

        if chat_id and chat_id in chat_contexts:
            context = chat_contexts[chat_id]
        else:
            chat_id = str(uuid.uuid4())
            context = (
                "You are a friendly and knowledgeable assistant helping children aged 6-15 "
                "learn about climate change. Your goal is to explain complex climate change "
                "topics in a simple, fun, and engaging way. Always use easy-to-understand "
                "language and examples that kids can relate to."
            )
            chat_contexts[chat_id] = context

        full_context = f"{context}\n{file_text}" if file_text else context

        groq_api_key = next(GROQ_API_KEY_CYCLE)
        groq_client = Groq(api_key=groq_api_key)

        messages = [
            {"role": "system", "content": full_context},
            {"role": "user", "content": question},
        ]

        response = groq_client.chat.completions.create(
            model=GROQ_MODEL_NAME,
            messages=messages,
            max_tokens=150,
            temperature=0.7,
        )

        print("AI Response:", response)

        response_text = response.choices[0].message.content

        chat_contexts[chat_id] = f"{full_context}\nQ: {question}\nA: {response_text}"

        return JSONResponse(content={
            "chat_id": chat_id,
            "response": response_text,
        })

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
    

@app.post("/users/", response_model=schemas.UserResponse)
async def create_user(user: schemas.UserCreate, db: AsyncSession = Depends(get_async_db)):
    async with db as session:
        result = await session.execute(select(models.User).filter(models.User.email == user.email))
        db_user = result.scalars().first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        new_user = models.User(**user.dict())
        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)
        return new_user

@app.get("/users/{user_id}", response_model=schemas.UserResponse)
async def get_user(user_id: int, db: AsyncSession = Depends(get_async_db)):
    async with db as session:
        result = await session.execute(select(models.User).filter(models.User.id == user_id))
        user = result.scalars().first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

@app.post("/game-progress/{user_id}", response_model=schemas.GameProgressResponse)
async def create_game_progress(user_id: int, progress: schemas.GameProgressCreate, db: AsyncSession = Depends(get_async_db)):
    async with db as session:
        result = await session.execute(select(models.User).filter(models.User.id == user_id))
        user = result.scalars().first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        new_progress = models.GameProgress(user_id=user_id, **progress.dict())
        session.add(new_progress)
        await session.commit()
        await session.refresh(new_progress)
        return new_progress
1

@app.get("/game-progress/{user_id}", response_model=schemas.GameProgressResponse)
async def get_game_progress(user_id: int, db: AsyncSession = Depends(get_async_db)):
    async with db as session:
        result = await session.execute(select(models.GameProgress).filter(models.GameProgress.user_id == user_id))
        progress = result.scalars().first()
        if not progress:
            raise HTTPException(status_code=404, detail="Game progress not found")
        return progress



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    