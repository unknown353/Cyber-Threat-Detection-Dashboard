from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from database import Base


class SecurityEvent(Base):
    __tablename__ = "security_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, nullable=False)
    source_ip = Column(String, nullable=False)
    target = Column(String, nullable=False)
    port = Column(Integer, nullable=True)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )


class ThreatAlert(Base):
    __tablename__ = "threat_alerts"

    id = Column(Integer, primary_key=True, index=True)
    threat_type = Column(String, nullable=False)
    source_ip = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    risk_score = Column(Integer, nullable=False)

    status = Column(
        String,
        default="Active"
    )

    description = Column(String, nullable=False)

    detected_at = Column(
        DateTime,
        default=datetime.utcnow
    )