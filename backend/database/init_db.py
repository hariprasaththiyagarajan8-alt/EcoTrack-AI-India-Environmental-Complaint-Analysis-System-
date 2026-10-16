"""
Database initialization script for EcoTrack AI.
Creates tables and seeds default administrator credentials and demonstration data.
Run: python -m backend.database.init_db
"""

import uuid
from datetime import datetime
from passlib.hash import bcrypt
from backend.database.database import engine, SessionLocal
from backend.models.models import Base, Administrator, EnvironmentalComplaint, ComplaintHistory


def init_database():
    print("Creating all tables in PostgreSQL...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if default admin exists
        admin = db.query(Administrator).filter(Administrator.email == "admin@ecotrack.gov.in").first()
        if not admin:
            print("Creating default administrator account: admin@ecotrack.gov.in")
            admin_id = str(uuid.uuid4())
            admin = Administrator(
                id=admin_id,
                name="Er. Rajesh Sharma",
                email="admin@ecotrack.gov.in",
                password_hash=bcrypt.hash("EcoTrack#2026"),
                role="Administrator",
                department="Central Environmental Monitoring Authority",
                created_at=datetime.utcnow()
            )
            db.add(admin)
            db.commit()
            print("Administrator account created.")
        else:
            print("Administrator account already exists.")
            
    finally:
        db.close()
    print("Database initialization complete.")


if __name__ == "__main__":
    init_database()
