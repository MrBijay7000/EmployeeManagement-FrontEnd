import React from "react";

import { Link } from "react-router-dom";
import { Form, Input, message } from "antd";

const ViewProfile = (props) => {
  return (
    <div className="form-container">
      <Form layout="vertical" className="register-form">
        <h3 className="text-center">Login Form</h3>
        <Form.Item label="Email" name="email">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not registered yet?
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};
export default ViewProfile;
