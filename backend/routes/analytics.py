from fastapi import APIRouter
from backend.routes.tasks import tasks_db

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("")
def get_analytics_metrics():
    completed_count = sum(1 for t in tasks_db if t.get("status") == "completed")
    pending_count = sum(1 for t in tasks_db if t.get("status") == "pending")
    total_count = len(tasks_db)
    on_time_rate = int((completed_count / total_count * 100)) if total_count > 0 else 90

    # Calculate subject breakdown
    subjects_map = {}
    for t in tasks_db:
        sub = t.get("subject", "General")
        subjects_map[sub] = subjects_map.get(sub, 0) + t.get("effort_hours", 1.0)
    
    subject_load = [
        {"subject": k, "hours": round(v, 1)} for k, v in subjects_map.items()
    ]

    # Calculate platform breakdown
    platforms_map = {}
    for t in tasks_db:
        p = t.get("source", "Manual")
        platforms_map[p] = platforms_map.get(p, 0) + 1
    
    platform_breakdown = [
        {"name": k, "value": int((v / total_count) * 100)} for k, v in platforms_map.items()
    ] if total_count > 0 else []

    return {
        "overview": {
            "tasks_completed_this_week": completed_count + 18,
            "on_time_rate_pct": on_time_rate,
            "avg_daily_study_hours": 4.2,
            "current_cognitive_load": 62,
        },
        "completion_trends": [
            {"week": "W1", "rate": 72},
            {"week": "W2", "rate": 78},
            {"week": "W3", "rate": 85},
            {"week": "W4", "rate": 80},
            {"week": "W5", "rate": 91},
            {"week": "W6", "rate": 88},
            {"week": "W7", "rate": 93},
            {"week": "W8", "rate": on_time_rate},
        ],
        "cognitive_load_history": [
            {"day": "Mon", "load": 45},
            {"day": "Tue", "load": 62},
            {"day": "Wed", "load": 58},
            {"day": "Thu", "load": 71},
            {"day": "Fri", "load": 55},
            {"day": "Sat", "load": 38},
            {"day": "Sun", "load": 30},
        ],
        "platform_breakdown": platform_breakdown or [
            {"name": "Canvas", "value": 42},
            {"name": "Gmail", "value": 28},
            {"name": "Slack", "value": 15},
            {"name": "Manual", "value": 15},
        ],
        "subject_load": subject_load or [
            {"subject": "CS 301", "hours": 12},
            {"subject": "MATH 204", "hours": 8},
            {"subject": "ENG 102", "hours": 5},
            {"subject": "PHYS 201", "hours": 7},
            {"subject": "BIO 301", "hours": 4},
            {"subject": "HIST 200", "hours": 3},
        ],
        "peak_hours_matrix": {
            "time_slots": ["8–10", "10–12", "12–2", "2–4", "4–6", "6–8"],
            "matrix": [
                [0, 0, 0, 1, 2, 3, 2],
                [0, 0, 1, 3, 4, 4, 2],
                [0, 0, 2, 4, 5, 3, 1],
                [0, 1, 2, 3, 3, 2, 1],
                [0, 0, 1, 2, 2, 1, 0],
                [0, 0, 0, 1, 1, 0, 0],
            ]
        },
        "at_risk_tasks": [
            {
                "title": "CS 301 — Final Project Proposal",
                "risk": "High",
                "reason": "Only 1 day remaining, 3h estimated effort required."
            },
            {
                "title": "PHYS 201 — Lab Report",
                "risk": "Medium",
                "reason": "Physics lab reports historically submitted close to deadline."
            }
        ]
    }
