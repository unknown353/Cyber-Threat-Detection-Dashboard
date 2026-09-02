# Cyber Threat Detection Dashboard

A web-based **Cyber Threat Detection Dashboard** developed as a college project. The system simulates cybersecurity attacks, detects suspicious activity, stores threat alerts, and displays them through an interactive web dashboard.

---

## Features

- Interactive cybersecurity dashboard
- Brute Force Attack simulation
- Suspicious IP detection
- Randomized simulation values
- Threat severity classification
- Risk score display
- Threat Management page
- Recent security alerts
- Automatic dashboard refresh
- SQLite database storage
- REST API backend
- React-based frontend

---

## Technology Stack

### Backend

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- SQLite

### Frontend

- React
- Vite
- Axios
- JavaScript
- CSS

---

# Requirements

Install the following software before running the project.

## 1. Python

Recommended:

```text
Python 3.12
```

Check installation:

```bash
python --version
```

---

## 2. Node.js

Install Node.js LTS.

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## 3. Visual Studio Code

Recommended VS Code extensions:

- Python
- Pylance
- Python Debugger
- ESLint
- Prettier
- GitLens

---

## 4. Git

Check installation:

```bash
git --version
```

---

# Python Dependencies

The backend requires the following main Python packages:

- fastapi
- uvicorn
- sqlalchemy

Install them using:

```bash
pip install -r requirements.txt
```

---

# Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
python -m uvicorn main:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

FastAPI API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open another terminal and move to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

---

# Running the Complete Project

The project requires two terminals.

## Terminal 1 - Backend

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload
```

## Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the application:

```text
http://localhost:5173
```

---

# Project Structure

```text
Project-CyTD/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── detection_engine.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Simulator.jsx
│   │   │   └── Threats.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# API Endpoints

## Home

```text
GET /
```

Returns the API status.

---

## Health Check

```text
GET /api/health
```

Returns the operational status of the system.

---

## Simulate Brute Force Attack

```text
POST /api/simulate/bruteforce
```

Simulates multiple failed login attempts from a generated attacker IP address.

The detection engine identifies repeated failed login attempts and generates a threat alert.

Detection rule:

```text
5 or more failed login attempts
from the same IP address
```

Default severity:

```text
High
```

---

## Simulate Suspicious IP

```text
POST /api/simulate/suspicious-ip
```

Simulates a network connection from a suspicious IP address.

The system checks the IP against a simulated threat intelligence blacklist.

Example simulated suspicious IP addresses:

```text
203.0.113.10
198.51.100.25
192.0.2.55
```

Default severity:

```text
Critical
```

---

## Get Threats

```text
GET /api/threats
```

Returns all detected threat alerts stored in the database.

---

# Threat Detection Models

The current project implements two rule-based detection models.

## 1. Brute Force Detection

The system analyzes failed login events.

If an IP address generates five or more failed login attempts, the system identifies the activity as a possible brute force attack.

Information displayed includes:

- Source IP
- Failed attempts
- Target
- Severity
- Risk score
- Alert status

---

## 2. Suspicious IP Detection

The system checks incoming source IP addresses against a simulated blacklist.

If the IP address matches a suspicious IP, the system generates a threat alert.

Information displayed includes:

- Source IP
- Target system
- Port
- Severity
- Risk score
- Alert status

---

# Database

The project uses SQLite.

The database stores:

- Security events
- Event types
- Source IP addresses
- Target systems
- Network ports
- Threat alerts
- Threat severity
- Risk scores
- Alert status

---

# Dashboard Workflow

```text
Simulator
    |
    | Simulate Attack
    v
FastAPI Backend
    |
    v
Detection Engine
    |
    v
SQLite Database
    |
    v
Threat Alert Created
    |
    +----------------------+
    |                      |
    v                      v
Dashboard            Threat Management
```

The Dashboard automatically fetches threat alerts and displays:

- Critical threat count
- High threat count
- Medium threat count
- Total alerts
- Recent security alerts

---

# Git and GitHub Setup

## Initialize Git

Open a terminal inside the main project folder:

```text
Project CyTD
```

Run:

```bash
git init
```

Check the repository status:

```bash
git status
```

Add project files:

```bash
git add .
```

Create the first commit:

```bash
git commit -m "Initial commit - Cyber Threat Detection Dashboard"
```

---

# Create a GitHub Repository

Create a new repository on GitHub.

Example repository name:

```text
Cyber-Threat-Detection-Dashboard
```

Copy the repository URL.

Then connect your local repository:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Rename the main branch:

```bash
git branch -M main
```

Push the project:

```bash
git push -u origin main
```

---

# Complete Git Commands

Run these commands from the main project folder:

```bash
git init
git add .
git commit -m "Initial commit - Cyber Threat Detection Dashboard"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

For future updates:

```bash
git add .
git commit -m "Describe your changes"
git push
```

---

# Important: .gitignore

Do not upload your Python virtual environment or Node.js modules to GitHub.

Create a `.gitignore` file containing:

```gitignore
# Python virtual environment
backend/venv/

# Python cache
__pycache__/
*.pyc

# Node.js modules
frontend/node_modules/

# Environment files
.env

# VS Code settings
.vscode/

# Local database files
*.db
*.sqlite3
```

---

# Future Improvements

Possible future improvements include:

- Real-time network traffic monitoring
- Machine learning-based threat detection
- External threat intelligence APIs
- IP geolocation
- User authentication
- Email or notification alerts
- Live threat analytics
- Security graphs and charts
- Threat filtering
- Threat status management
- Docker deployment

---

## Author

College Project: Cyber Threat Detection Dashboard
Make by :- Shrijal Meshram 

