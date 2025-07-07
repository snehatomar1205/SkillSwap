// src/components/Tabs.jsx
import React from "react";
import "../styles/Tabs.css";

const Tabs = ({ activeTab, onChange, tabs }) => {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-button ${activeTab === tab ? "active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
