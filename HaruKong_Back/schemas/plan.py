from pydantic import BaseModel
from datetime import date

class PlanCreate(BaseModel):
    user_id: int
    title: str
    date: date
    location: str


class PlanResponse(BaseModel):
    id: int
    user_id: int
    title: str
    date: date
    location: str

    class Config:
        from_attributes = True