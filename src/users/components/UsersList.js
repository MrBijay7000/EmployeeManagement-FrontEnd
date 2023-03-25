import React from "react";
import UserDetails from "./UserItem";
import "./UsersList.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Employee Users Found!</h2>
      </div>
    );
  }

  return (
    <ul className="user-list">
      {props.items.map((user) => (
        <UserDetails
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          image={user.image}
        />
      ))}
    </ul>
  );
};

export default UsersList;
