import React, { Fragment, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";

import "./AssignTask.css";

const AssignTask = (props) => {
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
      description: {
        value: "",
        isValid: false,
      },
      taskgivendate: {
        value: "",
        isValid: false,
      },
      // status: {
      //   value: "",
      //   isValid: false,
      // },
      dueDate: {
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
          // status: formState.inputs.status.value,
          dueDate: formState.inputs.dueDate.value,
          // priority: formState.inputs.priority.value,
        }),

        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      navigate("/admin");
    } catch (err) {}
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [handleOptions, setHandleOptions] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePriority = (event) => {
    setHandleOptions(event.target.value);
  };

  const [status, setStatus] = useState("Not started");

  function handleStatusChange(event) {
    setStatus(event.target.value);
  }

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
          errorText="Please Enter A Valid Title"
        />
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description (Description of the task)"
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
        {/* <Input
          id="status"
          element="input"
          type="text"
          label="Status"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please Enter A Status"
        /> */}

        <div className="dropdown-container">
          <label htmlFor="status">STATUS:</label>
          <select
            id="status"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {/* <label>
          Status:
          <select value={status} onChange={handleStatusChange}>
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label> */}
        <Input
          id="dueDate"
          element="input"
          type="date"
          label="Due Date"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please Enter A Valid DueDate For This Task"
        />
        {/* <div className="dropdown-container">
          <label htmlFor="priority">STATUS:</label>
          <select id="priority" value={handleOptions} onChange={handlePriority}>
            <option value="">Select an option</option>
            <option value="option1">Low</option>
            <option value="option2">Medium</option>
            <option value="option3">High</option>
          </select>
        </div> */}
        {/* <Input
          id="priority"
          element="input"
          type="text"
          label="Priority"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please Enter A Valid Priority For This Task"
        /> */}
        <Button type="submit" disabled={!formState.isValid}>
          ASSIGN
        </Button>
      </form>
    </Fragment>
  );
};

export default AssignTask;
