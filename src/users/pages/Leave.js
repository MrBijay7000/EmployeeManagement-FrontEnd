import React, { useState } from "react";
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
      title: {
        value: "",
        isValid: false,
      },
      startDate: {
        value: "",
        isValid: false,
      },
      endDate: {
        value: "",
        isValid: false,
      },
      appliedDate: {
        value: "",
        isValid: false,
      },
      duration: {
        value: "",
        isValid: false,
      },
      reason: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const applyForLeaveHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);

    try {
      const responseData = await sendRequest(
        "http://localhost:5001/api/users/applyForLeave",
        "POST",
        JSON.stringify({
          employeeId: formState.inputs.employeeId.value,
          title: formState.inputs.title.value,
          startDate: formState.inputs.startDate.value,
          endDate: formState.inputs.endDate.value,
          appliedDate: formState.inputs.appliedDate.value,
          duration: formState.inputs.duration.value,
          reason: formState.inputs.reason.value,
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
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please Enter A Valid Title"
      />
      <Input
        id="startDate"
        element="input"
        type="date"
        label="Start Date"
        validators={[VALIDATOR_REQUIRE()]}
        min="2022-01-31"
        max="2025-12-31"
        onInput={inputHandler}
        errorText="Please Enter A Valid StartDate"
      />
      <Input
        id="endDate"
        element="input"
        type="date"
        label="End Date"
        min="2022-01-31"
        max="2025-12-31"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please Enter A Valid EndDate"
      />
      <Input
        id="appliedDate"
        element="input"
        type="date"
        label="Applied Date"
        min="2022-01-31"
        max="2025-12-31"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please Enter A Valid AppliedDate"
      />
      <Input
        id="duration"
        element="input"
        type="number"
        min="0"
        max="2025-12-31"
        label="For How Many Days(duration)"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please Enter A Valid Duration Date"
      />
      <Input
        id="reason"
        element="input"
        type="text"
        label="Reason"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please Enter A Valid Reason"
      />
      {/* <div className="dropdown-container">
        <label htmlFor="options">Select an option:</label>
        <select
          id="options"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="">Select an option</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div> */}

      {/* <Input
        id="status"
        element="textarea"
        type="text"
        label="Reason"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        errorText="Please Enter A Valid Description (At least 5 letters)"
      /> */}

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
