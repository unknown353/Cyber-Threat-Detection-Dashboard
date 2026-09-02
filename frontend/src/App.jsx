import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Threats from "./pages/Threats";
import Simulator from "./pages/Simulator";
import "./index.css";


function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo">
          🛡 CYBERGUARD
        </div>

        <nav>

          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={page === "threats" ? "active" : ""}
            onClick={() => setPage("threats")}
          >
            🚨 Threats
          </button>

          <button
            className={page === "simulator" ? "active" : ""}
            onClick={() => setPage("simulator")}
          >
            🧪 Simulator
          </button>

        </nav>

        <div className="system-status">
          <span className="status-dot"></span>
          System Operational
        </div>

      </aside>


      <main className="content">

        {page === "dashboard" && <Dashboard />}

        {page === "threats" && <Threats />}

        {page === "simulator" && <Simulator />}

      </main>

    </div>
  );
}


export default App;