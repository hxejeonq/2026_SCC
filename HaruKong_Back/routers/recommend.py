from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.plan import Plan
from HaruKong_Back.models.record import Record
from HaruKong_Back.auth import get_current_user

router = APIRouter()


# 🎯 추천 API (로그인 기반)
@router.get("/")
def recommend(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):

    # 🔍 유저의 최근 데이터 기반
    plans = db.query(Plan).filter(Plan.user_id == user_id).all()
    records = db.query(Record).filter(Record.user_id == user_id).all()

    # 💡 매우 단순한 추천 로직 (예시)
    recommended = []

    for plan in plans:
        score = 0

        for record in records:
            if record.plan_id == plan.id:
                score += record.rating or 0

        recommended.append({
            "plan_id": plan.id,
            "title": plan.title,
            "location": plan.location,
            "score": score
        })

    # 🔥 점수 높은 순 정렬
    recommended.sort(key=lambda x: x["score"], reverse=True)

    return {
        "user_id": user_id,
        "recommendations": recommended
    }