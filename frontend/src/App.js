import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Project from "./components/Project/Project";
import Profile from "./components/Profile/Profile";
import HomeSignIn from "./components/Home/HomeSignIn/HomeSignIn";
import GlobalStyles from "./GlobalStyles";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";

const App = () => {
  const [openModal, setOpenModal] = useState({});
  const { isLoggedIn, setCurrentUser, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
      setIsLoggedIn(true);
    } else {
      setCurrentUser(null);
    }
  }, [setCurrentUser, setIsLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Header setOpenModal={setOpenModal} />
        <GlobalStyles />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<HomeSignIn />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/project/:_id" element={<Project />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <Home openModal={openModal} setOpenModal={setOpenModal} />
                }
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
