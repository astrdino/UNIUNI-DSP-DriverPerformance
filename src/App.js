import React, { Component, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import Login from "./components/LoginPage";
import DSPLogin from "./components/DSPLoginPage";
import Dashboard from "./components/DashboardPage";
import DSPMain from "./components/DSPMainPage";
import ProtectedRoute from "./ProtectedRoute";
//import ProtectedRoute_DSP from "./ProtectedRoute_DSP";
import ProtectedRoute_LoginPrev from "./ProtectedRoute_LoginPrev";
// import PrivateRoute from './PrivateRoute';

import { AuthProvider } from "./AuthContext";

function App() {
  const [cell, setCell] = useState();

  useEffect(() => {
    const fetchExcelFile = async () => {
      const response = await fetch("/file/test.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
        type: "array",
      });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      if (worksheet["K1"]) {
        // Assuming you meant 'A1'. Replace 'A1' with the correct cell reference if different
        setCell(worksheet["K1"].v); // Update state
      }
    };

    fetchExcelFile();
  }, []);

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       test page i do change {cell}
  //     </header>
  //   </div>
  // );

  // return(<div>
  //   <Home/>
  // </div>)

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute_LoginPrev>
                <Login />
              </ProtectedRoute_LoginPrev>
            }
          />
          {/* <Route path="/DSPlogin" element={<DSPLogin />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DSPMain"
            element={
              <ProtectedRoute>
                <DSPMain />
              </ProtectedRoute>
            }
          />

          {/* <Route path="/DSPMain" element={<DSPMain/>} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
