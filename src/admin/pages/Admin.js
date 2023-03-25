import React from "react";

import AdminList from "../components/AdminList";

const Admin = (propos) => {
  const USERS = [
    {
      id: "12",
      name: "BIJAY",
      email: "test@test.com",
      image:
        "https://img.freepik.com/premium-vector/freelance-sticker-logo-icon-vector-man-with-desktop-blogger-with-laptop-icon-vector-isolated-background-eps-10_399089-1098.jpg",
    },
  ];

  return <AdminList items={USERS} />;
};
export default Admin;
