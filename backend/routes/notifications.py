from fastapi import APIRouter, HTTPException
from typing import List, Optional
from backend.data.mock_data import initial_notifications

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])

notifications_db: List[dict] = [dict(n) for n in initial_notifications]

@router.get("", response_model=List[dict])
def list_notifications(type_filter: Optional[str] = None):
    if type_filter and type_filter != "all":
        return [n for n in notifications_db if n.get("type") == type_filter]
    return notifications_db

@router.post("/{notif_id}/read")
def mark_notification_read(notif_id: str):
    notif = next((n for n in notifications_db if str(n["id"]) == str(notif_id)), None)
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    notif["read"] = True
    return {"message": "Notification marked as read", "notification": notif}

@router.post("/read-all")
def mark_all_read():
    for n in notifications_db:
        n["read"] = True
    return {"message": "All notifications marked as read"}
