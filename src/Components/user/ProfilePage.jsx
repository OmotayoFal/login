import React, { useState } from "react";
import UserProfile from './UserProfile';
import PasswordManagement from './PasswordManagement';
import AdminControls from './AdminControls';
import './profileIndex.css'; // For styling
import Sidebar from "../Sidebar/Sidebar.jsx";
const ProfilePage = ({ isAdmin }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State to manage sidebar visibility

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };
  return (
    <div className="main">
    
    <Sidebar/>
    
    <div className="profile-page-container">
       

      <h1>User Profile & Settings</h1>
      <div className="grid-container">
      <UserProfile />
      <PasswordManagement />
      </div>
      {isAdmin && <AdminControls />}
      
    </div>
    
    </div>
  );
};

export default ProfilePage;
