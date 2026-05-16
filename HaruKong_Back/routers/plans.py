from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.plan import Plan
from HaruKong_Back.schemas.plan import PlanCreate, PlanResponse

router = APIRouter()


# ➕ 일정 생성
@router.post("/", response_model=PlanResponse)
def create_plan(plan: PlanCreate, db: Session = Depends(get_db)):
    new_plan = Plan(
        user_id=plan.user_id,
        title=plan.title,
        date=plan.date,
        location=plan.location
    )
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan


# 📄 전체 조회
@router.get("/", response_model=list[PlanResponse])
def get_plans(db: Session = Depends(get_db)):
    return db.query(Plan).all()