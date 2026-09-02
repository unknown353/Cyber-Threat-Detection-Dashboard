import axios from "axios";
import { useState } from "react";


function Simulator() {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const runSimulation = async (type) => {

    try {

      setLoading(true);
      setResult(null);

      let endpoint = "";

      if (type === "bruteforce") {
        endpoint =
          "http://127.0.0.1:8000/api/simulate/bruteforce";
      }

      if (type === "suspicious-ip") {
        endpoint =
          "http://127.0.0.1:8000/api/simulate/suspicious-ip";
      }


      const response = await axios.post(endpoint);

      setResult(response.data);

    } 

catch (error) {
   console.error("Simulation Error:", error);

  if (error.response) {
    alert(
      `Backend error: ${error.response.status}\n` +
      JSON.stringify(error.response.data)
    );
  } else if (error.request) {
    alert(
      "No response from backend.\n\n" +
      "Check the FastAPI server and CORS configuration."
    );
  } else {
    alert("Error: " + error.message);
  }
}

  };


  return (
    <div>

      <h1>Threat Simulator</h1>

      <p className="subtitle">
        Generate simulated cybersecurity attack events.
      </p>


      <div className="simulation-grid">


        {/* BRUTE FORCE CARD */}

        <div className="simulation-card">

          <h2>🔐 Brute Force Attack</h2>

          <p>
            Simulates multiple failed login attempts
            from the same IP address.
          </p>

          <p className="simulation-info">
            Detection Rule: 5+ failed logins
          </p>

          <button
            onClick={() => runSimulation("bruteforce")}
            disabled={loading}
          >
            {loading
              ? "SIMULATING..."
              : "SIMULATE ATTACK"}
          </button>

        </div>


        {/* SUSPICIOUS IP CARD */}

        <div className="simulation-card">

          <h2>☠ Suspicious IP</h2>

          <p>
            Simulates a network connection from
            a blacklisted IP address.
          </p>

          <p className="simulation-info">
            Detection Rule: IP Blacklist Match
          </p>

          <button
            onClick={() => runSimulation("suspicious-ip")}
            disabled={loading}
          >
            {loading
              ? "SIMULATING..."
              : "SIMULATE ATTACK"}
          </button>

        </div>


      </div>


      {/* SIMULATION RESULT */}

      {result && (

        <div className="result-panel">

          <h2>🚨 Simulation Result</h2>

          <div className="result-grid">

            <div>
              <span>Simulation</span>
              <strong>{result.simulation}</strong>
            </div>

            <div>
              <span>Source IP</span>
              <strong>{result.source_ip}</strong>
            </div>

            <div>
              <span>Threat Detected</span>
              <strong>
                {result.threat_detected
                  ? "YES"
                  : "NO"}
              </strong>
            </div>

            {result.failed_attempts_generated && (
              <div>
                <span>Failed Attempts</span>
                <strong>
                  {result.failed_attempts_generated}
                </strong>
              </div>
            )}

            <div>
              <span>Severity</span>
              <strong>{result.severity}</strong>
            </div>

            <div>
              <span>Risk Score</span>
              <strong>{result.risk_score}</strong>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}


export default Simulator; 