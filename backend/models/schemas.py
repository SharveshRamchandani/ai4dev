from pydantic import BaseModel, Field
from typing import List, Optional, Literal, Dict, Any

class UserProfile(BaseModel):
    id: str = "user-1"
    name: str = "Arjun Patel"
    email: str = "arjun@university.edu"
    university: str = "Stanford University"
    role: str = "Undergraduate"

class UserPreferences(BaseModel):
    max_daily_study_hours: int = 6
    preferred_study_block_duration: int = 90
    break_frequency: int = 90
    wake_time: str = "07:00"
    sleep_time: str = "23:00"
    study_on_weekends: bool = False
    fatigue_sensitivity: int = 50
    scheduler_aggressiveness: Literal["Conservative", "Balanced", "Intensive"] = "Balanced"
    daily_hard_cap: int = 8
    auto_regenerate_schedule: bool = True
    notification_deadline_reminders: bool = True
    notification_schedule_nudges: bool = True
    notification_cognitive_load_alerts: bool = True
    notification_new_task_extracted: bool = True
    notification_sync_status_updates: bool = True
    reminder_lead_time_hours: int = 24
    client_side_email_preprocessing: bool = True

class AIReasoningItem(BaseModel):
    factor: str
    score: int

class ActivityItem(BaseModel):
    action: str
    time: str

class TaskItem(BaseModel):
    id: str
    title: str
    subject: str
    source: Literal["Canvas", "Gmail", "Slack", "Moodle", "Blackboard", "Manual"]
    sourceDetail: Optional[str] = None
    confidence: Optional[int] = 95
    deadline: str
    priority: int = 70
    effort: str = "1h"
    effort_hours: float = 1.0
    creditWeight: int = 3
    description: str = ""
    notes: Optional[str] = ""
    status: Literal["pending", "completed"] = "pending"
    dependencies: List[str] = []
    aiReasoning: List[AIReasoningItem] = []
    activity: List[ActivityItem] = []

class TaskCreate(BaseModel):
    title: str
    subject: str = "General"
    source: Literal["Canvas", "Gmail", "Slack", "Moodle", "Blackboard", "Manual"] = "Manual"
    sourceDetail: Optional[str] = "Manual Entry"
    confidence: Optional[int] = 100
    deadline: str
    effort_hours: float = 1.0
    creditWeight: int = 3
    description: Optional[str] = ""
    notes: Optional[str] = ""
    dependencies: List[str] = []

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    subject: Optional[str] = None
    deadline: Optional[str] = None
    effort_hours: Optional[float] = None
    creditWeight: Optional[int] = None
    description: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[Literal["pending", "completed"]] = None
    dependencies: Optional[List[str]] = None

class ScheduleBlock(BaseModel):
    id: Optional[str] = None
    day: int # 0=Mon, 6=Sun
    startHour: float
    duration: float
    subject: str
    type: Literal["study", "break"]

class PlatformIntegration(BaseModel):
    id: str
    name: str
    icon_type: str
    status: Literal["connected", "disconnected"]
    lastSync: Optional[str] = None
    scopes: Optional[str] = None

class NLPExtractRequest(BaseModel):
    text: str
    source: Optional[str] = "Manual / Raw Text"

class NLPExtractResponse(BaseModel):
    title: str
    subject: str
    deadline: str
    confidence: int
    estimated_effort_hours: float
    extracted_entities: Dict[str, Any]
    ai_summary: str

class BulkActionRequest(BaseModel):
    task_ids: List[str]
