import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SignUpProvider } from "./Context/SignUpContext";
import { CurrentUserProvider } from "./Context/CurrentUserContext";
import { ProjectsProvider } from "./Context/ProjectsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectsProvider>
      <SignUpProvider>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </SignUpProvider>
    </ProjectsProvider>
  </React.StrictMode>
);
