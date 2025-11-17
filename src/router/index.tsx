import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Gsap from "../pages/Gsap/index";
import Lines from "../pages/Lines/index";
import Scroll from "../pages/Scroll/index";
import Sticker from "../pages/Sticker/index";
import Note from "../pages/Note/index";
import Layout from "../Layout";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gsap" element={<Gsap />} />
        <Route path="lines" element={<Lines />} />
        <Route path="scroll" element={<Scroll />} />
        <Route path="sticker" element={<Sticker />} />
        <Route path="note" element={<Note />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
