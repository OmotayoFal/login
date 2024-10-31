import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const UserTaskManagerWithPieChart = () => {
  // Initialize state with dummy data
  const [users, setUsers] = useState([
    { name: 'Alice', tasks: ['Team meeting preparation', 'Call Client'] },
    { name: 'Bob', tasks: ['Inventory Management Meeting'] },
    { name: 'Charlie', tasks: ['Boots Requirements Documents', 'NADE followup'] },
    { name: 'Eve', tasks: ['Chatbot Debugging', 'Fix bugs in Noir App']},
    { name: 'David', tasks: ['Dashboard UX']},
    ]);

  const [userName, setUserName] = useState('');
  const [taskName, setTaskName] = useState('');

  // Prepare data for the Pie chart
  const chartData = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: 'Tasks Assigned',
        data: users.map((user) => user.tasks.length),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare tooltips for tasks
  const tooltips = users.map(user => user.tasks.join(', '));

  // Function to handle adding a user and their tasks
  const handleAddUser = (e) => {
    e.preventDefault();
    if (userName && taskName) {
      setUsers((prevUsers) => {
        const existingUser = prevUsers.find((user) => user.name === userName);
        if (existingUser) {
          return prevUsers.map((user) =>
            user.name === userName
              ? { ...user, tasks: [...user.tasks, taskName] }
              : user
          );
        }
        return [...prevUsers, { name: userName, tasks: [taskName] }];
      });
      setUserName('');
      setTaskName('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Task Manager with Pie Chart</h2>
      <form onSubmit={handleAddUser} style={styles.form}>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Add Task</button>
      </form>
      <div style={styles.chartContainer}>
        <Pie 
          data={chartData} 
          options={{
            plugins: {
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const userIndex = tooltipItem.dataIndex;
                    return `${tooltipItem.label}: ${tooltips[userIndex]}`;
                  }
                }
              }
            }
          }} 
        />
      </div>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  chartContainer: {
    width: '100%',
    height: '400px',
  },
};

export default UserTaskManagerWithPieChart;
