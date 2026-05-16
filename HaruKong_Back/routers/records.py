from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.record import Record
from HaruKong_Back.schemas.record import RecordCreate, RecordResponse

router = APIRouter()


# ➕ 기록 생성
@router.post("/", response_model=RecordResponse)
def create_record(record: RecordCreate, db: Session = Depends(get_db)):
    new_record = Record(
        user_id=record.user_id,
        plan_id=record.plan_id,
        content=record.content,
        rating=record.rating
    )
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record


# 📄 전체 조회
@router.get("/", response_model=list[RecordResponse])
def get_records(db: Session = Depends(get_db)):
    return db.query(Record).all()