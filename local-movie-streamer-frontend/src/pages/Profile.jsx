import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div>
        {/* <div role="status" className="animate-pulse duration-100 mt-12">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
          <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
          <div className="flex items-center justify-center mt-4">
            <svg
              className="w-8 h-8 text-gray-200 dark:text-gray-700 mr-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
            <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div> */}
        <p
          className="flex mt-12 mx-auto text-base justify-center items-center
       p-4  text-red-700 font-semibold tracking-wide rounded-lg "
        >
          Please login to view your profile page
        </p>

        <div className="flex justify-center items-center mt-4 p-2 gap-3">
          <a
            href="/login"
            className="flex  justify-center rounded-md bg-black px-4 py-1.5 text-sm font-semibold leading-6
            text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </a>
          <a
            href="/register"
            className="flex  justify-center rounded-md bg-black px-4 py-1.5 text-sm font-semibold leading-6
            text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md ">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">Your Profile</h1>
      <div className="flex flex-col items-center justify-center mt-4 space-y-4">
        <p className="text-2xl font-medium text-gray-600 uppercase">
          <span className="text-gray-500 ">Username:</span> {user.name}
        </p>
        <p className="text-2xl font-medium text-gray-600 uppercase">
          <span className="text-gray-500">Email:</span> {user.email}
        </p>
      </div>
    </article>
  );
};

export default Profile;
