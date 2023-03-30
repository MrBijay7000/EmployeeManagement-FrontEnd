import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./users/pages/Auth";
import EmployeechangePassword from "./users/pages/ChangePassword";
import Employee from "./users/pages/Employee";
import LeaveRequestUL from "./users/pages/Leave";
import ViewProfile from "./users/pages/ViewProfile";
import ViewTask from "./users/pages/ViewTask";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [token, setToken] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
  }, []);

  // let routes;

  // if (isLoggedIn) {
  //   routes = (
  //     <React.Fragment>
  //       <Route path="/" element={<Employee />} />
  //       <Route path="/view-profile" element={<ViewProfile />} />
  //       <Route path="/:id/employee-details" element={<ViewProfile />} />
  //       <Route path="/view-task" element={<ViewTask />} />
  //       <Route path="/leave" element={<LeaveRequestUL />} />
  //       <Route path="/change-password" element={<EmployeechangePassword />} />
  //       <Route path="/auth" element={<Auth />} />
  //     </React.Fragment>
  //   );
  // } else {
  //   routes = (
  //     <React.Fragment>
  //       <Route path="/" element={<Employee />} />
  //       <Route path="/auth" element={<Auth />} />
  //       <Navigate to="/auth" />
  //     </React.Fragment>
  //   );
  // }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <MainNavigation />
          <main>
            {/* <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/view-profile" element={<AdminViewProfile />} />
            <Route
              path="/employee-details"
              element={<AdminEmployeeDetails />}
            />
            <Route path="/:id/admin-details" element={<AdminDetails />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/leave" element={<LeaveRequestUL />} />
          </Routes> */}
            <Routes>
              <Route path="/" element={<Employee />} />
              <Route path="/view-profile" element={<ViewProfile />} />
              <Route path="/:id/employee-details" element={<ViewProfile />} />
              <Route path="/viewTask" element={<ViewTask />} />
              <Route path="/leave" element={<LeaveRequestUL />} />
              <Route
                path="/change-password"
                element={<EmployeechangePassword />}
              />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
