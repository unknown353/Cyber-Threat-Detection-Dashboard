import { useEffect, useState } from "react";
import axios from "axios";


function Dashboard() {

  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchThreats = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/threats"
      );

      setThreats(response.data);

    } catch (error) {

      console.error(
        "Failed to load threats:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchThreats();

    // Refresh dashboard automatically
    const interval = setInterval(
      fetchThreats,
      3000
    );

    return () => clearInterval(interval);

  }, []);


  const criticalThreats = threats.filter(
    (threat) =>
      threat.severity === "Critical"
  ).length;


  const highThreats = threats.filter(
    (threat) =>
      threat.severity === "High"
  ).length;


  const mediumThreats = threats.filter(
    (threat) =>
      threat.severity === "Medium"
  ).length;


  return (
    <div>

      <h1>Security Overview</h1>

      <p className="subtitle">
        Monitor and analyze cybersecurity threats in real time.
      </p>


      <div className="stats-grid">

        <div className="stat-card critical">

          <span>CRITICAL THREATS</span>

          <h2>{criticalThreats}</h2>

        </div>


        <div className="stat-card high">

          <span>HIGH THREATS</span>

          <h2>{highThreats}</h2>

        </div>


        <div className="stat-card medium">

          <span>MEDIUM THREATS</span>

          <h2>{mediumThreats}</h2>

        </div>


        <div className="stat-card total">

          <span>TOTAL ALERTS</span>

          <h2>{threats.length}</h2>

        </div>

      </div>


      <div className="panel">

        <h2>Recent Security Alerts</h2>


        {loading ? (

          <p>Loading threats...</p>

        ) : threats.length === 0 ? (

          <p>
            No threats detected yet.
            Run a simulation to generate security events.
          </p>

        ) : (

          <table>

            <thead>

              <tr>

                <th>Threat</th>
                <th>Source IP</th>
                <th>Severity</th>
                <th>Risk Score</th>

              </tr>

            </thead>


            <tbody>

              {threats
                .slice(-5)
                .reverse()
                .map((threat) => (

                  <tr key={threat.id}>

                    <td>
                      {threat.threat_type}
                    </td>

                    <td>
                      {threat.source_ip}
                    </td>

                    <td>
                      {threat.severity}
                    </td>

                    <td>
                      {threat.risk_score}/100
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}


export default Dashboard;