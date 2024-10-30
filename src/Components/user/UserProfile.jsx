import React, { useState } from 'react';
import userProfileImg from './userprofileimg.png';

const UserProfile = () => {
  const [email, setEmail] = useState('user@example.com');
  const [preferredName, setPreferredName] = useState('John Doe');
  const [position, setPosition] = useState('Manager');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-image">
        <img src={userProfileImg} alt="Profile" />
      </div>
      <div className="user-profile">
        <h2>Personal Information</h2>
        <div>
          <label>Email: </label>
          {email}
        </div>
        <div>
          <label>Preferred Name: </label>
          {isEditing ? (
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
            />
          ) : (
            <span>{preferredName}</span>
          )}
        </div>
        <div>
          <label>Position: </label>
          {position}
        </div>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
