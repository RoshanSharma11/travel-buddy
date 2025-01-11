from fastapi import FastAPI, Depends
from . import schemas, models
from .database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@app.post('/adduser')
def create(request : schemas.group_table, db : Session = Depends(get_db)):
    new_info = models.Info(trip_id = request.trip_id, owner_id = request.owner_id, usrr_id = request.usrr_id, code = request.code)
    db.add(new_info)
    db.commit()
    db.refresh(new_info)
    return new_info
