import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Photo from "../pages/Photo/index";
import Gsap from "../pages/Gsap/index";
import Lines from "../pages/Lines/index";
import Scroll from "../pages/Scroll/index";
import Sticker from "../pages/Sticker/index";
import Layout from "../Layout";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="photo" element={<Photo />} />
        <Route path="gsap" element={<Gsap />} />
        <Route path="lines" element={<Lines />} />
        <Route path="scroll" element={<Scroll />} />
        <Route path="sticker" element={<Sticker />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
