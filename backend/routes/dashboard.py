import datetime
from fastapi import APIRouter
from backend.routes.tasks import tasks_db
from backend.data.mock_data import initial_schedule_blocks, initial_integrations

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("")
def get_dashboard_summary():
    # Calculate Cognitive Load Index based on pending tasks & total effort
    pending_tasks = [t for t in tasks_db if t.get("status") == "pending"]
    total_effort = sum(t.get("effort_hours", 1.0) for t in pending_tasks)
    
    # Simple dynamic load calculation (30 base + effort factor + task count factor)
    load_index = min(95, max(20, int(35 + (total_effort * 3.5) + (len(pending_tasks) * 2))))
    
    # Priority queue (top 5 pending by priority)
    sorted_pending = sorted(pending_tasks, key=lambda x: x.get("priority", 0), reverse=True)
    priority_queue = sorted_pending[:5]
    
    # Upcoming deadline strip (next 7 days)
    today = datetime.date.today()
    deadlines_strip = []
    days_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    
    for i in range(7):
        target_date = today + datetime.timedelta(days=i)
        day_str = "Today" if i == 0 else "Tomorrow" if i == 1 else days_names[target_date.weekday()]
        label_str = target_date.strftime("%b %d")
        
        # Count deadlines on this day
        count = sum(
            1 for t in pending_tasks
            if t.get("deadline", "").startswith(target_date.isoformat())
        )
        deadlines_strip.append({
            "day": day_str,
            "label": label_str,
            "count": count
        })
        
    return {
        "user_name": "Arjun",
        "current_date": datetime.datetime.now().strftime("%A, %B %d, %Y"),
        "cognitive_load": {
            "value": load_index,
            "status": "Optimal" if load_index < 40 else "Moderate" if load_index < 70 else "High Burnout Risk",
            "recommended_action": "Schedule is well-balanced" if load_index < 70 else "Consider rescheduling lower priority tasks"
        },
        "priority_queue": priority_queue,
        "upcoming_deadlines": deadlines_strip,
        "schedule_blocks_today": [
            b for b in initial_schedule_blocks if b["day"] == 0
        ],
        "sync_status": [
            {"name": i["name"], "time": i["lastSync"] or "Not synced", "ok": i["status"] == "connected"}
            for i in initial_integrations if i["status"] == "connected"
        ],
        "recent_extractions": [
            {"title": "Bio 301 Quiz Reminder", "source": "Gmail", "confidence": 92},
            {"title": "History Paper Extension Notice", "source": "Canvas", "confidence": 87}
        ]
    }
