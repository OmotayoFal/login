import React, { useState } from 'react';

const PasswordManagement = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // States for showing/hiding passwords
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = () => {
    const correctCurrentPassword = 'password'; // Hardcoded current password

    if (currentPassword !== correctCurrentPassword) {
      alert("Current password is incorrect.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    if (!isStrongPassword(newPassword)) {
      alert("Password must contain at least one uppercase letter and one special character.");
      return;
    }
    
    // Logic to change password
    console.log('Password changed');
    alert("Password Changed");
  };
  
  // Function to check password strength
  const isStrongPassword = (password) => {
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    return strongPasswordRegex.test(password);
  };
  

  return (
    <div className="password-management">
      <h2>Password Management</h2>

      {/* Current Password Field */}
      <div>
        <label>Current Password: </label>
        <div className="input-container">
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <i
            className={`bi ${showCurrentPassword ? "bi-eye-slash" : "bi-eye"}`}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          ></i>
        </div>
      </div>

      {/* New Password Field */}
      <div>
        <label>New Password: </label>
        <div className="input-container">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <i
            className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"}`}
            onClick={() => setShowNewPassword(!showNewPassword)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          ></i>
        </div>
      </div>

      {/* Confirm New Password Field */}
      <div>
        <label>Confirm New Password: </label>
        <div className="input-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i
            className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          ></i>
        </div>
      </div>

      <button onClick={handlePasswordChange}>Change Password</button>
    </div>
  );
};

export default PasswordManagement;
