import React, { createContext, useState, useEffect } from "react";

export const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);
  const [projectName, setProjectName] = useState({});

  const fetchProjects = () => {
    const projects = async () => {
      const response = await fetch(`/projects`);
      const data = await response.json();
      setProjects(data.data);
    };
    projects();
  };

  useEffect(() => {
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
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
