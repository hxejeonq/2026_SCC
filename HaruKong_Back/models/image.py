from sqlalchemy import Column, Integer, String, ForeignKey
from HaruKong_Back.database import Base

class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    record_id = Column(Integer, ForeignKey("records.id"))

    url = Column(String(255))