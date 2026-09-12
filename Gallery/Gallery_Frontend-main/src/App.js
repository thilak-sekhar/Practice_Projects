import React, { useState } from "react";
import Login from "./Login";
import Gallery from "./Gallery";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!loggedIn ? (
        <Login onSuccess={() => setLoggedIn(true)} />
      ) : (
        <Gallery />
      )}
    </div>
  );
}
