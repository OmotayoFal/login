import React, { useState } from 'react';
import './Projects.css';
import Sidebar from "../Sidebar/Sidebar.jsx"; // Import Sidebar component

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Boots Delivery System',
      description: 'Overview of Boots Delivery System.',
      details: 'This project involves developing an efficient delivery system for Boots, focusing on optimizing routes and delivery times.',
    },
    {
      id: 2,
      title: 'E-commerce Platform Revamp',
      description: 'Revamping the current e-commerce platform.',
      details: 'The project focuses on enhancing user experience and increasing sales through a redesigned platform with better navigation.',
    },
    {
      id: 3,
      title: 'AI Chatbot Integration',
      description: 'Integrating AI Chatbot for customer support.',
      details: 'This project aims to integrate an AI-powered chatbot to improve customer support and reduce response times.',
    },
    {
      id: 4,
      title: 'Inventory Management System',
      description: 'Developing an inventory management system.',
      details: 'The system will help in tracking stock levels, orders, sales, and deliveries to streamline inventory management.',
    },
    {
      id: 5,
      title: 'Noir App Development',
      description: 'Creating a mobile app for Noir to help with customer engagement.',
      details: 'This project is about developing a mobile application to enhance customer engagement and service accessibility.',
    },
    {
      id: 6,
      title: 'Data Analytics Dashboard',
      description: 'Building a data analytics dashboard.',
      details: 'The dashboard will provide insights into sales data, customer behavior, and operational efficiency through advanced data visualization.',
    },
  ];

  const handleToggle = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <div className='full-page'>
      <Sidebar />
      <div className="projects-page-wrapper">
        <h1 className="header">Ongoing Projects</h1>
        <div className="projects-container">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header" onClick={() => handleToggle(project.id)}>
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <button className="toggle-button-pro">
                  {expandedProject === project.id ? 'Less Info ▲' : 'More Info ▼'}
                </button>
              </div>
              {expandedProject === project.id && (
                <div className="project-details">
                  <p>{project.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
