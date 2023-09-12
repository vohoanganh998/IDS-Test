import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="manager">Manager</Link>
      </nav>
    </div>
  );
}

export default App;
