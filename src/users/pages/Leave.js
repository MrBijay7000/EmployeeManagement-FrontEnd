import React, { useState } from "react";

function LeaveRequestUL() {
  const [employeeNo, setEmployeeNo] = useState("");
  const [username, setUsername] = useState("");
  const [post, setPost] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // code to handle form submission
  };

  return (
    <React.Fragment>
      <div style={{ width: "1200px", paddingLeft: "280px" }}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 style={{ paddingLeft: "340px" }} className="panel-title">
              Apply For Leave
            </h3>
          </div>
        </div>
      </div>
      <div className="panel-body">
        <div style={{ paddingLeft: "130px", marginTop: "10px" }}>
          <form className="form-horizontal" onSubmit={handleSubmit} />
          <div className="form-group">
            <label htmlFor="employeeNo" className="col-sm-2 control-label">
              Employee No.
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="employeeNo"
                value={employeeNo}
                placeholder="Enter your Employee No."
                onChange={(event) => setEmployeeNo(event.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="username" className="col-sm-2 control-label">
          Username
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            placeholder="Enter your Username"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="post" className="col-sm-2 control-label">
          Post
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="post"
            value={post}
            placeholder="Enter your Post"
            onChange={(event) => setPost(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="noOfDays" className="col-sm-2 control-label">
          No of Days
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            id="noOfDays"
            value={noOfDays}
            placeholder="Enter No of Days"
            onChange={(event) => setNoOfDays(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="col-sm-2 control-label">
          Description
        </label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            id="description"
            value={description}
            placeholder="Give Valid Reasons"
            rows="5"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default LeaveRequestUL;
