from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.plan import Plan
from HaruKong_Back.schemas.plan import PlanCreate, PlanResponse
from HaruKong_Back.auth import get_current_user

router = APIRouter()


# ➕ 일정 생성 (🔥 로그인 유저 기준)
@router.post("/", response_model=PlanResponse)
def create_plan(
    plan: PlanCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    new_plan = Plan(
        user_id=user_id,   # 🔥 이제 body에서 안 받고 자동 주입
        title=plan.title,
        date=plan.date,
        location=plan.location
    )

    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan


# 📄 내 일정만 조회 (🔥 핵심 변경)
@router.get("/", response_model=list[PlanResponse])
def get_plans(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    return db.query(Plan).filter(Plan.user_id == user_id).all()