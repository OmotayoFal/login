// ProjectGanttChart.jsx
import React, { useState } from 'react';
import './ProjectGanttChart.css';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

const ProjectGanttChart = ({ projects }) => {
  const [view, setView] = useState(ViewMode.Day);

  // Map project data to Gantt tasks
  const tasks = projects.map((project, index) => ({
    id: project.id,
    start: new Date(project.startDate),  // Use project's start date
    end: new Date(project.endDate),      // Use project's end date
    name: project.title,
    type: 'task',
    progress: Math.floor(Math.random() * 100), // Random progress
    dependencies: []
  }));

  return (
    <div className="gantt-container">
      <div className="view-toggle">
        <button onClick={() => setView(ViewMode.Day)}>Day</button>
        <button onClick={() => setView(ViewMode.Week)}>Week</button>
        <button onClick={() => setView(ViewMode.Month)}>Month</button>
      </div>
      <Gantt tasks={tasks} viewMode={view} />
    </div>
  );
};

export default ProjectGanttChart;
