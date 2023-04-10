import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";
import "./ViewAllEmployees";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import AdminList from "../components/AdminList";

const ViewAllEmployee = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedAdmin, setLoadedAdmin] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const [loadedTasks, setLoadedTasks] = useState();

  const navigate = useNavigate();

  // const employeeId = useParams().employeeId;
  // console.log({ employeeId });
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:5001/api/users/${employeeId}`
  //       );
  //       setLoadedUsers(responseData.user);
  //     } catch (err) {}
  //   };
  //   fetchUsers();
  // }, [sendRequest, employeeId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedUsers && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find employee!</h2>
        </Card>
      </div>
    );
  }

  // const okayFormHandler = (event) => {
  //   event.preventDefault();
  //   navigate("/employee");
  // };
  const taskDeletedHandler = (deletedEmployeeId) => {
    setLoadedTasks((prevEmployee) =>
      prevEmployee.filter((employee) => employee.id !== deletedEmployeeId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedUsers && (
        <AdminList items={loadedUsers} onDeleteEmployee={taskDeletedHandler} />
      )}

      {/* <form className="profile">
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validorts={[VALIDATOR_REQUIRE()]}
          errorText="AAA"
          onInput={() => {}}
          value={loadedUsers.name}
          initialValid={true}
        />
        <Input
          id="email"
          element="input"
          type="text"
          label="E-Mail"
          validorts={[VALIDATOR_REQUIRE()]}
          errorText="AAA"
          onInput={() => {}}
          value={loadedUsers.email}
          initialValid={true}
        />
        <div>
          <Button type="submit" onClick={okayFormHandler}>
            OKAY
          </Button>
          <Button type="submit" onClick={okayFormHandler}>
            DELETE
          </Button>
        </div>
      </form> */}
    </React.Fragment>
  );
};
export default ViewAllEmployee;
