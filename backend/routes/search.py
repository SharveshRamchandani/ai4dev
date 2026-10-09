from fastapi import APIRouter, Query
from backend.routes.tasks import tasks_db

router = APIRouter(prefix="/api/search", tags=["Global Search"])

@router.get("")
def global_search(q: str = Query(..., min_length=1, description="Search query")):
    query = q.lower()
    
    # Matching tasks
    matched_tasks = [
        {
            "id": t["id"],
            "title": t["title"],
            "subject": t["subject"],
            "type": "task",
            "source": t["source"],
            "url": f"/tasks/{t['id']}"
        }
        for t in tasks_db
        if query in t.get("title", "").lower() or query in t.get("subject", "").lower() or query in t.get("description", "").lower()
    ]
    
    # Mock search across emails and syllabus
    matched_emails = [
        {"title": f"Email regarding {q}", "snippet": f"...syllabus mentions upcoming {q} deadline on Friday...", "type": "email", "source": "Gmail", "url": "/integrations"}
    ] if len(q) > 2 else []
    
    return {
        "query": q,
        "results": {
            "tasks": matched_tasks,
            "emails_and_messages": matched_emails,
            "total_count": len(matched_tasks) + len(matched_emails)
        }
    }
