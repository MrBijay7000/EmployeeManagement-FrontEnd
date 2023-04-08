import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/FormElements/Card";
import "./AdminItem.css";

const AdminItem = (props) => {
  return (
    <li className="admin-item">
      <Card className="admin-item__content">
        <Link to={`/${props.id}/admin-details`}>
          <div className="admin-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="admin-item__info">
            <h2>{props.name}</h2>
            <h3>{props.email}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default AdminItem;
