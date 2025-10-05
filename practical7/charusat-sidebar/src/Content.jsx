import React from "react";
import "./Content.css";

function Content({ page }) {
  const renderContent = () => {
    switch (page) {
      case "charusat":
        return (
          <div className="content-box">
            <h1>CHARUSAT University</h1>
            <div className="card-container">
              <div className="card">CSPIT</div>
              <div className="card">DEPSTAR</div>
              <div className="card">PDPIAS</div>
              <div className="card">IIIM</div>
              <div className="card">CMPICA</div>
            </div>
          </div>
        );
      case "depstar":
        return (
          <div className="content-box">
            <h1>DEPSTAR</h1>
            <div className="info-grid">
              <div className="info-box">
                <h3>Faculty</h3>
                <p>60+ faculty members</p>
              </div>
              <div className="info-box">
                <h3>Students</h3>
                <p>1800+ students</p>
              </div>
              <div className="info-box">
                <h3>Branches</h3>
                <ul>
                  <li>Computer Engineering (CE)</li>
                  <li>Computer Science and Engineering (CSE)</li>
                  <li>Information Technology (IT)</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "cse":
        return (
          <div className="content-box">
            <h1>Computer Science and Engineering</h1>
            <p>"Inspiring the Architects of Tomorrow’s Tech"

</p>
          </div>
        );
      default:
        return <h1>Select a section from the sidebar.</h1>;
    }
  };

  return <div className="content">{renderContent()}</div>;
}

export default Content;
