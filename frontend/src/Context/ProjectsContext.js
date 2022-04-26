import React, { createContext, useState, useEffect } from "react";

export const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const projects = async () => {
      const response = await fetch(`/projects`);
      const data = await response.json();
      setProjects(data.data);
    };
    projects();
  }, []);
  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
