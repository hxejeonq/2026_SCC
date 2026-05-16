from fastapi import FastAPI
from contextlib import asynccontextmanager

from HaruKong_Back.routers import users, plans, records, recommend
from HaruKong_Back.database import engine


# 🧠 서버 시작/종료 관리 (최신 방식)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 🚀 startup
    try:
        conn = engine.connect()
        print("DB 연결 성공 😼")
        conn.close()
    except Exception as e:
        print("DB 연결 실패 💥")
        print(e)

    yield  # 👉 여기서 API 실행됨

    # 🧹 shutdown
    print("서버 종료 👋")


# 🚀 앱 생성
app = FastAPI(lifespan=lifespan)


# 🧷 라우터 등록
app.include_router(users.router, prefix="/users")
app.include_router(plans.router, prefix="/plans")
app.include_router(records.router, prefix="/records")
app.include_router(recommend.router, prefix="/recommend")


# 🏠 기본 라우트
@app.get("/")
def root():
    return {"msg": "하루콩 API 시작 🍚"}
