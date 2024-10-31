import React, { useState } from "react";
import UserProfile from './UserProfile';
import PasswordManagement from './PasswordManagement';
import './profileIndex.css'; // For styling
import Sidebar from "../Sidebar/Sidebar.jsx";

const ProfilePage = ({ isAdmin }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State to manage sidebar visibility
  const [isExpanded, setIsExpanded] = useState(false); // State to manage "Manage Users" section
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", status: "Pending" },
    { id: 2, name: "Bob", status: "Active" },
    { id: 3, name: "Charlie", status: "Suspended" },
    { id: 4, name: "David", status: "Active" },
    { id: 5, name: "Eve", status: "Pending" },
  ]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };

  const toggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // Function to update user status
  const updateUserStatus = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  // Function to delete a user
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="main">
      <Sidebar />
      
      <div className="profile-page-container">
        <h1>User Profile & Settings</h1>
        <div className="grid-container">
          <UserProfile />
          <PasswordManagement />
          <div className="manage-users-section">
          <button className="expand-btn" onClick={toggleExpanded}>
            {isExpanded ? "-" : "+"} Manage Users
          </button>

          {isExpanded && (
            <div className="manage-users-content">
              <h3>User Accounts</h3>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.status}</td>
                      <td>
                        {user.status === "Pending" && (
                          <button onClick={() => updateUserStatus(user.id, "Active")}>
                            Approve
                          </button>
                        )}
                        {user.status === "Active" && (
                          <button onClick={() => updateUserStatus(user.id, "Suspended")}>
                            Suspend
                          </button>
                        )}
                        {user.status === "Suspended" && (
                          <button onClick={() => updateUserStatus(user.id, "Active")}>
                            Reactivate
                          </button>
                        )}
                        <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        
        </div>
      

      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
