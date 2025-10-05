import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState("charusat");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="App">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        handleNavigation={handleNavigation}
      />
      <Content page={page} />
    </div>
  );
}

export default App;
