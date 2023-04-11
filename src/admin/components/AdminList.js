import React from "react";
import AdminItem from "./AdminItem";
import "./AdminList.css";

const AdminList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Admin Users Found!</h2>
      </div>
    );
  }

  return (
    <ul className="admin-list">
      {props.items.map((user) => (
        <AdminItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          image={user.image}
          address={user.address}
          dob={user.dob}
          phone={user.phone}
          onDelete={props.onDeleteEmployee}
        />
      ))}
    </ul>
  );
};

export default AdminList;
