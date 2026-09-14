import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import AddClass from "./pages/AddClass";
import EditClass from "./pages/EditClass";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/add" element={<AddClass />} />
        <Route path="/edit/:classCode" element={<EditClass />} />
      </Routes>
    </BrowserRouter>
  );
}
