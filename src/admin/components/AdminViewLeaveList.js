import React from "react";
import AdminViewLeaveItem from "./AdminViewLeaveItem";
import "./AdminTaskList.css";

const AdminViewLeaveList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Leave Found!</h2>
      </div>
    );
  }

  return (
    <ul className="admin-list">
      {props.items.map((user) => (
        <AdminViewLeaveItem
          key={user.id}
          id={user.id}
          title={user.title}
          employeeId={user.employeeId}
          reason={user.reason}
          startDate={user.startDate}
          endDate={user.endDate}
          appliedDate={user.appliedDate}
          duration={user.duration}
          status={user.status}
          onDelete={props.onDeleteTask}
        />
      ))}
    </ul>
  );
};

export default AdminViewLeaveList;
