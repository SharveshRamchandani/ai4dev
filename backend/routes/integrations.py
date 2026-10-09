import datetime
from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List
from backend.data.mock_data import initial_integrations
from backend.routes.tasks import tasks_db

router = APIRouter(prefix="/api/integrations", tags=["Integrations"])

integrations_db: List[dict] = [dict(i) for i in initial_integrations]
nlp_settings = {
    "auto_accept_threshold": 85,
}

class NLPSettingsUpdate(BaseModel):
    auto_accept_threshold: int

@router.get("")
def list_integrations():
    return {
        "connected": [i for i in integrations_db if i["status"] == "connected"],
        "available": [i for i in integrations_db if i["status"] == "disconnected"],
        "nlp_settings": nlp_settings
    }

@router.post("/{platform_id}/sync")
def sync_platform(platform_id: str):
    platform = next((i for i in integrations_db if i["id"] == platform_id), None)
    if not platform:
        raise HTTPException(status_code=404, detail="Integration not found")
    
    platform["lastSync"] = "Just now"
    platform["status"] = "connected"
    return {
        "message": f"Successfully synchronized with {platform['name']}",
        "platform": platform,
        "items_synced": 4
    }

@router.post("/{platform_id}/connect")
def connect_platform(platform_id: str):
    platform = next((i for i in integrations_db if i["id"] == platform_id), None)
    if not platform:
        raise HTTPException(status_code=404, detail="Integration not found")
    
    platform["status"] = "connected"
    platform["lastSync"] = "Just now"
    platform["scopes"] = "Read & Sync Access"
    return {"message": f"Connected to {platform['name']}", "platform": platform}

@router.post("/{platform_id}/disconnect")
def disconnect_platform(platform_id: str):
    platform = next((i for i in integrations_db if i["id"] == platform_id), None)
    if not platform:
        raise HTTPException(status_code=404, detail="Integration not found")
    
    platform["status"] = "disconnected"
    platform["lastSync"] = None
    return {"message": f"Disconnected {platform['name']}", "platform": platform}

@router.post("/nlp-settings")
def update_nlp_settings(settings: NLPSettingsUpdate):
    nlp_settings["auto_accept_threshold"] = settings.auto_accept_threshold
    return {"message": "NLP settings updated", "nlp_settings": nlp_settings}

@router.post("/import/csv")
async def import_csv_tasks(file: UploadFile = File(...)):
    # Simulates CSV task parsing
    contents = await file.read()
    added_tasks = [
        {
            "id": str(len(tasks_db) + 1),
            "title": f"Imported: {file.filename.split('.')[0]} Task 1",
            "subject": "Imported",
            "source": "Manual",
            "sourceDetail": f"CSV: {file.filename}",
            "confidence": 100,
            "deadline": (datetime.datetime.now() + datetime.timedelta(days=4)).isoformat(),
            "priority": 70,
            "effort": "2h",
            "effort_hours": 2.0,
            "creditWeight": 3,
            "description": f"Imported via CSV file '{file.filename}'.",
            "status": "pending",
            "dependencies": [],
            "aiReasoning": [],
            "activity": [{"action": f"Imported from {file.filename}", "time": "Just now"}]
        }
    ]
    tasks_db.extend(added_tasks)
    return {
        "message": f"Successfully imported 1 task from {file.filename}",
        "tasks": added_tasks
    }
