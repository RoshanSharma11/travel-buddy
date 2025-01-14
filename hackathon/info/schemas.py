from pydantic import BaseModel
from typing import List

class group_table(BaseModel):
    trip_id : int
    owner_id : int
    usrr_id : List[int]
    code : str