from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(UserCreate):
    id: int

    class Config:
        from_attributes = True

class GameProgressCreate(BaseModel):
    game1_points: int = 0
    game1_status: str = "not started"
    game2_points: int = 0
    game2_status: str = "not started"
    game3_points: int = 0
    game3_status: str = "not started"
    climate_points: int = 0

class GameProgressResponse(GameProgressCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True
