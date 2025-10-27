import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmailViewer from "./pages/EmailViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/emails" element={<EmailViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
