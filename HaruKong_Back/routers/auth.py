from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.user import User
from HaruKong_Back.auth import hash_password, verify_password, create_access_token

router = APIRouter()


# 🟢 회원가입
@router.post("/signup")
def signup(name: str, email: str, password: str, db: Session = Depends(get_db)):

    user = User(
        name=name,
        email=email,
        password=hash_password(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"msg": "회원가입 완료 😼"}


# 🔵 로그인
@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="로그인 실패")

    token = create_access_token({"user_id": user.id})

    return {"access_token": token, "token_type": "bearer"}