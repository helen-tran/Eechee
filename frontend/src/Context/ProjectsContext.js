import React, { createContext, useState, useEffect } from "react";

export const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);
  const [projectName, setProjectName] = useState({});
  const [tasks, setTasks] = useState();

  const fetchProjects = () => {
    const projects = async () => {
      const response = await fetch(`/projects`);
      const data = await response.json();
      setProjects(data.data);
    };
    projects();
  };

  const fetchAllTasks = () => {
    const tasks = async () => {
      const response = await fetch(`/tasks`);
      const data = await response.json();
      setTasks(data.data);
    };
    tasks();
  };

  useEffect(() => {
    fetchAllTasks();
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        projectName,
        setProjectName,
        fetchProjects,
        fetchAllTasks,
        tasks,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
