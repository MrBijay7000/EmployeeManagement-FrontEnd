import React, { Fragment, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import AdminList from "../components/AdminList";

const Admin = (propos) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [loadedAdmin, setLoadedAdmin] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/admin"
        );

        setLoadedAdmin(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedAdmin && <AdminList items={loadedAdmin} />}
      <div className="button">
        <Button Link to="/assignTask">
          ASSIGN TASK
        </Button>
      </div>
      <div className="button">
        <Button Link to="/addNewEmployee">
          ADD NEW EMPLOYEE
        </Button>
      </div>
      <div className="button">
        <Button Link to="/taskGiventoEmployee">
          VIEW TASK GIVEN TO EMPLOYEE
        </Button>
      </div>
    </Fragment>
  );
};
export default Admin;
