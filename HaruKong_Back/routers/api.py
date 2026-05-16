from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.auth import get_current_user

from HaruKong_Back.models.plan import Plan
from HaruKong_Back.models.record import Record

from HaruKong_Back.schemas.plan import PlanCreate, PlanResponse
from HaruKong_Back.schemas.record import RecordCreate, RecordResponse


router = APIRouter()


# =====================
# PLANS
# =====================
@router.post("/plans", response_model=PlanResponse)
def create_plan(
    plan: PlanCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    new_plan = Plan(**plan.dict(), user_id=current_user.id)

    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)

    return {
        "success": True,
        "data": new_plan,
        "message": "plan created"
    }


@router.get("/plans")
def get_plans(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    plans = db.query(Plan).filter(Plan.user_id == current_user.id).all()

    return {
        "success": True,
        "data": plans,
        "message": "plans fetched"
    }


# =====================
# RECORDS
# =====================
@router.post("/records", response_model=RecordResponse)
def create_record(
    record: RecordCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    new_record = Record(**record.dict(), user_id=current_user.id)

    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return {
        "success": True,
        "data": new_record,
        "message": "record created"
    }


@router.get("/records")
def get_records(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    records = db.query(Record).filter(Record.user_id == current_user.id).all()

    return {
        "success": True,
        "data": records,
        "message": "records fetched"
    }


# =====================
# RECOMMEND
# =====================
@router.get("/recommend")
def recommend(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    plans = db.query(Plan).filter(Plan.user_id == current_user.id).all()
    records = db.query(Record).filter(Record.user_id == current_user.id).all()

    result = []

    for p in plans:
        score = 0

        for r in records:
            if r.plan_id == p.id:
                score += (r.rating or 0) * 1.5

        result.append({
            "plan_id": p.id,
            "title": p.title,
            "score": score
        })

    result.sort(key=lambda x: x["score"], reverse=True)

    return {
        "success": True,
        "data": result,
        "message": "recommendation done"
    }


# =====================
# MOCK (프론트 개발용 유지)
# =====================
@router.get("/mock/plans")
def mock_plans():
    return {"success": True, "data": [{"id": 1, "title": "카페"}]}


@router.get("/mock/records")
def mock_records():
    return {"success": True, "data": [{"id": 1, "content": "좋음"}]}


@router.get("/mock/recommend")
def mock_recommend():
    return {"success": True, "data": [{"plan_id": 1, "score": 10}]}