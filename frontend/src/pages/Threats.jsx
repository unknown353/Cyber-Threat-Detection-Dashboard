import { useEffect, useState } from "react";
import axios from "axios";


function Threats() {

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

    // Automatically refresh threat data
    const interval = setInterval(
      fetchThreats,
      3000
    );

    return () => clearInterval(interval);

  }, []);


  return (

    <div>

      <h1>Threat Management</h1>

      <p className="subtitle">
        View and manage detected cybersecurity threats.
      </p>


      <div className="panel">

        {loading ? (

          <p>Loading threats...</p>

        ) : threats.length === 0 ? (

          <p>
            No threats detected yet.
            Run a simulation first.
          </p>

        ) : (

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Threat Type</th>
                <th>Source IP</th>
                <th>Severity</th>
                <th>Risk Score</th>
                <th>Status</th>

              </tr>

            </thead>


            <tbody>

              {threats
                .slice()
                .reverse()
                .map((threat) => (

                  <tr key={threat.id}>

                    <td>
                      #{threat.id}
                    </td>

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

                    <td>
                      {threat.status}
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


export default Threats;