@echo off
echo Starting AcadSynk FastAPI Mock Backend on http://localhost:8000...
echo Interactive Swagger Docs available at http://localhost:8000/docs
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
