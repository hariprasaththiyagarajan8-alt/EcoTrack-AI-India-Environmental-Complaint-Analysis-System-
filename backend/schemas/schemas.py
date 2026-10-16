"""
Pydantic Schemas for EcoTrack AI Request/Response Validation.
"""

from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field


class ComplaintSubmissionRequest(BaseModel):
    description: str = Field(..., min_length=15, max_length=5000, description="Natural language complaint text")
    category: Optional[str] = Field(None, description="Optional user-selected category; NLP will classify automatically")
    state: str = Field(..., min_length=2, max_length=100)
    district: str = Field(..., min_length=2, max_length=100)
    city_town_village: str = Field(..., min_length=2, max_length=150)
    locality: Optional[str] = Field(None, max_length=200)
    incident_date: Optional[str] = None


class ExtractedLocationsSchema(BaseModel):
    state: Optional[str] = None
    district: Optional[str] = None
    locality_or_landmark: Optional[str] = None
    raw_mentions: List[str] = []


class ComplaintNoteResponse(BaseModel):
    id: str
    author: str
    role: str
    text: str
    created_at: str


class ComplaintHistoryResponse(BaseModel):
    id: str
    action: str
    actor: str
    details: str
    timestamp: str


class EnvironmentalComplaintResponse(BaseModel):
    id: str
    description: str
    predicted_category: str
    human_reviewed_category: Optional[str] = None
    prediction_confidence: float
    state: str
    district: str
    city_town_village: str
    locality: Optional[str] = None
    incident_date: Optional[str] = None
    submission_date: str
    status: str
    extracted_keywords: List[str]
    extracted_locations: ExtractedLocationsSchema
    notes: List[ComplaintNoteResponse] = []
    history: List[ComplaintHistoryResponse] = []
    is_synthetic_demonstration: bool = True


class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str


class AdminLoginResponse(BaseModel):
    token: str
    user: Dict[str, Any]


class StatusUpdateRequest(BaseModel):
    status: str
    remarks: Optional[str] = None


class CategoryCorrectionRequest(BaseModel):
    category: str
    reason: Optional[str] = None


class AddNoteRequest(BaseModel):
    text: str = Field(..., min_length=3, max_length=2000)


class NLPAnalysisPreviewRequest(BaseModel):
    text: str


class NLPAnalysisPreviewResponse(BaseModel):
    predicted_category: str
    confidence: float
    keywords: List[str]
    locations: ExtractedLocationsSchema
    probabilities: Dict[str, float]
