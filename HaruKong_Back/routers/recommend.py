from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.plan import Plan
from HaruKong_Back.models.record import Record
from HaruKong_Back.auth import get_current_user

router = APIRouter()


# 🎯 추천 API
@router.get("/")
def recommend(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    user_id = current_user["id"]

    plans = db.query(Plan).filter(Plan.user_id == user_id).all()
    records = db.query(Record).filter(Record.user_id == user_id).all()

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

    recommended.sort(key=lambda x: x["score"], reverse=True)

    return {
        "success": True,
        "user_id": user_id,
        "data": recommended
    }