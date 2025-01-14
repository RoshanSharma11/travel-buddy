from fastapi import FastAPI, Depends, HTTPException
from . import  models
from .database import engine, SessionLocal
from sqlalchemy.orm import Session
import uuid

app = FastAPI()

models.Base.metadata.create_all(engine)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@app.post('/create-group')
def create_group(name: str, destination: str, db: Session = Depends(get_db)):
    
    trip_id = int(uuid.uuid4().int & (1 << 32) - 1)
    owner_id = int(uuid.uuid4().int & (1 << 32) - 1)
    group_code = str(uuid.uuid4())[:8]  
    usrr_id = []  
    

    
    new_group = models.Info(
        trip_id=trip_id,
        owner_id=owner_id,
        usrr_id=usrr_id,  
        code=group_code,
        name=name,
        destination=destination,
    )
    db.add(new_group)
    db.commit()
    db.refresh(new_group)

    return new_group
        
        
    




@app.post('/join-group')
def join_group(group_code: str, user_id: int, db: Session = Depends(get_db)):
    
    group = db.query(models.Info).filter(models.Info.code == group_code).first()

    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    
    if user_id in group.usrr_id:
        raise HTTPException(status_code=400, detail="User is already a member of the group")

    
    group.usrr_id.append(user_id)

    
    db.commit()
    db.refresh(group)

    return {"message": "User added to the group successfully", "group": group}



