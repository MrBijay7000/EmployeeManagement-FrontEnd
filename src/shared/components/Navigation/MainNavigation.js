import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Backdrop from "../UIElements/Backdrop";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { AuthContext } from "../../context/auth-context";

function MainNavigation({ loggedInUser }) {
  const { role } = loggedInUser;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(loggedInUser).length !== 0) {
      const { expiresIn } = loggedInUser;
      const now = new Date();
      const isExpirationTime = new Date(expiresIn).getTime() - now.getTime();
      if (isExpirationTime > 0) {
        auth.token = loggedInUser.token;
        auth.userId = loggedInUser.userId;
        auth.login(loggedInUser.userId, loggedInUser.token);
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/employee");
        }
      } else {
        auth.logout();
        localStorage.removeItem("user");
        navigate("/");
      }
    } else {
      auth.logout();
      navigate("/");
    }
  }, [loggedInUser]);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link
            to={
              Object.keys(loggedInUser).length !== 0
                ? role === "admin"
                  ? "/admin"
                  : "/employee"
                : "/"
            }
          >
            {Object.keys(loggedInUser).length !== 0
              ? role === "admin"
                ? "Admin "
                : "Employee "
              : ""}
            Dashboard
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks loggedInUser={loggedInUser} />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
