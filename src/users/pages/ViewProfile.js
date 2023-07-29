import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";
import "./ViewProfile.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ViewProfile = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const navigate = useNavigate();

  const employeeId = useParams().employeeId;
  console.log({ employeeId });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5001/api/users/${employeeId}`
        );
        setLoadedUsers(responseData.user);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, employeeId]);
  console.log({ loadedUsers });

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedUsers) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find employee!</h2>
        </Card>
      </div>
    );
  }

  const okayFormHandler = (event) => {
    event.preventDefault();
    navigate("/employee");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="profile">
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
          id="name"
          element="input"
          type="text"
          label="Address"
          validorts={[VALIDATOR_REQUIRE()]}
          errorText="AAA"
          onInput={() => {}}
          value={loadedUsers.address}
          initialValid={true}
        />
        <Input
          id="name"
          element="input"
          type="text"
          label="Phone"
          validorts={[VALIDATOR_REQUIRE()]}
          errorText="AAA"
          onInput={() => {}}
          value={loadedUsers.phone}
          initialValid={true}
        />
        <Input
          id="name"
          element="input"
          type="text"
          label="Date of Birth"
          validorts={[VALIDATOR_REQUIRE()]}
          errorText="AAA"
          onInput={() => {}}
          value={loadedUsers.dateofbirth}
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
        <Input
          id="email"
          element="input"
          type="date"
          label="Hire Date"
          validorts={[VALIDATOR_REQUIRE()]}
          errorText="AAA"
          onInput={() => {}}
          value={loadedUsers.hireDate}
          initialValid={true}
        />
        <Input
          id="email"
          element="textarea"
          type="textarea"
          label="Image"
          validorts={[VALIDATOR_REQUIRE()]}
          errorText="AAA"
          onInput={() => {}}
          value={loadedUsers.image}
          initialValid={true}
        />
        <Input
          id="email"
          element="input"
          type="text"
          label="Role"
          validorts={[VALIDATOR_REQUIRE()]}
          errorText="AAA"
          onInput={() => {}}
          value={loadedUsers.role}
          initialValid={true}
        />
        <Button type="submit" onClick={okayFormHandler}>
          OKAY
        </Button>
      </form>
    </React.Fragment>
  );
};
export default ViewProfile;
