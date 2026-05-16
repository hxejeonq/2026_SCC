from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.record import Record
from HaruKong_Back.schemas.record import RecordCreate, RecordResponse
from HaruKong_Back.auth import get_current_user

router = APIRouter()


# ➕ 기록 생성 (로그인 유저 자동 적용)
@router.post("/", response_model=RecordResponse)
def create_record(
    record: RecordCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    new_record = Record(
        user_id=user_id,
        plan_id=record.plan_id,
        content=record.content,
        rating=record.rating
    )

    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record


# 📄 내 기록만 조회
@router.get("/", response_model=list[RecordResponse])
def get_records(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    return db.query(Record).filter(Record.user_id == user_id).all()