from pydantic import BaseModel

class RecordCreate(BaseModel):
    user_id: int
    plan_id: int
    content: str
    rating: int


class RecordResponse(BaseModel):
    id: int
    user_id: int
    plan_id: int
    content: str
    rating: int

    class Config:
        from_attributes = True