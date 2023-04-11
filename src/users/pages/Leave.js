import React from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import "./Leave.css";

const ApplyForLeave = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      employeeId: {
        value: "",
        isValid: false,
      },
      sdate: {
        value: "",
        isValid: false,
      },
      edate: {
        value: "",
        isValid: false,
      },
      adate: {
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

  const applyForLeaveHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);

    try {
      const responseData = await sendRequest(
        "http://localhost:5001/api/users/applyForLeave",
        "POST",
        JSON.stringify({
          employeeId: formState.inputs.employeeId.value,
          startDate: formState.inputs.sdate.value,
          endDate: formState.inputs.edate.value,
          appliedDate: formState.inputs.adate.value,
          reason: formState.inputs.description.value,
        }),

        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  const applyFormHaandler = () => {
    navigate("/employee");
  };

  return (
    <form className="leave" onSubmit={applyForLeaveHandler}>
      <Input
        id="employeeId"
        element="input"
        type="text"
        label="EmployeeID"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please Enter A Valid Employee Id"
      />
      <Input
        id="sdate"
        element="input"
        type="date"
        label="Start Date"
        validators={[VALIDATOR_REQUIRE()]}
        min="2022-01-31"
        max="2025-12-31"
        onInput={inputHandler}
        errorText="Please Enter A Valid Date"
      />
      <Input
        id="edate"
        element="input"
        type="date"
        label="End Date"
        validators={[VALIDATOR_REQUIRE()]}
        min="2022-01-31"
        max="2025-12-31"
        onInput={inputHandler}
        errorText="Please Enter A Valid Date"
      />
      <Input
        id="adate"
        element="input"
        type="date"
        label="Apply Date"
        validators={[VALIDATOR_REQUIRE()]}
        min="2022-01-31"
        max="2025-12-31"
        onInput={inputHandler}
        errorText="Please Enter A Valid Date"
      />

      <Input
        id="description"
        element="textarea"
        type="text"
        label="Reason"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        errorText="Please Enter A Valid Description (At least 5 letters)"
      />

      <Button
        type="submit"
        disabled={!formState.isValid}
        onClick={applyFormHaandler}
      >
        APPLY
      </Button>
    </form>
  );
};

export default ApplyForLeave;
