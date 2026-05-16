from sqlalchemy import Column, Integer, String, Date, ForeignKey
from HaruKong_Back.database import Base

class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    title = Column(String(100), nullable=False)
    date = Column(Date)
    location = Column(String(100))