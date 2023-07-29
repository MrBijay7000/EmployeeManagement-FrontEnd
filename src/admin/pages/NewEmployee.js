// components/ChangePasswordForm.js
import React, { useState, Fragment } from "react";

import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import "./AssignTask.css";

const ADDNewEmployee = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("employee");

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      dateofbirth: {
        value: "",
        isValid: false,
      },
      hireDate: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5001/api/admin/addEmployes",
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          address: formState.inputs.address.value,
          phone: formState.inputs.phone.value,
          dateofbirth: formState.inputs.dateofbirth.value,
          hireDate: formState.inputs.date.value,
          role: userRole,
        }),

        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (err) {}
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <Input
    //     id="oldPassword"
    //     element="input"
    //     type="password"
    //     label="Old Password"
    //     validators={
    //       [
    //         /* Add validators if needed */
    //       ]
    //     }
    //     onInput={inputHandler}
    //   />
    //   <Input
    //     id="newPassword"
    //     element="input"
    //     type="password"
    //     label="New Password"
    //     validators={
    //       [
    //         /* Add validators if needed */
    //       ]
    //     }
    //     onInput={inputHandler}
    //   />
    //   <Input
    //     id="confirmPassword"
    //     element="input"
    //     type="password"
    //     label="Confirm New Password"
    //     validators={
    //       [
    //         /* Add validators if needed */
    //       ]
    //     }
    //     onInput={inputHandler}
    //   />
    //   <Button type="submit" disabled={!formState.isValid}>
    //     Change Password
    //   </Button>
    // </form>
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <form className="leave" onSubmit={handleSubmit}>
        {isLoading}
        <Input
          id="name"
          element="input"
          type="text"
          label="Employee Name"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please Enter A Valid Employee Name"
        />
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please Enter A Valid Employee Address"
        />
        <Input
          id="phone"
          element="input"
          type="number"
          label="Phone Number"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please Enter A Valid Employee Phone Number"
        />
        <Input
          id="date"
          element="input"
          type="date"
          label="Hire Date"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please Enter A Valid Employee Hire Date"
        />
        <Input
          id="dateofbirth"
          element="input"
          type="date"
          label="Date of Birth"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please Enter A Valid Employee Date of Birth"
        />
        <div className="form-control">
          <label>Role </label>
          <select
            className="form-control"
            required
            onChange={(e) => {
              setUserRole(e.target.value);
            }}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD
        </Button>
      </form>
    </Fragment>
  );
};

export default ADDNewEmployee;
