import React, { useState, useContext, useEffect } from "react";

import Card from "../../shared/components/FormElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./Auth.css";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userRole, setUserRole] = useState("employee");
  const [user, setUser] = useState({});
  // const { decodedToken, isExpired } = useJwt(loggedInUser.token);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    // const { decodedToken, isExpired } = useJwt(loggedInUser.token);
    // console.log({ decodedToken, isExpired });
    if (loggedInUser) {
      // setFormData(
      //   {
      //     ...formState.inputs,
      //     name: {
      //       value: "",
      //       isValid: false,
      //     },
      //     email: {
      //       value: loggedInUser.email,
      //       isValid: false,
      //     },
      //   },
      //   false
      // );
      // loginUser();
      setUser(loggedInUser);
    }
  }, []);

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
      // role: {
      //   value: "employee",
      //   isValid: false,
      // },
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

  const loginUser = async () => {
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
    console.log({ responseData });
    localStorage.setItem("user", JSON.stringify(responseData));
    auth.login(responseData.userId, responseData.token);
    if (responseData.role == "admin") {
      navigate("/");
    } else {
      navigate("/employee");
    }
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        loginUser();
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            role: userRole,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
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
                placeholder="name@example.com"
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <div className="form-control">
                <label>Role </label>
                <select
                  className="form-control"
                  required
                  onChange={(e) => {
                    console.log({ value: e.target.value });
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
    </React.Fragment>
  );
};

export default Auth;

// import React, { useState, useContext } from "react";

// import Card from "../../shared/components/UIElements/Card";
// import Input from "../../shared/components/FormElements/Input";
// import Button from "../../shared/components/FormElements/Button";
// import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// // import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import {
//   VALIDATOR_EMAIL,
//   VALIDATOR_MINLENGTH,
//   VALIDATOR_REQUIRE,
// } from "../../shared/util/validators";
// import { useForm } from "../../shared/hooks/form-hook";
// import { useHttpClient } from "../../shared/hooks/http-hook";
// import { AuthContext } from "../../shared/context/auth-context";
// import "./Auth.css";

// const Auth = () => {
//   const auth = useContext(AuthContext);
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();

//   const [formState, inputHandler, setFormData] = useForm(
//     {
//       email: {
//         value: "",
//         isValid: false,
//       },
//       password: {
//         value: "",
//         isValid: false,
//       },
//     },
//     false
//   );

//   const switchModeHandler = () => {
//     if (!isLoginMode) {
//       setFormData(
//         {
//           ...formState.inputs,
//           name: undefined,
//         },
//         formState.inputs.email.isValid && formState.inputs.password.isValid
//       );
//     } else {
//       setFormData(
//         {
//           ...formState.inputs,
//           name: {
//             value: "",
//             isValid: false,
//           },
//         },
//         false
//       );
//     }
//     setIsLoginMode((prevMode) => !prevMode);
//   };

//   const authSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (isLoginMode) {
//       try {
//         const responseData = await sendRequest(
//           "http://localhost:5001/api/users/login",
//           "POST",
//           JSON.stringify({
//             email: formState.inputs.email.value,
//             password: formState.inputs.password.value,
//           }),
//           {
//             "Content-Type": "application/json",
//           }
//         );
//         auth.login(responseData.user.id);
//       } catch (err) {}
//     } else {
//       try {
//         const responseData = await sendRequest(
//           "http://localhost:5000/api/users/signup",
//           "POST",
//           JSON.stringify({
//             name: formState.inputs.name.value,
//             email: formState.inputs.email.value,
//             password: formState.inputs.password.value,
//           }),
//           {
//             "Content-Type": "application/json",
//           }
//         );

//         auth.login(responseData.user.id);
//       } catch (err) {}
//     }
//   };

//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//       <Card className="authentication">
//         {isLoading}
//         <h2>Login Required</h2>
//         <hr />
//         <form onSubmit={authSubmitHandler}>
//           {!isLoginMode && (
//             <Input
//               element="input"
//               id="name"
//               type="text"
//               label="Your Name"
//               validators={[VALIDATOR_REQUIRE()]}
//               errorText="Please enter a name."
//               onInput={inputHandler}
//             />
//           )}
//           <Input
//             element="input"
//             id="email"
//             type="email"
//             label="E-Mail"
//             validators={[VALIDATOR_EMAIL()]}
//             errorText="Please enter a valid email address."
//             onInput={inputHandler}
//           />
//           <Input
//             element="input"
//             id="password"
//             type="password"
//             label="Password"
//             validators={[VALIDATOR_MINLENGTH(5)]}
//             errorText="Please enter a valid password, at least 5 characters."
//             onInput={inputHandler}
//           />
//           <Button type="submit" disabled={!formState.isValid}>
//             {isLoginMode ? "LOGIN" : "SIGNUP"}
//           </Button>
//         </form>
//         <Button inverse onClick={switchModeHandler}>
//           SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
//         </Button>
//       </Card>
//     </React.Fragment>
//   );
// };

// export default Auth;
