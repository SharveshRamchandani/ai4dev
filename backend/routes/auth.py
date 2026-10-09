from fastapi import APIRouter
from backend.models.schemas import UserProfile, UserPreferences
from backend.data.mock_data import initial_profile, initial_preferences

router = APIRouter(prefix="/api/auth", tags=["Auth & Profile"])

current_profile = dict(initial_profile)
current_preferences = dict(initial_preferences)

@router.get("/me")
def get_current_user():
    return {
        "profile": current_profile,
        "preferences": current_preferences,
    }

@router.put("/profile")
def update_profile(profile_update: UserProfile):
    current_profile.update(profile_update.model_dump())
    return {"message": "Profile updated successfully", "profile": current_profile}

@router.put("/preferences")
def update_preferences(pref_update: UserPreferences):
    current_preferences.update(pref_update.model_dump())
    return {"message": "Preferences updated successfully", "preferences": current_preferences}
