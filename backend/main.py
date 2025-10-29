print("### THIS IS THE CORRECT FILE ###")

from fastapi import FastAPI
from database import Base, engine
from auth import router as auth_router
from routers.expenses import router as expenses_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(expenses_router)

@app.get("/")
def home():
    return {"message": "Expense API is running!"}

