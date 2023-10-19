import React from "react";

export default function Register() {
  // Register user
  const registerUser = (e) => {
    e.preventDefault();
  };

  // Return the JSX
  return (
    <div>
      <form onSubmit={registerUser}>
        <div className="max-h-screen py-6 flex flex-col justify-center sm:py-24 md:-mt-16 z-10">
          <div className="relative py-3 max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-2xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-24">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-xl font-normal md:font-semibold md:text-2xl">
                    Get your account 🎥
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-sm sm:leading-7">
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="name"
                        name="name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Name"
                      />
                      <label
                        for="name"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="email"
                        name="email"
                        type="email"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="email"
                      />
                      <label
                        for="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="password"
                      />
                      <label
                        for="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-black text-white rounded-md px-4 py-2 mt-4 mb-2
                      hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-500"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
