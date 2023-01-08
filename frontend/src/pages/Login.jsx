import React from "react";

const Login = () => {
  return (
    <div className="w-full h-screen">
      <img className="hidden sm:block absolute w-full h-full object-cover bg-gray-800" alt="idk what"/>
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign In</h1>

            <form className="w-full flex flex-col py-4">
              <input
                className="p-3 my-2 bg-gray-700 rouded"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <input
                className="p-3 my-2 bg-gray-700 rouded"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button className="bg-green-600 py-3 my-6 rounded font-bold">
                Sign In
              </button>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>Need Help?</p>
              </div>
              <p className="py-8">
                <span className="text-gray-600">Create Account</span>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
