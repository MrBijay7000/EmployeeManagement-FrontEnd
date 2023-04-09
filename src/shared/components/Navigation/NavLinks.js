import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = ({ loggedInUser }) => {
  const { role } = loggedInUser;
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  // const [loggedInUser, setLoggedInUser] = useState({});
  // // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     setLoggedInUser(user);
  //   }
  //   // setIsLoading(false);
  // }, []);

  const logout = () => {
    // setIsLoading(false);
    auth.logout();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* {isLoading ? (
        <LoadingSpinner />
      ) : ( */}
      <ul className="nav-links">
        <li>
          <NavLink
            to={
              Object.keys(loggedInUser).length !== 0
                ? role === "admin"
                  ? "/admin"
                  : "/employee"
                : "/"
            }
          >
            Home
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/view-profile">View Profile</NavLink>
          </li>
        )}

        {auth.isLoggedIn && role === "admin" ? (
          <li>
            <NavLink to="/view-employees">View Employees</NavLink>
          </li>
        ) : (
          auth.isLoggedIn && (
            <li>
              <NavLink to="/view-task">My Task</NavLink>
            </li>
          )
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/change-password">Change Password</NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <button onClick={logout}>LOGOUT</button>/
          </li>
        )}
      </ul>
      {/* )} */}
    </>
  );
};

export default NavLinks;
