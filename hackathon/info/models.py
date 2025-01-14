from sqlalchemy import Column, Integer, String, JSON
from .database import Base

class Info(Base):
    __tablename__ = 'info'
    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, nullable=False)
    owner_id = Column(Integer, nullable=False)
    usrr_id = Column(JSON, nullable=False) 
    code = Column(String, unique=True, nullable=False)  
    name = Column(String, nullable=False) 
    destination = Column(String, nullable=False)  