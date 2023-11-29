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
import Movies from "./pages/Shows";
import HomeShows from "./pages/Shows/home";
import Movie from "./pages/Shows/movie";
import TvShow from "./pages/Shows/tvshow";

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
        <Route path="/homeshows" element={<HomeShows />} />
        <Route path="/movie:id" element={<Movie />} />
        <Route path="/tvshow:id" element={<TvShow />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </UserContextProvider>
  );
}

export default App;
