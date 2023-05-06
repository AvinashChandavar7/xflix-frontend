import React from 'react'
import { Routes, Route } from "react-router-dom";
import { LandingPage, VideoPage } from "./components";

export const config = {
  // endpoint: "https://31de3a79-7c56-41d7-9d26-f867a2a464a1.mock.pstmn.io/v1",
  endpoint: `https://lazy-lime-foal-fez.cyclic.app/v1`
};

const App = () => {
  return (

    <React.StrictMode>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </React.StrictMode>

  );
}

export default App
