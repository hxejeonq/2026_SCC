from fastapi import APIRouter

router = APIRouter()

@router.post("")
def create_user(data: dict):
    return {"msg": "user created"}

@router.get("/{user_id}")
def get_user(user_id: int):
    return {"id": user_id}