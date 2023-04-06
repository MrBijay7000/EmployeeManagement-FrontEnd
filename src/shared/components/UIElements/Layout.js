import React from "react";
//import { userMenu } from "../Data/data";
import { Badge, message } from "antd";
// import "../styles/LayoutStyle.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  //logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfull");
    navigate("/login");
  };

  //admin menu
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-sharp fa-solid fa-house",
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "fa-solid fa-user",
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: "fa-solid fa-user",
    },
    {
      name: "Profile",
      path: `/admin/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  //doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-sharp fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Prescription",
      path: "/doctor/prescription",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  //user Menu
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-sharp fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  //menu list
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>followUP</h6>
              <hr />
            </div>
            <div className="menu">
              {sidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-sharp fa-solid fa-arrow-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              {/* <div
                className="greet"
                style={{ display: "flex", alignItems: "center" }}
              >
                <h6 style={{ marginRight: "10px", textTransform: "uppercase" }}>
                  Welcome
                </h6>
              </div> */}
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  overflowCount={9}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-sharp fa-solid fa-bell"></i>
                </Badge>
                {user && (
                  <Link to={`/user/profile/${user.id}`}>{user?.name}</Link>
                )}
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
