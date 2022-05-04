import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Project from "./components/Project/Project";
import GlobalStyles from "./GlobalStyles";
import { useState } from "react";

const App = () => {
  const [openModal, setOpenModal] = useState({});
  return (
    <>
      <BrowserRouter>
        <Header setOpenModal={setOpenModal} />
        <GlobalStyles />
        <Routes>
          <Route
            path="/"
            element={<Home openModal={openModal} setOpenModal={setOpenModal} />}
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:_id" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
