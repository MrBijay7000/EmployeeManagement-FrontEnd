import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import AdminViewLeaveList from "../components/AdminViewLeaveList";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ViewLeave from "../components/ViewLeave";

const AdminDetails = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/admin"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedUsers && <AdminViewLeaveList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default AdminDetails;
