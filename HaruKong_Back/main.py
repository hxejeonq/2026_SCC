from fastapi import FastAPI

from routers import users, plans, records, recommend

app = FastAPI()

app.include_router(users.router, prefix="/users")
app.include_router(plans.router, prefix="/plans")
app.include_router(records.router, prefix="/records")
app.include_router(recommend.router, prefix="/recommend")

@app.get("/")
def root():
    return {"msg": "하루콩 API 시작 🍚"}