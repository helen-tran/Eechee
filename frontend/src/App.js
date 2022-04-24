import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header";
import Projects from "./components/Projects";
import GlobalStyles from "./GlobalStyles";
import { useState } from "react";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
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
          <Route path="projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
