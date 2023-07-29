import React, { useEffect, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Employee.css";
const Employee = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUSers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/users"
        );

        setLoadedUSers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div>
      <div>
        <img src="https://blog.vantagecircle.com/content/images/2020/08/Employee-recognition.png" />
      </div>
      <ErrorModal error={error} onClear={clearError} />
      {loadedUsers && <UsersList items={loadedUsers} />}

      <div className="button">
        <Button Link to="/leave">
          APPLY FOR LEAVE
        </Button>
      </div>
      <div className="button">
        <Button Link to="/viewTask">
          VIEW TASK
        </Button>
      </div>
    </div>
  );
};

export default Employee;
