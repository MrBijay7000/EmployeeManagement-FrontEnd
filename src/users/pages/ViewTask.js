import React from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import Button from "../../shared/components/FormElements/Button";

const ViewTask = (props) => {
  const [formState, inputHandler] = useForm(
    {
      date: {
        value: "",
        isValid: false,
      },
      day: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <form className="leave">
      <Input
        id="date"
        element="input"
        type="text"
        label="Date"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please Enter A Valid Date"
      />
      <Input
        id="day"
        element="input"
        type="text"
        label="No of days"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please Enter A Number Of Days"
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        errorText="Please Enter A Valid Description"
      />
      <Button type="submit" disabled={!formState.isValid}>
        APPLY
      </Button>
    </form>
  );
};
export default ViewTask;
