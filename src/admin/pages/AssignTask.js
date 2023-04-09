import React, { Fragment } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./AssignTask.css";

const AssignTask = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
      description: {
        value: "",
        isValid: false,
      },
      taskgivendate: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const taskgivenHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:5001/api/admin/createTask",
        "POST",
        JSON.stringify({
          employeeId: formState.inputs.employeeId.value,
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          taskgivendate: formState.inputs.taskgivendate.value,
          status: formState.inputs.status.value,
        }),

        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <form className="assigntask" onSubmit={taskgivenHandler}>
        {isLoading}
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
          errorText="Please Enter A Valid Date"
        />
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please Enter A Valid Description (At least 5 letters)"
        />
        <Input
          id="taskgivendate"
          element="input"
          type="date"
          label="Task Given Date"
          validators={[VALIDATOR_REQUIRE()]}
          min="2022-01-31"
          max="2025-12-31"
          onInput={inputHandler}
          errorText="Please Enter A Valid Date"
        />
        <Input
          id="status"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please Enter A Valid Description (At least 5 letters)"
        />

        <Button type="submit" disabled={!formState.isValid}>
          ASSIGN
        </Button>
      </form>
    </Fragment>
  );
};

export default AssignTask;
