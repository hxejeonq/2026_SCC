from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.user import User
from HaruKong_Back.schemas.user import UserCreate, UserResponse

router = APIRouter()


# ➕ 유저 생성
@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(name=user.name, email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# 📄 유저 전체 조회
@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()