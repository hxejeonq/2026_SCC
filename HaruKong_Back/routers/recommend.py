from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.plan import Plan
from HaruKong_Back.models.record import Record

router = APIRouter()


# 🔥 추천 API
@router.get("/{user_id}")
def recommend_places(user_id: int, db: Session = Depends(get_db)):

    # 1️⃣ 유저 기록 가져오기
    records = db.query(Record).filter(Record.user_id == user_id).all()

    # 2️⃣ 좋은 기록만 필터 (rating >= 4)
    good_records = [r for r in records if r.rating >= 4]

    # 3️⃣ 해당 plan들 가져오기
    plan_ids = [r.plan_id for r in good_records]

    plans = db.query(Plan).filter(Plan.id.in_(plan_ids)).all()

    # 4️⃣ 추천 결과 만들기
    result = []

    for p in plans:
        result.append({
            "location": p.location,
            "title": p.title,
            "reason": "좋았던 경험 기반 추천 😼"
        })

    return {
        "user_id": user_id,
        "recommendations": result
    }