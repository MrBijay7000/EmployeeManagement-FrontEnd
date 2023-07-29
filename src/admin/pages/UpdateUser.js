import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./UpdateUser.css";

const AdminUpdateUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const employeeId = useParams().employeeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
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
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5001/api/users/${employeeId}`
        );
        console.log({ responseData });
        setLoadedUser(responseData.user);
        setFormData(
          {
            name: {
              value: responseData.user.name,
              isValid: true,
            },
            address: {
              value: responseData.user.address,
              isValid: true,
            },
            phone: {
              value: responseData.user.phone,
              isValid: true,
            },
            dateofbirth: {
              value: responseData.user.dateofbirth,
              isValid: true,
            },
            email: {
              value: responseData.user.email,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, employeeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5001/api/users/${employeeId}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          address: formState.inputs.address.value,
          phone: formState.inputs.phone.value,
          dateofbirth: formState.inputs.dateofbirth.value,
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  if (!loadedUser && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find User!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUser && (
        <form className="profile" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Name."
            onInput={inputHandler}
            value={loadedUser.name}
          />
          <Input
            id="address"
            element="input"
            label="Address"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid Address (5 Letters)"
            onInput={inputHandler}
            value={loadedUser.address}
          />
          <Input
            id="phone"
            element="input"
            label="Phone"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Phone Number"
            onInput={inputHandler}
            value={loadedUser.phone}
          />
          <Input
            id="dateofbirth"
            element="input"
            label="Date of Birth"
            type="date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Date of Birth"
            onInput={inputHandler}
            value={loadedUser.dateofbirth}
          />
          <Input
            id="email"
            element="input"
            label="Email"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Email Address"
            onInput={inputHandler}
            value={loadedUser.email}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE USER
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default AdminUpdateUser;
