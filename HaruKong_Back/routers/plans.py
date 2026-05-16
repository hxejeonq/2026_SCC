from fastapi import APIRouter

router = APIRouter()

@router.get("")
def get_plans(date: str):
    return {"date": date, "plans": []}

@router.post("")
def create_plan(data: dict):
    return {"msg": "plan created", "data": data}