import random
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, SecurityEvent, ThreatAlert
from detection_engine import (
    detect_brute_force,
    detect_suspicious_ip
)


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="Cyber Threat Detection API",
    version="1.0.0"
)


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database connection
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# Home endpoint
@app.get("/")
def home():

    return {
        "message": "Cyber Threat Detection API is running",
        "status": "operational"
    }


# Health check
@app.get("/api/health")
def health_check():

    return {
        "system": "operational",
        "security_engine": "ready",
        "database": "connected"
    }


# Brute Force Simulation
@app.post("/api/simulate/bruteforce")
def simulate_brute_force(
    db: Session = Depends(get_db)
):

    # Generate random attacker IP
    attacker_ip = (
        f"192.168.{random.randint(1, 254)}."
        f"{random.randint(1, 254)}"
    )

    # Random number of failed attempts
    failed_attempts = random.randint(5, 15)

    # Random target
    targets = [
        "Admin Panel",
        "SSH Server",
        "User Login Portal",
        "Database Server"
    ]

    target = random.choice(targets)

    # Generate failed login events
    for _ in range(failed_attempts):

        event = SecurityEvent(
            event_type="FAILED_LOGIN",
            source_ip=attacker_ip,
            target=target,
            port=random.choice([22, 80, 443, 3306])
        )

        db.add(event)

    db.commit()

    # Detect brute force
    alert = detect_brute_force(
        db,
        attacker_ip
    )

    # Generate demo risk score
    risk_score = random.randint(70, 95)

    # Update alert score
    if alert:
        alert.risk_score = risk_score
        db.commit()
        db.refresh(alert)

    return {
        "simulation": "Brute Force Attack",
        "source_ip": attacker_ip,
        "target": target,
        "failed_attempts_generated": failed_attempts,
        "threat_detected": alert is not None,
        "severity": alert.severity if alert else None,
        "risk_score": risk_score if alert else None,
        "alert_id": alert.id if alert else None
    }

   

# Suspicious IP Simulation
@app.post("/api/simulate/suspicious-ip")
def simulate_suspicious_ip(
    db: Session = Depends(get_db)
):

    # These are our simulated threat-intelligence blacklist IPs
    suspicious_ips = [
        "203.0.113.10",
        "198.51.100.25",
        "192.0.2.55"
    ]

    suspicious_ip = random.choice(
        suspicious_ips
    )

    targets = [
        "Main Server",
        "Database Server",
        "Web Application",
        "Authentication Server"
    ]

    target = random.choice(targets)

    ports = [
        22,
        80,
        443,
        3306,
        5432
    ]

    port = random.choice(ports)

    # Generate network event
    event = SecurityEvent(
        event_type="NETWORK_CONNECTION",
        source_ip=suspicious_ip,
        target=target,
        port=port
    )

    db.add(event)
    db.commit()

    # Detect suspicious IP
    alert = detect_suspicious_ip(
        db,
        suspicious_ip
    )

    # Random demo risk score
    risk_score = random.randint(85, 100)

    if alert:

        alert.risk_score = risk_score

        db.commit()
        db.refresh(alert)

    return {
        "simulation": "Suspicious IP Detection",
        "source_ip": suspicious_ip,
        "target": target,
        "port": port,
        "threat_detected": alert is not None,
        "severity": alert.severity if alert else None,
        "risk_score": risk_score if alert else None,
        "alert_id": alert.id if alert else None
    }

# Get all detected threats
@app.get("/api/threats")
def get_threats(
    db: Session = Depends(get_db)
):

    threats = db.query(
        ThreatAlert
    ).all()

    return threats