from sqlalchemy import Column, Integer, Text, ForeignKey
from HaruKong_Back.database import Base

class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_id = Column(Integer, ForeignKey("plans.id"))

    content = Column(Text)
    rating = Column(Integer)  # 1~5 점