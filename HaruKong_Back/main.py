from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from HaruKong_Back.database import engine
from HaruKong_Back.routers import auth, mock, api


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        conn = engine.connect()
        print("DB 연결 성공 😼")
        conn.close()
    except Exception as e:
        print("DB 연결 실패 💥")
        print(e)

    yield
    print("서버 종료 👋")


app = FastAPI(lifespan=lifespan)


# 🌐 CORS (프론트 연결 핵심)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🧷 라우터 (정리 완료 버전)
app.include_router(auth.router, prefix="/auth")
app.include_router(api.router)          # 👈 핵심 API 통합
app.include_router(mock.router, prefix="/mock")  # 개발용


# 🏠 root
@app.get("/")
def root():
    return {"msg": "하루콩 API 시작 🍚"}