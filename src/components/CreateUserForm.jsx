// frontend/src/components/CreateUserForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateUserForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    departmentId: '',
    teamId: '',
    role: 'agent',
    language: 'English',
    location: '',
    status: true
  });
  
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResponse = await axios.get('http://localhost:5000/api/departments');
        setDepartments(deptResponse.data); 

        const teamResponse = await axios.get('http://localhost:5000/api/teams');
        setTeams(teamResponse.data);
      } catch (error) {
        console.error('Error fetching teams or deprtments:', error);
      }
    };
    
    fetchData();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formDataToSend = {
        ...formData,
        departmentId: parseInt(formData.departmentId, 10) // Ensure this is an integer
      };

      const response = await axios.post('http://localhost:5000/api/users', formDataToSend);
      console.log('User was created succesfully:', response.data);
      onClose(); 
    } catch (error) {
      console.error('could not create user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-user-form">
      <h2>Create User</h2>

      {/* Form fields */}
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="emailAddress">Email</label>
      <input
        type="emailAddress"
        id="emailAddress"
        name="emailAddress"
        value={formData.Address}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />
    
      <label htmlFor="language">Language</label>
      <select
        id="language"
        name="language"
        value={formData.language}
        onChange={handleChange}
      >
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="FRENCH">French</option>
        <option value="Arabic">Arabic</option>
        <option value="Hindi">Hindi</option>
        <option value="Mandarine chinese">Mandarine chinese</option>
      </select>

      <label htmlFor="role">Role</label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="admin">Admin</option>
        <option value="agent">Agent</option>
      </select>
      
      {/* Department Dropdown */}
      <label htmlFor="departmentId">Department</label>
      <select
        id="departmentId"
        name="departmentId"
        value={formData.departmentId}
        onChange={handleChange}
      >
        <option value="">Select Department</option>
        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>

      {/* Team Dropdown */}
      <label htmlFor="teamId">Team</label>
      <select
        id="teamId"
        name="teamId"
        value={formData.teamId}
        onChange={handleChange}
      >
        <option value="">Select Team</option>
        {teams.map((team) => (
          <option key={team.teamId} value={team.teamId}>
            {team.name}
          </option>
        ))}
      </select>

      {/* i will add on review
      <button type="button" onClick={onClose}>Cancel</button>*/}
      <button type="submit">Submit</button>
      
    </form>
  );
};

export default CreateUserForm;
