"""
SQLAlchemy Models for EcoTrack AI - India Environmental Complaint Analysis System.
Tables:
- administrators
- environmental_complaints
- complaint_notes
- complaint_history
- model_evaluations
"""

from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Text,
    DateTime,
    Float,
    Boolean,
    ForeignKey,
    JSON,
    Index
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class Administrator(Base):
    __tablename__ = "administrators"

    id = Column(String(36), primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="Administrator", nullable=False)
    department = Column(String(150), default="Pollution Control Board Liaison", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    notes = relationship("ComplaintNote", back_populates="administrator")
    history_entries = relationship("ComplaintHistory", back_populates="administrator")


class EnvironmentalComplaint(Base):
    __tablename__ = "environmental_complaints"

    id = Column(String(32), primary_key=True, index=True) # e.g. ECO-IN-2026-1001
    description = Column(Text, nullable=False)
    predicted_category = Column(String(100), nullable=False, index=True)
    human_reviewed_category = Column(String(100), nullable=True, index=True)
    prediction_confidence = Column(Float, nullable=False)
    
    # Geographic location fields (India specific)
    state = Column(String(100), nullable=False, index=True)
    district = Column(String(100), nullable=False, index=True)
    city_town_village = Column(String(150), nullable=False)
    locality = Column(String(200), nullable=True)
    
    incident_date = Column(String(20), nullable=True)
    submission_date = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    status = Column(String(50), default="Submitted", nullable=False, index=True)
    
    # NLP & ML Extracted attributes
    extracted_keywords = Column(JSON, default=list, nullable=False)
    extracted_locations = Column(JSON, default=dict, nullable=False)
    is_synthetic_demonstration = Column(Boolean, default=True, nullable=False)

    notes = relationship("ComplaintNote", back_populates="complaint", cascade="all, delete-orphan")
    history = relationship("ComplaintHistory", back_populates="complaint", cascade="all, delete-orphan")

    __table_args__ = (
        Index("idx_complaint_state_district", "state", "district"),
        Index("idx_complaint_status_date", "status", "submission_date"),
    )


class ComplaintNote(Base):
    __tablename__ = "complaint_notes"

    id = Column(String(36), primary_key=True)
    complaint_id = Column(String(32), ForeignKey("environmental_complaints.id", ondelete="CASCADE"), nullable=False, index=True)
    author_id = Column(String(36), ForeignKey("administrators.id"), nullable=True)
    author_name = Column(String(100), nullable=False)
    role = Column(String(50), nullable=False)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    complaint = relationship("EnvironmentalComplaint", back_populates="notes")
    administrator = relationship("Administrator", back_populates="notes")


class ComplaintHistory(Base):
    __tablename__ = "complaint_history"

    id = Column(String(36), primary_key=True)
    complaint_id = Column(String(32), ForeignKey("environmental_complaints.id", ondelete="CASCADE"), nullable=False, index=True)
    actor_id = Column(String(36), ForeignKey("administrators.id"), nullable=True)
    action = Column(String(100), nullable=False)
    actor_name = Column(String(100), nullable=False)
    details = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)

    complaint = relationship("EnvironmentalComplaint", back_populates="history")
    administrator = relationship("Administrator", back_populates="history_entries")


class ModelEvaluation(Base):
    __tablename__ = "model_evaluations"

    id = Column(String(36), primary_key=True)
    evaluated_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    accuracy = Column(Float, nullable=False)
    macro_precision = Column(Float, nullable=False)
    macro_recall = Column(Float, nullable=False)
    macro_f1 = Column(Float, nullable=False)
    weighted_f1 = Column(Float, nullable=False)
    training_samples = Column(Float, nullable=False)
    test_samples = Column(Float, nullable=False)
    vocabulary_size = Column(Float, nullable=False)
    category_metrics = Column(JSON, nullable=False)
    confusion_matrix = Column(JSON, nullable=False)
