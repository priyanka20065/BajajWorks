import React from "react";
import Tree from "./Tree";

function ResponseCard({ hierarchy }) {
  return (
    <div className="response-card">
      <h3>Hierarchy</h3>

      <p>
        <strong>Root:</strong> {hierarchy.root}
      </p>

      {hierarchy.has_cycle ? (
        <>
          <p className="cycle">🔄 Cycle Detected</p>

          <pre>{JSON.stringify(hierarchy.tree, null, 2)}</pre>
        </>
      ) : (
        <>
          <p>
            <strong>Depth:</strong> {hierarchy.depth}
          </p>

          <Tree data={hierarchy.tree} />

          <details style={{ marginTop: "15px" }}>
            <summary style={{ cursor: "pointer" }}>
              View JSON
            </summary>

            <pre>{JSON.stringify(hierarchy.tree, null, 2)}</pre>
          </details>
        </>
      )}
    </div>
  );
}

export default ResponseCard;