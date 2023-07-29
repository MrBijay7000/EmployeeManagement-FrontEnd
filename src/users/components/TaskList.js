import React from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Tasks Found!</h2>
      </div>
    );
  }

  return (
    <ul className="admin-list">
      {props.items.map((user) => (
        <TaskItem
          key={user.id}
          id={user.id}
          employeeId={user.employeeId}
          title={user.title}
          description={user.description}
          taskgivendate={user.taskgivendate}
          status={user.status}
          dueDate={user.dueDate}
          priority={user.priority}
        />
      ))}
    </ul>
  );
};

export default TaskList;
