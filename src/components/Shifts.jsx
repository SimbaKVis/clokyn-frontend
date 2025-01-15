import React from 'react';
import './Users.css';

const Users = () => {
  // Placeholder data (replace this with actual data later)
  const users = [
    { firstName: "John", lastName: "Doe", email: "john.doe@example.com", department: "", teamName: "", language: "", location: "", status: "active" },
    { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "", teamName: "", language: "", location: "", status: "deactivated" }
  ];

  return (
    <div className="users-page">
      <div className="left-panel">
        {/* Left panel content */}
      </div>
      <div className="main-content">
        <h2>Users List</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Address</th>
              <th>Department</th>
              <th>Team Name</th>
              <th>Language</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department || "N/A"}</td>
                <td>{user.teamName || "N/A"}</td>
                <td>{user.language || "N/A"}</td>
                <td>{user.location || "N/A"}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
