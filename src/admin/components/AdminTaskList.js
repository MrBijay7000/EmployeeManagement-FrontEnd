import React from "react";
import TaskItem from "./AdminTaskItem";
import "./AdminTaskList.css";

const AdminTaskList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Tasks Found!</h2>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {props.items.map((user) => (
        <TaskItem
          key={user.id}
          title={user.title}
          description={user.description}
          startDate={user.startDate}
          endDate={user.endDate}
          status={user.status}
        />
      ))}
    </ul>
  );
};

export default AdminTaskList;
