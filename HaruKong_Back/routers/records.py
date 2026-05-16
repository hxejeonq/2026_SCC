from fastapi import APIRouter

router = APIRouter()

@router.get("")
def get_records(date: str):
    return {"date": date, "records": []}