import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SignUpProvider } from "./Context/SignUpContext";
import { UserProvider } from "./Context/UserContext";
import { ProjectsProvider } from "./Context/ProjectsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectsProvider>
      <SignUpProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </SignUpProvider>
    </ProjectsProvider>
  </React.StrictMode>
);
