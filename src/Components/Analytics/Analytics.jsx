import React, { useState } from "react";
import { FaHome, FaTasks, FaComments, FaChartLine } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2"; // Correctly import both Bar and Pie
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js"; // Import necessary elements for charts
import "./Analytics.css"; // Ensure that you have the necessary CSS for sidebar styling
import Sidebar from "../Sidebar/Sidebar.jsx";
import ProjectGanttChart from "./ProjectGanttChart.jsx";
import PieChart from './PieChart.jsx'; 
// Register the required elements for both Bar and Pie charts
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Analytics = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State to manage sidebar visibility

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };
  

  // Dummy tasks for Backlog
  const b_tasks = [
    "Complete project documentation",
    "Project NADE",
    "Code review for new features",
    "Marketing Plan",
    "Update project management tools",
  ];

  // Dummy data for task performance report
  const performanceData = [
    { employeeName: "Alice", completedTasks: 4, totalTasks: 5 },
    { employeeName: "Dave", completedTasks: 3, totalTasks: 4 },
    { employeeName: "Charlie", completedTasks: 5, totalTasks: 5 },
    { employeeName: "Eve", completedTasks: 3, totalTasks: 6 },
    { employeeName: "Bob", completedTasks: 1, totalTasks: 3 },
  ];
  const getLowestPerformer = () => {
    // Calculate efficiency based on completedTasks / totalTasks and find the lowest
    let lowestPerformer = performanceData.reduce((prev, current) => {
      const prevEfficiency = prev.completedTasks / prev.totalTasks;
      const currentEfficiency = current.completedTasks / current.totalTasks;
      return prevEfficiency < currentEfficiency ? prev : current;
    });
  
    return lowestPerformer;
  };

  const [isReportVisible, setIsReportVisible] = useState(false);

  // Function to toggle report visibility
  const toggleReportVisibility = () => {
    setIsReportVisible((prevState) => !prevState);
  };

      // Dummy data for users
      const dummyUsers = [
        { id: 1, name: "Alice", status: "Pending" },
        { id: 2, name: "Bob", status: "Active" },
        { id: 3, name: "Charlie", status: "Suspended" },
        { id: 4, name: "David", status: "Active" },
        { id: 5, name: "Eve", status: "Pending" },
      ];

  // State to manage the expansion of the "Manage Users" section and user data
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState(dummyUsers);

  // Toggle function to expand/collapse the "Manage Users" section
  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  // Function to change user status
  const updateUserStatus = (id, status) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status } : user
    );
    setUsers(updatedUsers);
  };

  // Function to delete a user
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };
  const projects = [
    {
      id: 1,
      title: "Boots Delivery System",
      description: "Overview of Boots Delivery System.",
      startDate: "2024-10-10",
      endDate: "2024-10-15",
    },
    {
      id: 2,
      title: "E-commerce Platform Revamp",
      description: "Revamping the current e-commerce platform.",
      startDate: "2024-10-14",
      endDate: "2024-10-20",
    },
    {
      id: 3,
      title: "AI Chatbot Integration",
      description: "Integrating AI Chatbot for customer support.",
      startDate: "2024-10-16",
      endDate: "2024-10-22",
    },
    {
      id: 4,
      title: "Noir App Development",
      description: "Integrating AI Chatbot for customer support.",
      startDate: "2024-10-18",
      endDate: "2024-10-25",
    },
    {
      id: 5,
      title: "Inventory Management System",
      description: "Integrating AI Chatbot for customer support.",
      startDate: "2024-10-13",
      endDate: "2024-11-22",
    },
    {
      id: 6,
      title: "Data Analytics Dashboard",
      description: "Integrating AI Chatbot for customer support.",
      startDate: "2024-10-16",
      endDate: "2024-10-22",
    },
  ];


  const [tasks, setTasks] = useState([
    { taskName: "Team meeting preparation", employeeName: "David" },
    { taskName: "Fix bugs in Noir App", employeeName: "Charlie" },
    { taskName: "Code review", employeeName: "Eve" },
    { taskName: "Budgeting for AI chatbot", employeeName: "Eve" },
    { taskName: "Client Meeting with Boots", employeeName: "Alice" },
    { taskName: "Complete project documentation", employeeName: "Bob" },
  ]);

  const [taskName, setTaskName] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  // Data for pie chart
  const pieChartData = {
    labels: tasks.map((task) => task.employeeName),
    datasets: [
      {
        data: tasks.map(() => 1), // Equal task distribution
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF3F40",
          "#4EC0C0",
          "#FA6384",
          "#5D2244",
        ],
      },
    ],
  };

  // Pie chart options to show task name on hover
  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // Show the task name instead of the count
            const task = tasks[context.dataIndex]; // Get the task from the dataIndex
            return `${task.taskName} (Assigned to: ${task.employeeName})`;
          },
        },
      },
    },
    responsive: true,
  };

  // Function to add a new task
  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { taskName, employeeName }]);
    setTaskName("");
    setEmployeeName("");
  };

  return (

    <div className="home-container">
      {/* Left Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="main-content">
        {/* Backlog Card */}
        <div className="backlog-card">
          <h2 className="backlog-title">Backlog</h2>
          <ul className="task-list">
            {b_tasks.map((task, index) => (
              <li key={index} className="task-item">
                {task}
              </li>
            ))}
          </ul>
          
          </div>


        {/* Gantt Chart Card with Workload Metrics at the Bottom */}
        <div className="gantt-chart-card">
          <h2 className="gantt-title">Project Gantt Chart</h2>
          <ProjectGanttChart projects={projects} />
          </div>
          <div className="task-performance-report-card">
            <button onClick={toggleReportVisibility} className="toggle-report-button">
              {isReportVisible ? "-" : "+"} Workload Metrics
            </button>
            {isReportVisible && (
              <div className="performance-report-content">
                <h3>Task Completion Efficiency</h3>
                <ul>
                  {performanceData.map((member, index) => (
                    <li key={index}>
                      {member.employeeName}: {member.completedTasks}/{member.totalTasks} tasks completed
                    </li>
                  ))}
                </ul>
                {/* Display the lowest performer */}
                <div className="training-suggestion">
                  {(() => {
                    const lowestPerformer = getLowestPerformer();
                    return (
                      <p>
                        Employee <strong>{lowestPerformer.employeeName}</strong> needs training.
                      </p>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* User Task Manager with Pie Chart */}
          <PieChart />

        
        
      </main>
    </div>
  );
};

export default Analytics;
