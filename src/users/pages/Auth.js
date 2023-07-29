import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/FormElements/Card";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userRole, setUserRole] = useState("employee");

  const [formState, inputHandler, setFormData] = useForm(
    {
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
      // role: {
      //   value: "employee",
      //   isValid: false,
      // },
      phone: {
        value: "",
        isValid: false,
      },
      dateofbirth: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const userStorageHandler = (responseData) => {
    const nowDate = new Date();
    const expirationDate = new Date(
      nowDate.getTime() + responseData.expiresIn * 1000
    );
    const user = {
      ...responseData,
      expiresIn: expirationDate,
    };
    localStorage.setItem("user", JSON.stringify(user));
    auth.login(responseData.userId, responseData.token);
    if (responseData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),

          {
            "Content-Type": "application/json",
          }
        );
        userStorageHandler(responseData);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            address: formState.inputs.address.value,
            phone: formState.inputs.phone.value,
            dateofbirth: formState.inputs.dateofbirth.value,
            password: formState.inputs.password.value,
            role: userRole,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        userStorageHandler(responseData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="authentication">
        <Card>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Login Required</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <>
                <Input
                  element="input"
                  id="name"
                  type="text"
                  label="Your Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  placeholder="Your Name"
                  errorText="Please enter a valid name."
                  onInput={inputHandler}
                />
                <Input
                  element="input"
                  id="address"
                  type="text"
                  label="Address"
                  validators={[VALIDATOR_REQUIRE()]}
                  placeholder="Your Address"
                  errorText="Please enter a valid address."
                  onInput={inputHandler}
                />
                <Input
                  element="input"
                  id="phone"
                  type="text"
                  label="Your Phone Number"
                  validators={[VALIDATOR_REQUIRE()]}
                  placeholder="+977 9841*****"
                  errorText="Please enter a valid phonenumber."
                  onInput={inputHandler}
                />
                <Input
                  element="input"
                  id="dateofbirth"
                  type="date"
                  label="Your Date Birth"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid birth date."
                  onInput={inputHandler}
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
              </>
            )}
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
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid password, at least 5 characters."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          </form>
          <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Auth;
