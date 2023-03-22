import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/auth/LogoutButton";
import padlock from '../../assets/lock.png';
import upload from '../../assets/photo.png';
import train from '../../assets/process.png';
import database from '../../assets/data.png';


const AdminDashboard = () => {

    return (
        <div className="w-full h-screen">
            <img className="hidden sm:block absolute w-full h-full object-cover bg-gradient-to-r from-purple-500 to-pink-500" />
            <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
            <div className="fixed w-full px-4 py-24 z-50">
                <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
                    <div className="max-w-[320px] mx-auto py-16">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <Link to="/setPasscode">

                        <div className="flex justify-left items-center pt-8 ">
                        <img src={padlock} alt="" className="w-[30px]" />
                            <div className="text-gray-600 hover:text-white px-4 text-2xl">Set Passcode</div>{" "}
                        </div>

                            
                        </Link>
                        <Link to="/imageUpload">
                        <div className="flex justify-left items-center pt-8 ">
                        <img src={upload} alt="" className="w-[30px]" />
                            <div className="text-gray-600 hover:text-white px-4 text-2xl py-1">Upload Image</div>{" "}
                        </div>
                        </Link>
                        <Link to="/trainModel">

                        <div className="flex justify-left items-center pt-8 ">
                        <img src={train} alt="" className="w-[30px]" />
                            <div className="text-gray-600 hover:text-white px-4 text-2xl">Train Model</div>{" "}
                        </div>
                        </Link>
                        <Link to="/displayVoterDetails">

                        <div className="flex justify-left items-center pt-8 pb-8 ">
                        <img src={database} alt="" className="w-[30px]" />
                            <div className="text-gray-600 hover:text-white px-4 text-2xl py-1">View Voter Data</div>{" "}
                        </div>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
