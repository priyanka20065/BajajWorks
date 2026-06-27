import { useState } from "react";
import axios from "axios";
import "./App.css";

import ResponseCard from "./components/ResponseCard";
import Summary from "./components/Summary";

function App() {
  const [input, setInput] = useState(
`A->B
A->C
B->D
C->E
E->F
X->Y
Y->Z
Z->X
G->H
G->H
hello
1->2
A->`
  );

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace with your deployed backend URL
  const API_URL = "http://localhost:3000/bfhl";

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const data = input
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const res = await axios.post(API_URL, { data });

      setResponse(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Unable to connect to backend."
      );
      setResponse(null);
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <div className="header">
        <h1>🌳 Hierarchy Builder</h1>
        <p>Chitkara Full Stack Engineering Challenge</p>
      </div>

      <div className="input-card">

        <label>
          Enter one edge per line
        </label>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={15}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

      </div>

      {response && (

        <>

          <Summary summary={response.summary} />

          <div className="info-grid">

            <div className="info-card">

              <h3>❌ Invalid Entries</h3>

              {response.invalid_entries.length === 0 ? (
                <p>None</p>
              ) : (
                <ul>
                  {response.invalid_entries.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}

            </div>

            <div className="info-card">

              <h3>⚠ Duplicate Edges</h3>

              {response.duplicate_edges.length === 0 ? (
                <p>None</p>
              ) : (
                <ul>
                  {response.duplicate_edges.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}

            </div>

          </div>

          <div className="hierarchies">

            <h2>Hierarchies</h2>

            {response.hierarchies.map((tree, index) => (

              <ResponseCard
                key={index}
                hierarchy={tree}
              />

            ))}

          </div>

        </>

      )}

    </div>
  );
}

export default App;