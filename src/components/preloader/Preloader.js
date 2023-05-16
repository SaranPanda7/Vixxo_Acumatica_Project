import "./style.css";
import React from "react";

function Preloader() {
  return (
    <div className="h-100" style={{ backdropFilter: "blur(5px)" }}>
      <div className="d-flex h-100 justify-content-center p-5 align-items-center">
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
