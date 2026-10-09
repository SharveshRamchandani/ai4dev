import uuid
import datetime
from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from backend.models.schemas import TaskItem, TaskCreate, TaskUpdate, BulkActionRequest
from backend.data.mock_data import initial_tasks

router = APIRouter(prefix="/api/tasks", tags=["Tasks"])

# In-memory store
tasks_db: List[dict] = [dict(t) for t in initial_tasks]

def calculate_priority(task: dict) -> int:
    """Calculates multi-factor academic priority score (0-100)."""
    score = 50
    # Proximity
    try:
        deadline_dt = datetime.datetime.fromisoformat(task["deadline"])
        now = datetime.datetime.now()
        days_left = (deadline_dt - now).total_seconds() / 86400
        if days_left <= 1:
            score += 30
        elif days_left <= 3:
            score += 20
        elif days_left <= 7:
            score += 10
    except Exception:
        pass
    
    # Credit weight (1-5)
    credit = task.get("creditWeight", 3)
    score += (credit - 3) * 5
    
    # Effort
    effort = task.get("effort_hours", 1.0)
    if effort >= 3:
        score += 10
    elif effort >= 1.5:
        score += 5
        
    return max(10, min(99, score))

@router.get("", response_model=List[dict])
def list_tasks(
    status: Optional[str] = Query(None, description="Filter by pending/completed"),
    search: Optional[str] = Query(None, description="Search keyword in title/subject/description"),
    subject: Optional[str] = Query(None, description="Filter by subject"),
    sort_by: Optional[str] = Query("priority", description="Sort field (priority, deadline, effort)")
):
    results = list(tasks_db)
    if status and status != "all":
        results = [t for t in results if t.get("status") == status]
    if subject:
        results = [t for t in results if t.get("subject", "").lower() == subject.lower()]
    if search:
        s = search.lower()
        results = [
            t for t in results
            if s in t.get("title", "").lower() or s in t.get("subject", "").lower() or s in t.get("description", "").lower()
        ]
    
    if sort_by == "priority":
        results.sort(key=lambda x: x.get("priority", 0), reverse=True)
    elif sort_by == "deadline":
        results.sort(key=lambda x: x.get("deadline", ""))
        
    return results

@router.get("/{task_id}", response_model=dict)
def get_task(task_id: str):
    task = next((t for t in tasks_db if str(t["id"]) == str(task_id)), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("", response_model=dict)
def create_task(task_in: TaskCreate):
    new_id = str(len(tasks_db) + 1)
    
    # Format effort string
    hours = task_in.effort_hours
    effort_str = f"{int(hours)}h" if hours == int(hours) else f"{hours}h"
    if hours < 1:
        effort_str = f"{int(hours * 60)}m"

    new_task = {
        "id": new_id,
        "title": task_in.title,
        "subject": task_in.subject,
        "source": task_in.source,
        "sourceDetail": task_in.sourceDetail or "Manual Entry",
        "confidence": task_in.confidence or 100,
        "deadline": task_in.deadline,
        "priority": 75,
        "effort": effort_str,
        "effort_hours": task_in.effort_hours,
        "creditWeight": task_in.creditWeight,
        "description": task_in.description or "",
        "notes": task_in.notes or "",
        "status": "pending",
        "dependencies": task_in.dependencies or [],
        "aiReasoning": [
            {"factor": "Calculated upon creation", "score": 25},
            {"factor": f"Credit weight ({task_in.creditWeight} units)", "score": task_in.creditWeight * 5},
            {"factor": f"Effort required ({effort_str})", "score": 20},
        ],
        "activity": [
            {"action": "Created task", "time": datetime.datetime.now().strftime("%b %d, %I:%M %p")}
        ],
    }
    new_task["priority"] = calculate_priority(new_task)
    tasks_db.insert(0, new_task)
    return new_task

@router.put("/{task_id}", response_model=dict)
def update_task(task_id: str, updates: TaskUpdate):
    task = next((t for t in tasks_db if str(t["id"]) == str(task_id)), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    if "effort_hours" in update_data:
        hours = update_data["effort_hours"]
        task["effort_hours"] = hours
        task["effort"] = f"{int(hours)}h" if hours == int(hours) else f"{hours}h"
        if hours < 1:
            task["effort"] = f"{int(hours * 60)}m"
            
    for k, v in update_data.items():
        if k != "effort_hours":
            task[k] = v
            
    task["priority"] = calculate_priority(task)
    task["activity"].append({
        "action": "Updated task details",
        "time": datetime.datetime.now().strftime("%b %d, %I:%M %p")
    })
    return task

@router.post("/{task_id}/toggle")
def toggle_task_status(task_id: str):
    task = next((t for t in tasks_db if str(t["id"]) == str(task_id)), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    new_status = "completed" if task.get("status") == "pending" else "pending"
    task["status"] = new_status
    task["activity"].append({
        "action": f"Marked {new_status}",
        "time": datetime.datetime.now().strftime("%b %d, %I:%M %p")
    })
    return {"id": task_id, "status": new_status, "message": f"Task marked {new_status}"}

@router.delete("/{task_id}")
def delete_task(task_id: str):
    global tasks_db
    before_len = len(tasks_db)
    tasks_db = [t for t in tasks_db if str(t["id"]) != str(task_id)]
    if len(tasks_db) == before_len:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully", "id": task_id}

@router.post("/bulk-complete")
def bulk_complete(req: BulkActionRequest):
    completed_ids = []
    for t in tasks_db:
        if str(t["id"]) in req.task_ids:
            t["status"] = "completed"
            completed_ids.append(t["id"])
    return {"message": f"Completed {len(completed_ids)} tasks", "task_ids": completed_ids}

@router.post("/bulk-delete")
def bulk_delete(req: BulkActionRequest):
    global tasks_db
    tasks_db = [t for t in tasks_db if str(t["id"]) not in req.task_ids]
    return {"message": f"Deleted {len(req.task_ids)} tasks", "task_ids": req.task_ids}
