import React from "react";
import { Link } from "react-router-dom";
import Laptop from "../assets/laptop.jpg";

const Analytics = () => {
  return (
    <div name="admin" className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[500px] mx-auto my-4" src={Laptop} alt="/" />
        <div className="flex flex-col justify-center">
          <p className="text-[#00df9a] font-bold ">
            Election Officer Dashboard
          </p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            User Images Database
          </h1>
          <p>
            Upload image data of electoral voters. Please ensure clear blur free
            images with good resolution. Manage user database, add, remove or
            edit user entries.
          </p>
          <Link to="/login">
            <button className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
