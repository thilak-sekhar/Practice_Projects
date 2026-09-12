import React, { useState } from "react";
import "./App.css";
import pickupLines from "./pickuplines";


function App() {
  const [line, setLine] = useState("");
  const [Password, setPassword] = useState(false);

  
  const generateLine = () => {
    const random = pickupLines[Math.floor(Math.random() * pickupLines.length)];
    setLine(random);
  };

  const copyToClipboard = () => {
    if (line) {
      navigator.clipboard.writeText(line);
      alert("Pickup line copied to clipboard! 💖");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const password = e.target.querySelector("input").value;
    if (password === "DefaultPassword") {
      setPassword(true);
      alert("Welcome Dear");
    } else {
      alert("Incorrect Password! Please try again.");
    }
  }

  return (
    <div className="app-container">
      {
        !Password && (
          <div className="line-box">
            <div>Who Is This?</div>
            <form onSubmit={handleLogin}>
              <input style={{ border: '2px solid #ffb6c1', borderRadius: '10px', padding: '0.8rem', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }} type="text" name="password" placeholder="Password : DefaultPassword" autoComplete="off"/>
              <button style={{ backgroundColor: '#ff66a3', color: 'white', border: 'none', borderRadius: '12px', padding: '0.8rem 1.5rem', margin: '0 10px', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.3s ease, transform 0.2s', boxShadow: '0 4px 12px rgba(255, 105, 180, 0.3)' }}>OPEN</button>
            </form>
          </div>
        )}


      { Password &&
      (<div>
        <h1>💘 HEY DEAR 💘</h1>
        <div className="line-box">{line ? `"${line}"` : "Click the below button💖"}</div>
        <div className="button-group">
          <button onClick={generateLine}>💌 Click Here   💌</button>
          <button onClick={copyToClipboard} disabled={!line}>📋Copy</button>
        </div>
      </div>)}
    </div>
  );
}

export default App;
