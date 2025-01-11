from sqlalchemy import Column, Integer, String, JSON
from .database import Base

class Info(Base):
    __tablename__ = 'info'
    id = Column(Integer, index=True, primary_key=True)
    trip_id = Column(Integer, nullable=False)
    owner_id = Column(Integer, nullable=False)
    usrr_id = Column(JSON, nullable=False)
    code = Column(String, nullable=False)