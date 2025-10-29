import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Photo from "../pages/Photo/index";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photo" element={<Photo />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
