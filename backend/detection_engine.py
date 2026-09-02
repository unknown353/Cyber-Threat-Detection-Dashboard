from sqlalchemy.orm import Session
from models import SecurityEvent, ThreatAlert


# Simulated suspicious IP database
SUSPICIOUS_IPS = {
    "203.0.113.10",
    "198.51.100.25",
    "192.0.2.55"
}


def detect_brute_force(db: Session, source_ip: str):

    failed_attempts = (
        db.query(SecurityEvent)
        .filter(
            SecurityEvent.source_ip == source_ip,
            SecurityEvent.event_type == "FAILED_LOGIN"
        )
        .count()
    )

    if failed_attempts >= 5:

        existing_alert = (
            db.query(ThreatAlert)
            .filter(
                ThreatAlert.source_ip == source_ip,
                ThreatAlert.threat_type == "Brute Force Attack",
                ThreatAlert.status == "Active"
            )
            .first()
        )

        if existing_alert:
            return existing_alert

        alert = ThreatAlert(
            threat_type="Brute Force Attack",
            source_ip=source_ip,
            severity="High",
            risk_score=75,
            status="Active",
            description=(
                f"{failed_attempts} failed login attempts "
                f"detected from the same IP."
            )
        )

        db.add(alert)
        db.commit()
        db.refresh(alert)

        return alert

    return None


def detect_suspicious_ip(db: Session, source_ip: str):

    if source_ip not in SUSPICIOUS_IPS:
        return None

    existing_alert = (
        db.query(ThreatAlert)
        .filter(
            ThreatAlert.source_ip == source_ip,
            ThreatAlert.threat_type == "Suspicious IP Activity",
            ThreatAlert.status == "Active"
        )
        .first()
    )

    if existing_alert:
        return existing_alert

    alert = ThreatAlert(
        threat_type="Suspicious IP Activity",
        source_ip=source_ip,
        severity="Critical",
        risk_score=90,
        status="Active",
        description=(
            f"Connection detected from blacklisted IP address "
            f"{source_ip}."
        )
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    return alert