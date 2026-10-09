import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.auth import router as auth_router
from backend.routes.tasks import router as tasks_router
from backend.routes.dashboard import router as dashboard_router
from backend.routes.schedule import router as schedule_router
from backend.routes.analytics import router as analytics_router
from backend.routes.integrations import router as integrations_router
from backend.routes.nlp import router as nlp_router
from backend.routes.notifications import router as notifications_router
from backend.routes.search import router as search_router

app = FastAPI(
    title="AcadSynk Mock Backend API",
    description="FastAPI mock backend for AcadSynk AI-Powered Academic Command Center",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all route modules
app.include_router(auth_router)
app.include_router(tasks_router)
app.include_router(dashboard_router)
app.include_router(schedule_router)
app.include_router(analytics_router)
app.include_router(integrations_router)
app.include_router(nlp_router)
app.include_router(notifications_router)
app.include_router(search_router)

@app.get("/")
def root():
    return {
        "app": "AcadSynk Mock API",
        "status": "online",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "acadsynk-backend"}

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
