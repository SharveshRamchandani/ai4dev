import re
import datetime
from fastapi import APIRouter
from backend.models.schemas import NLPExtractRequest, NLPExtractResponse

router = APIRouter(prefix="/api/nlp", tags=["NLP & AI Extraction"])

@router.post("/extract", response_model=NLPExtractResponse)
def extract_deadline_from_text(req: NLPExtractRequest):
    text = req.text
    # Simple heuristic extraction simulator for demo/mock backend
    title_match = re.search(r"(assignment|proposal|project|quiz|exam|pset|problem set|essay|report)[\w\s\d—\-:]+", text, re.IGNORECASE)
    subject_match = re.search(r"\b(CS\s*\d+|MATH\s*\d+|PHYS\s*\d+|ENG\s*\d+|BIO\s*\d+|HIST\s*\d+)\b", text, re.IGNORECASE)
    
    extracted_title = title_match.group(0).strip() if title_match else "Extracted Academic Task"
    extracted_subject = subject_match.group(0).upper().strip() if subject_match else "Computer Science"
    
    # Calculate mock future date
    future_date = datetime.datetime.now() + datetime.timedelta(days=3, hours=4)
    deadline_iso = future_date.strftime("%Y-%m-%dT23:59:00")
    
    confidence = 94 if (title_match and subject_match) else 88 if title_match else 75
    
    return NLPExtractResponse(
        title=f"{extracted_subject} — {extracted_title}",
        subject=extracted_subject,
        deadline=deadline_iso,
        confidence=confidence,
        estimated_effort_hours=2.5,
        extracted_entities={
            "detected_keywords": ["deadline", "due", "submission", "grade weight"],
            "detected_timeframe": "Next 72 hours",
            "source_type": req.source or "Unstructured Input"
        },
        ai_summary=f"Identified deadline with {confidence}% confidence based on temporal expressions and course context."
    )
