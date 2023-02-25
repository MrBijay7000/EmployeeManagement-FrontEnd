import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminViewProfile from "./admin/pages/AdminViewProfile";
import AdminEmployeeDetails from "./admin/pages/ViewEmployeeDetails";
import MainNavigation from "./shared/Navigation/MainNavigation";

function App() {
  return (
    <div className="App">
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/view-profile" element={<AdminViewProfile />} />
            <Route
              path="/employee-details"
              element={<AdminEmployeeDetails />}
            />
          </Routes>
        </main>
      </Router>

      <h1>HELLO</h1>
    </div>
  );
}

export default App;
