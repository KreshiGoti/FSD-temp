import React from "react";

function Sidebar({ isOpen, toggleSidebar, handleNavigation }) {
  return (
    <div>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button onClick={() => handleNavigation("charusat")}>CHARUSAT</button>
        <button onClick={() => handleNavigation("depstar")}>DEPSTAR</button>
        <button onClick={() => handleNavigation("cse")}>CSE</button>
      </div>
    </div>
  );
}

export default Sidebar;
