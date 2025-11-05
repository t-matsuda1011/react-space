import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Photo from "../pages/Photo/index";
import Gsap from "../pages/Gsap/index";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photo" element={<Photo />} />
      <Route path="/gsap" element={<Gsap />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
