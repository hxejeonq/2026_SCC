from HaruKong_Back.database import Base, engine

from models.user import User
from models.plan import Plan
from models.record import Record
from models.image import Image

Base.metadata.create_all(bind=engine)

print("DB 전체 테이블 생성 완료 😼")