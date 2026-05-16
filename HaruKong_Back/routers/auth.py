from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from HaruKong_Back.deps import get_db
from HaruKong_Back.models.user import User
from HaruKong_Back.auth import (
    get_current_user,
    hash_password,
    verify_password,
    create_access_token,
)

from HaruKong_Back.schemas.auth import UserCreate, UserLogin

router = APIRouter()


# ======================
# SIGNUP
# ======================
@router.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    # 이메일 중복 체크
    exist = db.query(User).filter(User.email == user.email).first()
    if exist:
        raise HTTPException(status_code=400, detail="이미 존재하는 이메일")

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "message": "회원가입 성공"
    }


# ======================
# LOGIN
# ======================
@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="유저 없음")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="비밀번호 틀림")

    token = create_access_token(
        data={"user_id": db_user.id}
    )

    return {
        "success": True,
        "access_token": token,
        "token_type": "bearer"
    }


# ======================
# ME (로그인 상태 확인)
# ======================
@router.get("/me")
def me(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {"success": False, "message": "유저 없음"}

    return {
        "success": True,
        "data": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }