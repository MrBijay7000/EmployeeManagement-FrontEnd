import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./ViewAllEmployees";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import AdminList from "../components/AdminList";

const ViewAllEmployee = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedUsers, setLoadedUsers] = useState();

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

  const taskDeletedHandler = (deletedEmployeeId) => {
    setLoadedUsers((prevEmployee) =>
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
