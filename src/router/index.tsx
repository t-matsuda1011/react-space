import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Photo from "../pages/Photo/index";
import Gsap from "../pages/Gsap/index";
import Lines from "../pages/Lines/index";
import Layout from "../Layout";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="photo" element={<Photo />} />
        <Route path="gsap" element={<Gsap />} />
        <Route path="lines" element={<Lines />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
