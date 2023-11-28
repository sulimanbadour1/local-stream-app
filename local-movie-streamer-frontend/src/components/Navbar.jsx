import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav
      id="nav"
      className="flex items-center justify-center pb-4  gap-12 mt-8 mb-8 pl-8 pr-8
    border-b-2 border-b-gray-200  bg-white/60 text-lg font-semibold"
    >
      <Link
        to={"/"}
        className="text-sm md:text-base hover:text-blue-700 transition-opacity duration-100"
      >
        Home
      </Link>
      <Link
        to={"/movies"}
        className="text-sm md:text-base hover:text-blue-700 transition-opacity duration-100"
      >
        Movies & Series
      </Link>
      {user ? (
        <>
          <Link
            to={"/profile"}
            className="text-sm md:text-base hover:text-blue-700"
          >
            Profile
          </Link>
          {/* Assuming you have a logout function, you can use an onClick handler here */}
          <span
            className="text-sm md:text-base hover:text-blue-700 cursor-pointer"
            onClick={logout}
          >
            Logout
          </span>
        </>
      ) : (
        <>
          <Link
            to={"/register"}
            className="text-sm md:text-base hover:text-blue-700"
          >
            Register
          </Link>
          <Link
            to={"/login"}
            className="text-sm md:text-base hover:text-blue-700"
          >
            Login
          </Link>
        </>
      )}
    </nav>
  );
}
