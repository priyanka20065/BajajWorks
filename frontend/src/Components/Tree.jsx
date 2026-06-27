import React from "react";

function Tree({ data }) {
  // Empty tree (used for cycles)
  if (!data || Object.keys(data).length === 0) {
    return <p>No tree available.</p>;
  }

  const renderNode = (node) => {
    return Object.entries(node).map(([key, children]) => (
      <div className="tree-node" key={key}>
        <span className="tree-label">{key}</span>

        {children && Object.keys(children).length > 0 && (
          <div>
            {renderNode(children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="tree-container">
      {renderNode(data)}
    </div>
  );
}

export default Tree;