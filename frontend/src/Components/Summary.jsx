import React from "react";

function Summary({ summary }) {
  if (!summary) return null;

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>🌳 Total Trees</h3>
        <p>{summary.total_trees}</p>
      </div>

      <div className="summary-card">
        <h3>🔄 Total Cycles</h3>
        <p>{summary.total_cycles}</p>
      </div>

      <div className="summary-card">
        <h3>🏆 Largest Tree Root</h3>
        <p>{summary.largest_tree_root || "-"}</p>
      </div>
    </div>
  );
}

export default Summary;