import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      id="nav"
      className="flex items-center justify-center pb-4  gap-12 mt-8 mb-8 pl-8 pr-8
    border-b-2 border-b-gray-200  text-lg font-semibold  "
    >
      <Link
        to={"/"}
        className="text-sm md:text-base hover:text-blue-700 transition-opacity duration-100"
      >
        Home
      </Link>
      <Link
        to={"/register"}
        className="text-sm md:text-base hover:text-blue-700"
      >
        Register
      </Link>
      <Link to={"/login"} className="text-sm md:text-base hover:text-blue-700">
        Login
      </Link>
    </nav>
  );
}
