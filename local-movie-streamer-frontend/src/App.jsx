import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Footer from "./components/Footer";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Profile from "./pages/Profile";

/// set up axios

axios.defaults.baseURL = "http://10.21.211.106:3001/"; // change this to your server's IP address
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </UserContextProvider>
  );
}

export default App;
