import React from "react";
import Button from "../../shared/components/FormElements/Button";
import UsersList from "../components/UsersList";

import "./Employee.css";
const Employee = (props) => {
  const USERS = [
    {
      id: "12",
      name: "BIJAY SHRESTHA",
      email: "test@test.com",
      image:
        "https://img.freepik.com/premium-vector/freelance-sticker-logo-icon-vector-man-with-desktop-blogger-with-laptop-icon-vector-isolated-background-eps-10_399089-1098.jpg",
    },
    {
      id: "123",
      name: "BIJAY SHRESTHA",
      email: "test@test.com",
      image:
        "https://img.freepik.com/premium-vector/freelance-sticker-logo-icon-vector-man-with-desktop-blogger-with-laptop-icon-vector-isolated-background-eps-10_399089-1098.jpg",
    },
  ];

  return (
    <div>
      <UsersList items={USERS} />
      <div className="button">
        <Button Link to="/leave">
          APPLY FOR LEAVE
        </Button>
      </div>
    </div>
  );
};
export default Employee;
