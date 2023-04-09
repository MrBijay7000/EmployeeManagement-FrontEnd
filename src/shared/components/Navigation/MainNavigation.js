import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Backdrop from "../UIElements/Backdrop";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import LoadingSpinner from "../UIElements/LoadingSpinner";

function MainNavigation({ loggedInUser }) {
  const { role } = loggedInUser;
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
