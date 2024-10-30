import React, { useState } from 'react';

const AdminControls = () => {
  const [users, setUsers] = useState([
    { id: 1, email: 'employee1@example.com', status: 'active', recentActivity: 'Completed task on Project A' },
    { id: 2, email: 'employee2@example.com', status: 'suspended', recentActivity: 'No recent activity' },
  ]);

  const [notification, setNotification] = useState(null);

  const handleSuspend = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: 'suspended' } : user
      )
    );
    setNotification("User suspended");
    setTimeout(() => setNotification(null), 2000);
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setNotification("User deleted");
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div className="admin-controls">
      <h2>Manage Employee Accounts</h2>
      {notification && <div className="notification">{notification}</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id} className={`user-item ${user.status}`}>
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              <span className="user-status">{user.status}</span>
              <p className="user-activity">{user.recentActivity}</p>
            </div>
            <div className="action-buttons">
              <button
                className="suspendButton"
                onClick={() => window.confirm("Are you sure you want to suspend this user?") && handleSuspend(user.id)}
                disabled={user.status === 'suspended'}
              >
                Suspend
              </button>
              <button
                className="deleteButton"
                onClick={() => window.confirm("Are you sure you want to delete this user?") && handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminControls;
