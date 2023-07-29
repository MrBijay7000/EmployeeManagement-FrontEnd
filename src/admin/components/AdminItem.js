import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Modal from "../../shared/components/UIElements/Modal";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/FormElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./AdminItem.css";

const AdminItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5001/api/admin/employee/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <div>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <Link to={`/${props.id}/viewEmployeeDetails`}>
            <div className="place-item__image">
              <Avatar image={props.image} alt={props.name} />
            </div>
            <div className="place-item__info">
              <h2>Name: {props.name}</h2>
              <h3>Email: {props.email}</h3>
              <h3>Address: {props.address}</h3>
              <h3>Date of Birth: {props.dob}</h3>
              <h3>Phone: {props.phone}</h3>
            </div>
          </Link>
          <div className="place-item__actions">
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>

            <Button to={`/update/${props.id}`}>EDIT</Button>
          </div>
        </Card>
      </li>
    </div>
  );
};

export default AdminItem;
