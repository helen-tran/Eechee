import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Home from "../Home/Home";
import Project from "./Project";
const ProjectPage = () => {
  const { isLoggedIn } = useContext(UserContext);
  return <div>{isLoggedIn ? <Project /> : <Home />}</div>;
};
export default ProjectPage;
