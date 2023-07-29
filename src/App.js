import React, {
  useState,
  useCallback,
  useEffect,
  Fragment,
  useContext,
} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./users/pages/Auth";
import EmployeechangePassword from "./users/pages/ChangePassword";
import Employee from "./users/pages/Employee";
import LeaveRequestUL from "./users/pages/Leave";
import ViewProfile from "./users/pages/ViewProfile";
import ViewTask from "./users/pages/ViewTask";
import { AuthContext } from "./shared/context/auth-context";

import Admin from "./admin/pages/Admin";
import AssignTask from "./admin/pages/AssignTask";
import AddNewEmployee from "./admin/pages/AddNewEmployee";
import TaskGiven from "./admin/pages/TaskGiven";
import AdminDetails from "./admin/pages/AdminDetails";
import ViewAllEmployee from "./admin/pages/ViewAllEmployees";
import ChangePassword from "./admin/pages/ChangePassword";
import ViewEmployeeDetails from "./admin/pages/ViewEmployeeDetails";

import Dashboard from "./shared/components/Dashboard/Dashboard";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import ViewAllLeave from "./admin/pages/ViewAllLeave";
import AdminUpdateUser from "./admin/pages/UpdateUser";
import ADDNewEmployee from "./admin/pages/NewEmployee";

function App() {
  // const navigate = useNavigate();

  const auth = useContext(AuthContext);
  const [token, setToken] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userId, setUserId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
      setIsLoading(false);
    } else {
      localStorage.removeItem("user");
      setLoggedInUser({});
      setIsLoading(false);
      auth.logout();
    }
  }, [auth, token]);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
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
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        // <p></p>
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
              <MainNavigation
                loggedInUser={loggedInUser}
                // setToken={setToken}
                // setUserId={setUserId}
              />
              <main>
                {/* <Layout /> */}
                <Routes>
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/assignTask" element={<AssignTask />} />
                    <Route
                      path="/addNewEmployee"
                      element={<ADDNewEmployee />}
                    />
                    <Route
                      path="/taskGiventoEmployee"
                      element={<TaskGiven />}
                    />
                    <Route path="/:id/viewProfile" element={<AdminDetails />} />
                    <Route
                      path="/viewAllEmployees"
                      element={<ViewAllEmployee />}
                    />{" "}
                    <Route path="/viewAllLeave" element={<ViewAllLeave />} />
                    <Route
                      path="/:employeesId/viewEmployeeDetails"
                      element={<ViewEmployeeDetails />}
                    />
                    <Route
                      path="/adminChangepassword"
                      element={<ChangePassword />}
                    />
                    <Route
                      path="/update/:employeeId"
                      element={<AdminUpdateUser />}
                    />
                    {/*   
                <Route path="/view-profile" element={<AdminViewProfile />} />
                <Route
                path="/employee-details"
                element={<AdminEmployeeDetails />}
                />
                
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/leave" element={<LeaveRequestUL />} />
              </Routes> */}
                    {/* <Routes> */}
                    <Route path="/employee" element={<Employee />} />
                    {/* <Route
                      path="/employee/viewProfile"
                      element={<ViewProfile />}
                    /> */}
                    <Route
                      path="/viewProfile/:employeeId"
                      element={<ViewProfile />}
                    />
                    <Route path="/viewTask" element={<ViewTask />} />
                    <Route path="/leave" element={<LeaveRequestUL />} />
                    <Route
                      path="/change-password"
                      element={<EmployeechangePassword />}
                    />
                    <Route path="/auth" element={<Auth />} />
                  </>
                </Routes>
              </main>
            </Router>
          </AuthContext.Provider>
        </div>
      )}
    </Fragment>
  );
}

export default App;
