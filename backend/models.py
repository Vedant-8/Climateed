from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base  # Importing Base from database.py

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    game_progress = relationship("GameProgress", back_populates="user")

class GameProgress(Base):
    __tablename__ = "game_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    game1_status = Column(String, nullable=False, default="Not Started")
    game1_points = Column(Integer, default=0)
    game2_status = Column(String, nullable=False, default="Not Started")
    game2_points = Column(Integer, default=0)
    game3_status = Column(String, nullable=False, default="Not Started")
    game3_points = Column(Integer, default=0)
    climate_points = Column(Integer, default=0)

    user = relationship("User", back_populates="game_progress")
