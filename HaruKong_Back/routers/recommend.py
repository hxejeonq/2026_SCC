from fastapi import APIRouter

router = APIRouter()

@router.post("")
def recommend(data: dict):
    return {
        "recommendations": [
            {"title": "카페 가기", "reason": "집중 잘됨"},
            {"title": "산책", "reason": "기분 전환"}
        ]
    }