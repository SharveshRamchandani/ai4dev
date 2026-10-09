# AcadSynk Mock Backend API (FastAPI)

This is a Python mock backend built with **FastAPI** to support all frontend interactions and AI-driven features in **AcadSynk**.

---

## 🚀 Quick Start

### 1. Requirements
Ensure Python 3.10+ is installed.

### 2. Install Dependencies
```bash
pip install -r backend/requirements.txt
```

### 3. Run the Backend
From the repository root (`d:/Projects/ai4dev`):
```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
or run directly:
```bash
python backend/main.py
```

### 4. Interactive API Documentation
Once running, open your browser to explore and test the endpoints:
* **Swagger UI Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📡 Available API Endpoints

### 👤 Auth & User Preferences
* `GET /api/auth/me` - Current user profile and study preferences
* `PUT /api/auth/profile` - Update user details
* `PUT /api/auth/preferences` - Update study habits, wake/sleep time, cognitive load thresholds

### 📝 Task Management & Priority Scoring
* `GET /api/tasks` - List tasks with query filters (`status`, `search`, `subject`, `sort_by`)
* `GET /api/tasks/{task_id}` - Get full task details including AI priority reasoning & history
* `POST /api/tasks` - Create new academic task (auto-calculates priority score 0-100)
* `PUT /api/tasks/{task_id}` - Update task details & dependencies
* `POST /api/tasks/{task_id}/toggle` - Toggle status between `pending` and `completed`
* `DELETE /api/tasks/{task_id}` - Delete task
* `POST /api/tasks/bulk-complete` - Bulk complete tasks
* `POST /api/tasks/bulk-delete` - Bulk delete tasks

### 📊 Dashboard & Burnout Prevention
* `GET /api/dashboard` - Daily priority queue, deadline countdown strip, and **Cognitive Load Index (0-100)**

### 📅 Adaptive Scheduler
* `GET /api/schedule` - Weekly time blocks (study slots, breaks)
* `POST /api/schedule/regenerate` - AI adaptive reschedule based on pending tasks
* `POST /api/schedule/tired-mode` - Dynamically lightens today's schedule

### 🤖 NLP Deadline Extraction Simulator
* `POST /api/nlp/extract` - Extracts deadline, course code, confidence score, and estimated effort from raw unstructured text

### 🔌 Integrations & Sync
* `GET /api/integrations` - Connected platforms (Canvas, Gmail, Calendar, Slack)
* `POST /api/integrations/{platform_id}/sync` - Trigger sync
* `POST /api/integrations/{platform_id}/connect` - Connect platform
* `POST /api/integrations/{platform_id}/disconnect` - Disconnect platform
* `POST /api/integrations/nlp-settings` - Update auto-accept threshold (e.g. 85%)
* `POST /api/integrations/import/csv` - Upload CSV tasks

### 📈 Analytics
* `GET /api/analytics` - Completion trends, cognitive load history, platform breakdown, subject hours, and at-risk task warnings

### 🔔 Notifications & Search
* `GET /api/notifications` - Notifications feed
* `POST /api/notifications/{id}/read` - Mark read
* `POST /api/notifications/read-all` - Mark all read
* `GET /api/search?q={query}` - Global search across tasks, syllabus, emails
