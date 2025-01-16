import React, { useState, useEffect } from 'react';
import './Users.css';
import { useNavigate } from 'react-router-dom';
import CreateUserForm from '../components/CreateUserForm'; // Import the CreateUserForm component

const Users = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [showCreateUserForm, setShowCreateUserForm] = useState(false); // State to toggle form visibility
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const navigate = useNavigate();

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.log
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCreateUserClick = () => {
    setShowCreateUserForm(true); // Show the form when "Create user" button is clicked
  };

  const handleRowClick = (userId) => {
    navigate(`/editUser/${userId}`); // Navigate to the edit page for the selected user
  };

  return (
    <div className="users-page">
      <div className="left-panel">
        {/* Left panel content for Users page */}
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleCreateUserClick}>Create user</button>
        <button>Logout</button>
      </div>

      <div className="main-content">
        <h2>Users List</h2>

        {/* Conditionally render the CreateUserForm */}
        {showCreateUserForm ? (
          <CreateUserForm />
        ) : (
          <>
            {loading && <p>Loading users...</p>}
            {error && <p>Error: {error}</p>}

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
                  users.map((user) => (
                    <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.emailAddress}</td>
                      <td>{user.departmentId}</td>
                      <td>{user.teamId}</td>
                      <td>{user.language}</td>
                      <td>{user.location}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
