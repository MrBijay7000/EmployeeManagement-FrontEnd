import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { Link } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const DU = [
  {
    id: "6417d660355bad37685c366d",
    name: "AA",
    email: "test@test.com",
  },
];

const ViewProfile = (props) => {
  const employeeId = useParams().id;

  const id = DU.find((p) => p.id === employeeId);

  if (!id) {
    return (
      <div className="center">
        <h2>No pl</h2>
      </div>
    );
  }

  return (
    <form>
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validorts={[VALIDATOR_REQUIRE()]}
        errorText="AAA"
        onInput={() => {}}
        value={id.name}
        valid={true}
      />
      <Input
        id="email"
        element="input"
        type="text"
        label="E-Mail"
        validorts={[VALIDATOR_REQUIRE()]}
        errorText="AAA"
        onInput={() => {}}
        value={id.email}
        valid={true}
      />
      <Button type="submit">SUBMIT</Button>
    </form>
  );
};
export default ViewProfile;
