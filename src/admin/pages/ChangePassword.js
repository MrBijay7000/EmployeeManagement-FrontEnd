// import React, { useState, useEffect } from "react";
// import Card from "../../shared/components/FormElements/Card";
// import classes from "./ChangePassword.module.css";
// import Button from "../../shared/components/FormElements/Button";

// function ChangePassword(props) {
//   const [enteredEmail, setEnteredEmail] = useState("");
//   const [emailIsValid, setEmailIsValid] = useState();
//   const [enteredPassword, setEnteredPassword] = useState("");
//   const [passwordIsValid, setPasswordIsValid] = useState("");
//   const [formIsValid, setFormIsValid] = useState(false);

//   useEffect(() => {
//     setFormIsValid(
//       enteredEmail.includes("@") && enteredPassword.trim().length > 6
//     );
//   }, [enteredEmail, enteredPassword]);

//   const emailChangeHandler = (event) => {
//     setEnteredEmail(event.target.value);
//   };

//   const passwordChangeHandler = (event) => {
//     setEnteredPassword(event.target.value);
//   };

//   const validateEmailHandler = () => {
//     setEmailIsValid(enteredEmail.includes("@"));
//   };

//   const validatePasswordHandler = () => {
//     setPasswordIsValid(enteredPassword.trim().length > 6);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <Card className={classes.login}>
//       <form onSubmit={submitHandler}>
//         <div
//           className={`${classes.control} ${
//             emailIsValid === false ? classes.invalid : ""
//           }`}
//         >
//           <label htmlFor="email">Old Password</label>
//           <input
//             type="email"
//             id="email"
//             value={enteredEmail}
//             onChange={emailChangeHandler}
//             onBlur={validateEmailHandler}
//           />
//         </div>
//         <div
//           className={`${classes.control} ${
//             passwordIsValid === false ? classes.invalid : ""
//           }`}
//         >
//           <label htmlFor="password">New Password</label>
//           <input
//             type="password"
//             id="password"
//             value={enteredPassword}
//             onChange={passwordChangeHandler}
//             onBlur={validatePasswordHandler}
//           />
//         </div>
//         <div
//           className={`${classes.control} ${
//             passwordIsValid === false ? classes.invalid : ""
//           }`}
//         >
//           <label htmlFor="password">Confirm New Password</label>
//           <input
//             type="password"
//             id="password"
//             value={enteredPassword}
//             onChange={passwordChangeHandler}
//             onBlur={validatePasswordHandler}
//           />
//         </div>
//         <div className={classes.actions}>
//           <Button type="submit" className={classes.btn} disabled={!formIsValid}>
//             Change Password
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// }

// export default ChangePassword;

// components/ChangePasswordForm.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

const ChangePassword = () => {
  const eid = useParams().id;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      oldPassword: {
        value: "",
        isValid: false,
      },
      newPassword: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
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
        `http://localhost:5001/api/admin/changePassword/${eid}`,
        "POST",
        JSON.stringify({
          oldPassword: formState.inputs.oldPassword.value,
          newPassword: formState.inputs.newPassword.value,
          confirmPassword: formState.inputs.confirmPassword.value,
        }),

        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="oldPassword"
        element="input"
        type="password"
        label="Old Password"
        validators={
          [
            /* Add validators if needed */
          ]
        }
        onInput={inputHandler}
      />
      <Input
        id="newPassword"
        element="input"
        type="password"
        label="New Password"
        validators={
          [
            /* Add validators if needed */
          ]
        }
        onInput={inputHandler}
      />
      <Input
        id="confirmPassword"
        element="input"
        type="password"
        label="Confirm New Password"
        validators={
          [
            /* Add validators if needed */
          ]
        }
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Change Password
      </Button>
    </form>
  );
};

export default ChangePassword;
