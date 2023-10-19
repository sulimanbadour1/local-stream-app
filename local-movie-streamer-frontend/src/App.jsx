import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Footer from "./components/Footer";
import axios from "axios";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
