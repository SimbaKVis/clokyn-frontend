import React from 'react';
import './Users.css';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  // Static placeholder data for users
  const users = [
    { firstName: "John", lastName: "Doe", email: "john.doe@example.com", department: "Engineering", teamName: "Dev Team", language: "English", location: "New York", status: "active" },
    { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "Marketing", teamName: "Content Team", language: "Spanish", location: "California", status: "deactivated" }
  ];
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="users-page">
      <div className="left-panel">
        {/* Left panel content for Users page */}
        <button onClick={handleBackClick}>Back</button>
        <button>Create user</button>
        <button>Logout</button>
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
            {users.length === 0 ? (
              <tr><td colSpan="7">No users found</td></tr>
            ) : (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>{user.teamName}</td>
                  <td>{user.language}</td>
                  <td>{user.location}</td>
                  <td>{user.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
