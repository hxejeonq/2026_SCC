from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.plan import Plan
from HaruKong_Back.schemas.plan import PlanCreate, PlanResponse
from HaruKong_Back.auth import get_current_user

router = APIRouter()


# ➕ 일정 생성
@router.post("/plans", response_model=PlanResponse)
def create_plan(
    plan: PlanCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    user_id = current_user["id"]

    new_plan = Plan(**plan.dict(), user_id=user_id)

    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)

    return new_plan


# 📄 내 일정 조회
@router.get("/plans")
def get_plans(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    user_id = current_user["id"]

    return db.query(Plan).filter(Plan.user_id == user_id).all()