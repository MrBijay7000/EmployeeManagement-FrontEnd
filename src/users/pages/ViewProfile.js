import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./ViewProfile.css";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const DU = [
  {
    id: "641e67006816b3968874279b",
    name: "AA",
    email: "test@test.com",
  },
];

const ViewProfile = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  const employeeId = useParams().eid;

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

  if (!loadedUsers) {
    return (
      <div className="center">
        <h2>No pl</h2>
      </div>
    );
  }

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
          initialValue={loadedUsers.name}
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
          initialValue={loadedUsers.email}
          initialValid={true}
        />
        <Button type="submit">OKAY</Button>
      </form>
    </React.Fragment>
  );
};
export default ViewProfile;
