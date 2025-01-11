from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE = 'sqlite:///./database.db'
engine = create_engine(SQLALCHEMY_DATABASE, connect_args={"check_same_thread" : False})

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit = False)

Base = declarative_base()