import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/FormElements/Card";
import "./UserItem.css";

const UserDetails = (props) => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <Link to={`/viewProfile/${props.id}`}>
          <div className="place-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="place-item__info">
            <h2>{props.name}</h2>
            <h3>{props.email}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserDetails;
