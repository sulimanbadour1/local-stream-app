import { useMutation } from "@tanstack/react-query";
import { mutationLogin } from "./mutation";
import { useNavigate } from "react-router-dom";
const Shows = () => {
  const navigate = useNavigate();
  const { data, mutate } = useMutation({
    mutationKey: "login",
    mutationFn: mutationLogin,
  });
  // console.log(data);
  const handleLogin = async () => {
    await mutate();
    localStorage.setItem("guest_session_id", data.guest_session_id);
    navigate("/homeshows");
  };
  return (
    <div className=" mx-auto mt-12 text-center flex justify-center content-center flex-col">
      <div className="text-xl font-medium ">
        <h1 className="text-2xl font-bold">Welcome to Local Movie Streamer!</h1>
        <h1 className="mt-12">Login by registering as a guest,</h1>
        <h2 className="mt-4">
          Here you can take a look at the trending movies and series right now!
        </h2>
      </div>
      <button
        onClick={handleLogin}
        className="flex justify-center mt-12 mx-auto rounded-md
         bg-black px-3 py-1.5 text-sm font-semibold leading-6
             text-white shadow-sm hover:bg-blue-500 focus-visible:outline 
             focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600"
      >
        Login
      </button>
    </div>
  );
};

export default Shows;
