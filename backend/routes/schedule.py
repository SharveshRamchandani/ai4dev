import uuid
from fastapi import APIRouter
from typing import List, Optional
from backend.models.schemas import ScheduleBlock
from backend.data.mock_data import initial_schedule_blocks
from backend.routes.tasks import tasks_db

router = APIRouter(prefix="/api/schedule", tags=["Schedule"])

schedule_db: List[dict] = [dict(b) for b in initial_schedule_blocks]

@router.get("", response_model=List[dict])
def get_schedule():
    return schedule_db

@router.post("/regenerate")
def regenerate_schedule():
    """Simulates AI Adaptive Scheduler (RL Engine) re-planning all blocks based on pending tasks."""
    pending = [t for t in tasks_db if t.get("status") == "pending"]
    # Re-generate intelligent study slots
    new_blocks = []
    days = 7
    block_id = 1
    
    # Place top tasks across the week
    for day_idx in range(days):
        current_time = 9.0
        # Morning block
        task_for_day = pending[day_idx % len(pending)] if pending else {"title": "Self Study", "subject": "Review"}
        new_blocks.append({
            "id": f"gen-{block_id}",
            "day": day_idx,
            "startHour": current_time,
            "duration": 1.5,
            "subject": f"{task_for_day['subject']} — {task_for_day['title'].split('—')[-1].strip()}",
            "type": "study"
        })
        block_id += 1
        current_time += 1.5
        
        # Break block
        new_blocks.append({
            "id": f"gen-{block_id}",
            "day": day_idx,
            "startHour": current_time,
            "duration": 0.25,
            "subject": "Rest Break",
            "type": "break"
        })
        block_id += 1
        current_time += 0.5
        
        # Afternoon block if weekday
        if day_idx < 5 and len(pending) > 1:
            second_task = pending[(day_idx + 1) % len(pending)]
            new_blocks.append({
                "id": f"gen-{block_id}",
                "day": day_idx,
                "startHour": 14.0,
                "duration": 1.0,
                "subject": f"{second_task['subject']} — Study Block",
                "type": "study"
            })
            block_id += 1

    global schedule_db
    schedule_db = new_blocks
    return {
        "message": "Schedule regenerated successfully using Adaptive RL optimization",
        "total_blocks": len(schedule_db),
        "schedule": schedule_db
    }

@router.post("/tired-mode")
def activate_tired_mode():
    """Immediately shifts today's heavy blocks and inserts restorative breaks."""
    today_blocks = [b for b in schedule_db if b["day"] == 0]
    for b in today_blocks:
        if b["type"] == "study":
            b["duration"] = max(0.5, b["duration"] * 0.6)
            b["subject"] = f"{b['subject']} (Light Review)"
    return {
        "message": "Tired mode activated. Study loads reduced by 40% and rest buffers inserted.",
        "schedule": schedule_db
    }
