from fastapi import APIRouter

router = APIRouter(prefix="/mock")


@router.get("/plans")
def mock_plans():
    return [
        {
            "id": 1,
            "title": "카페 공부",
            "date": "2026-05-16",
            "location": "홍대"
        },
        {
            "id": 2,
            "title": "스터디",
            "date": "2026-05-17",
            "location": "강남"
        }
    ]


@router.get("/records")
def mock_records():
    return [
        {
            "id": 1,
            "plan_id": 1,
            "content": "집중 잘됨",
            "rating": 4
        }
    ]


@router.get("/recommend")
def mock_recommend():
    return [
        {
            "plan_id": 1,
            "title": "카페 공부",
            "score": 8
        },
        {
            "plan_id": 2,
            "title": "스터디",
            "score": 6
        }
    ]