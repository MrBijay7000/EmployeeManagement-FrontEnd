import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/FormElements/Card";
import "./TaskItem.css";

const TaskItem = (props) => {
  return (
    <li className="place-item ">
      <Card className="place-item__content">
        {/* <Link to={`/viewProfile/${props.id}`}> */}
        {/* <div className="place-item__image">
          <Avatar image={props.image} alt={props.name} />
        </div> */}
        <div className="place-item__info">
          <h2>EmployeeID: {props.employeeId}</h2>
          <h2>Title: {props.title}</h2>
          <h2>Description: {props.description}</h2>
          <h2>Taskgivendate: {props.taskgivendate}</h2>
          <h2>Status: {props.status}</h2>
          <h3>DueDate: {props.dueDate}</h3>
          <h3>Priority: {props.priority}</h3>
        </div>
        {/* </Link> */}
      </Card>
    </li>
  );
};

export default TaskItem;
