from fastapi import FastAPI
from database import db
from core.config import config
import uvicorn
from app.auth.router import userRouter



app = FastAPI()
app.include_router(userRouter)

@app.get("/")
async def root():
    return {"message": "hello world"}


if __name__ == "__main__":
    uvicorn.run(
        app="main:app",
        port=config.APP_PORT,
        reload=True if config.ENV == "development" else False
    )

