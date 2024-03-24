import React from "react";
// import AddCourt from "./components/AddCourt";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashborad";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthForm/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      {/* <AddCourt></AddCourt> */}
    </>
  );
}

export default App;
